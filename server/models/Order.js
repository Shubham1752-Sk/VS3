const mongoose=require("mongoose");
const {mailSender}=require("../config/SendMail")

const cart_model=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ItemSchemma"
    },
    title:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    quantity:{
        type:Number,
        default:1
    },
    price:{
        type:Number,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    
})

const cartModel=mongoose.model("cart_model",cart_model)

const order_schemma=new mongoose.Schema(
    {
      userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:"UserModel", 
        required: true },
      products: [
        { 
        productId: { 
          type: mongoose.Schema.Types.ObjectId,
          ref:"ItemSchemma"
        },
         quantity: { 
          type: Number, 
          default: 1 } 
        },
      ],
      subtotal: { type: Number, required: true },
      total: { type: Number, required: true },
      shipping: { type: Object, required: true },
      delivery_status: { type: String, default: "pending" },
      payment_status: { type: String, required: true },
      phoneNumber:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true,
      },
      paymentMode:{
        type:String,
        trim:true,
      }
    },
    { timestamps: true }
  );

const Order_model=mongoose.model("Order_Model",order_schemma)


module.exports={
    Order_model,
    cartModel
}