const {cartModel,Order_model}=require("../models/Order")
require("dotenv").config()
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { default: mongoose } = require("mongoose");
const UserModel=require("../models/User")
const { CLIENT_ID, APP_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

exports.createOrder1=async(req,res)=>{
    const id=req.user.id;
    try {
      const order = await this.createOrder(id);
      res.json(order);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
}

exports.createOrder = async (id) => {
    console.log("Inside Create Order ")
    const accessToken = await this.generateAccessToken()
    const allResults = await cartModel.distinct("_id").find({ user: new mongoose.Types.ObjectId(id) });
    let price = 0;
    console.log("All results", allResults)
    allResults.forEach(item => {
      price += (item.quantity * item.price)
    })
    console.log("After for loop")
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: price.toString(),
            },
          },
        ],
      }),
    });
  return handleResponse(response);
}


exports.capturePayment1=async(req,res)=>{
  const id=req.user.id
  const { orderID } = req.body;
  try {
    const captureData = await this.capturePayment(orderID,id);
    console.log("Capture Payment ",captureData);
    res.json(captureData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

exports.capturePayment = async (orderID,id) => {
    console.log("Inside capture payment ");
    const accessToken = await this.generateAccessToken()
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return handleResponse(response);
  }

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}

exports.generateAccessToken = async () => {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

exports.generateClientToken=async(req,res)=>{
  const accessToken = await this.generateAccessToken();
  const response = await fetch(`${base}/v1/identity/generate-token`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": "en_US",
      "Content-Type": "application/json",
    },
  });
  const jsonData = await handleResponse(response);
  console.log("json data",jsonData)
  return jsonData.client_token;
}