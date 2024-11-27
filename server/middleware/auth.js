const jwt=require("jsonwebtoken");
require("dotenv").config()
const UserModel=require("../models/User")

exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token
                    || req.body.token
                    || req.header("Authorization").replace("Bearer ", "")       
        console.log("Inside Auth Middle")
        if(!token){
            return res.json({
                success:false,
                message:"Token is missing ",
            })
        }

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode
        }
        catch(err){
            return res.json({
                success:false,
                err:err.message,
                message:"token is invalid ",
            })
        }
        next()
    }
    catch(err){
        return res.json({
            success:false,
            err:err.message,
            message:"Something went wrong while validating the token ",
        })
    }
}

exports.isCustomer=async(req,res,next)=>{
    console.log("Inside Customer MiddleWare ")
    try{
        if(req.user.role!=="Customer"){
            return res.json({
                success:false,
                message:"This is a Protected route for Customer only"
            })
        }
        next()
    }
    catch(err){
        console.log(err)
        return res.json({
            success:false,
            message:err.message
        })
    }
}