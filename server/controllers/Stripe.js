const { cartModel, Order_model } = require("../models/Order")
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const UserModel = require("../models/User")

const { mailSender } = require("../config/SendMail")
const invoiceTemplate = require("../templates/InvoiceTemplate")


exports.stripe_payment = async (req, res) => {
  const id = req.user.id
  const user = await UserModel.findById(id)
  const all_items = await cartModel.find({ user: id })

  const Customer = await stripe.customers.create({
    metadata: {
      user: user._id,
      cart: JSON.stringify(req.body.CartItems)
    },
    email: user.email
  });
  const line_items = all_items.map((item) => {
    return {
      price_data: {
        currency: "USD",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        metadata: {
          id: item.product
        },
        unit_amount: parseInt(item.price * 100),
      },
      quantity: item.quantity,
    };
  })
  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'IN'],
      },
      phone_number_collection: {
        enabled: true,
      },
      mode: 'payment',
      customer: Customer.id,
      success_url: `${process.env.CLIENT_URL}?success=true`,
      cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
    });
    res.send({ url: session.url })
  }
  catch (err) {
    console.log(err);
    return res.json({
      success: false,
      err: err.message
    })
  }
}

const createOrder = async (customer, data) => {
    const userid = await UserModel.findOne({ email: customer.email })
    const all_items = await cartModel.distinct("_id").find({ user:userid._id})
    console.log("all_items",all_items)
    let products = all_items.map((item) => {
      userid.items_bought.push(item.product)
      return {
        productId: item.product,
        quantity: item.quantity,
      };
    });
    
    userid.save()

    const newOrder = new Order_model({
      userId: userid._id,
      paymentIntentId: data.payment_intent,
      products: products,
      subtotal: data.amount_subtotal,
      total: data.amount_total,
      shipping: data.customer_details,
      payment_status: data.payment_status,
      phoneNumber: customer.phone,
      email: customer.email,
      paymentMode:"Stripe"
    });
    await newOrder.save()
    try {
      await mailSender(customer.email, "Order Verification Email From SAS FITNESS", invoiceTemplate(newOrder, all_items))
      await cartModel.deleteMany({ user: userid._id })
    }
    catch (err) {
      console.log("Order Email Not sended ", err);
    }
  }
;


exports.handleWebhook = async (req, res) => {
  console.log("Inside handle webhook ");
  let data;
  let eventType;

  let webhookSecret;

  if (webhookSecret) {

    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`Webhook signature verification failed:  ${err}`);
      return res.sendStatus(400);
    }

    data = event.data.object;
    eventType = event.type;
  } else {

    data = req.body.data.object;
    eventType = req.body.type;
  }

  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          createOrder(customer, data);
        } catch (err) {
          console.log(typeof createOrder);
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }

  res.status(200).end();
}