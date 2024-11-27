const {cartModel,Order_model}=require("../models/Order")
const {Item_Model}=require("../models/Item");
const { default: mongoose } = require("mongoose");

exports.CreateCart=async(req,res)=>{
    try{
        const userId=req.user.id;
        const {quantity,productId}=req.body;
        if(!productId){
            return res.json({
                success:false,
                message:"Product Id is not present "
            })
        }
        if(quantity==0){
            return res.json({
                success:false,
                message:"Quantity cannot be 0 "
            })
        }
        const ProductDetails=await Item_Model.findById(productId);
        const price=ProductDetails.price
        await cartModel.create({
            quantity:quantity,
            user:userId,
            image:ProductDetails.image,
            title:ProductDetails.title,
            price:price.current_price,
            product:productId,
        })

        return res.json({
            success:true,
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:err.message
        })
    }
}
exports.ViewCart=async(req,res)=>{
    try{
        const userId=req.user.id
        const AllResults=await cartModel.find({user:userId})
        let amount=0;
        AllResults.map((item)=>{
            amount+=item.quantity*item.price
        })
        return res.json({
            success:true,
            AllResults,
            amount
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:err.message
        })
    }
}

exports.ResetCart=async(req,res)=>{
    try{
        const userId=req.user.id;
        await cartModel.findByIdAndDelete(
            {userId}
        )
        return res.json({
            success:true,
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:true,
            message:err.message
        })
    }
}

exports.removeFromCartById=async(req,res)=>{
    try{
        const {id}=req.body
        const newid=new mongoose.Types.ObjectId(id);
        await cartModel.findByIdAndDelete(newid);
        return res.json({
            success:true
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:err.message
        })
    }
}

exports.AllOrdersAmount=async(req,res)=>{
    try{
        let amount=0
        const allOrders=await Order_model.find({})
        allOrders.map((order)=>{
            amount+=order.total
        })
        return res.json({
            success:true,
            amount
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:err.message
        })
    }
}

exports.UpdateQuantity=async(req,res)=>{
    try{
        const userId=req.user.id;
        const {quantity,id}=req.body;
        const response=await cartModel.findById(new mongoose.Types.ObjectId(id));
        response.quantity=quantity;
        response.save();
        return res.json({
            success:true,
           
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:err.message
        })
    }
}

exports.ViewAllCustomerorders=async(req,res)=>{
    try{
        const allOrders=await Order_model.find({})
        return res.json({
            allOrders
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:err.message
        })
    }
}