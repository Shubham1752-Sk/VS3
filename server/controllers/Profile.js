const UserModel=require("../models/User");
const bcrypt=require("bcrypt")
const { mailSender } = require("../config/SendMail");
require("dotenv").config()
const {passwordUpdated}=require("../templates/passwordUpdate")
const {Order_model}=require("../models/Order")

exports.fetchAllCustomers=async(req,res)=>{
    try{
        const allresult=await UserModel.find({})
        if(!allresult){
            return res.json({
                success:false,
                message:"No Entries Found"
            })
        }
        
        allresult.forEach((customer)=>{
            customer.password=undefined
            customer.cpassword=undefined
        })
        
        return res.json({
            success:true,
            allresult,
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

exports.ChangeUserPassword=async(req,res)=>{
    try{
        const id=req.user.id;
        const {oldPassword,newPassword,confirmNewPassword}=req.body;

        if(!oldPassword||!newPassword||!confirmNewPassword){
            return res.json({
                succcess:false,
                message:"All fields are required to change the password ",
            })
        }

        if(newPassword!==confirmNewPassword){
            return res.json({
                success:false,
                message:"Passwords do not match ",
            })
        }

        const userTobeUpdate=await UserModel.findById(id);

        if(await bcrypt.compare(oldPassword,userTobeUpdate.password)){
            let Haspassword;
            let confirmHashPassword;
            try{
                Haspassword=await bcrypt.hash(newPassword,10);
                confirmHashPassword=await bcrypt.hash(confirmNewPassword,10);
            }
            catch(err){
                console.log(err);
            }
            userTobeUpdate.password=Haspassword;
            userTobeUpdate.cpassword=confirmHashPassword
            userTobeUpdate.save();
            return res.json({
                success:true,
                message:"Password has been changed successfully ",
                userTobeUpdate,
            })
        }

        try{
            const sendEmail=await mailSender(userTobeUpdate.email,`Password updated successfully for ${userTobeUpdate.firstName} ${userTobeUpdate.lastName}`,passwordUpdated(
                userTobeUpdate.email,userTobeUpdate.firstName+" "+userTobeUpdate.lastName)
            )
            console.log(sendEmail.response);
        }
        
        catch(err){
            console.error("Error occurred while sending email:", err);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: err.message,
			});
        }
    }
    catch(err){
        return res.json({
            succcess:false,
            error:err.message,
            message:"Unable to Update Your Password , Please Try Again in Some Time ",
        })
    }
}

exports.ViewAllOrders=async(req,res)=>{
    try{
        const AllOrders=await Order_model.find({})
        return res.json({
            succcess:true,
            AllOrders
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            succcess:false,
            message:err.message
        })
    }
}