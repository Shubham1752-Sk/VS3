const UserModel=require("../models/User");
const bcrypt=require("bcrypt");
const Otp_model=require("../models/Otp")
const otp_generator=require("otp-generator");
const jwt=require("jsonwebtoken");
require("dotenv").config()

exports.SendOtp=async(req,res)=>{
    try{
        const {email}=req.body
        if(!{email}){
            return res.json({
                succcess:false,
                message:"Email Field Should not be empty ",
            })
        }

        const checkUserPresent=await UserModel.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                succcess:false,
                message:"Email Already Exists ",
            })
        }

        var otp=otp_generator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false,
        })

        let result =await Otp_model.findOne({otp});
        while(result){
            otp=otp_generator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false,
            })
            result=await Otp_model.findOne({otp});
        }
        const entry=await Otp_model.create({
            email,otp
        })
        console.log(entry);
        return res.status(200).json({
            succcess:true,
            message:"Otp Sent Successfully ",
            email,otp
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            succcess:false,
            message:err.message,
        })
    }
}

exports.SignIn=async(req,res)=>{
    try{
        const{
            firstName,
            email,
            lastName,
            password,
            cpassword,
            otp,
        }=req.body;
        console.log(otp);
        if(!firstName||!email||!lastName||!password||!cpassword){
            return res.json({
                success:false,
                message:"All fields are mandatory "
            })
        }

        if(password!==cpassword){
            return res.status(403).json({
                success:false,
                message:"Passwords do not match "
            })
        }
        const existingUserCheck=await UserModel.findOne({email});
        if(existingUserCheck){
            return res.json({
                success:false,
                message:"Email Already Exists ",
            })
        }
        const recentOtp=await Otp_model.findOne({email}).sort({createdAt:-1}).limit(1);
        if(recentOtp.otp.length==0){
            return res.status(400).json({
                succcess:false,
                message:"OTP not found",
            })
        }else if(otp!==recentOtp.otp){
            return res.status(400).json({
                succcess:false,
                message:"OTP Do not match ",
            })
        }
        const HashedPassword=await bcrypt.hash(password,10);
        const user=await UserModel.create({
            firstName,
            email,
            lastName,
            password:HashedPassword,
            cpassword:HashedPassword,
            role:"Customer",
        })
        return res.status(200).json({
            success:true,
            message:"User is registered Succcessfully",
            user
        })
    }
    catch(err){
        console.error(err);
        return res.json({
            succcess:false,
            message:err.message,
        })
    }
}

exports.LogIn=async(req,res)=>{
    try{
        const {email,password}=req.body;
        
        if(!email||!password){
            return res.json({
                succcess:false,
                message:"Both Fields are necessar for login ",
            });
        }

        const CheckIfUserExists=await UserModel.findOne({email});
        if(CheckIfUserExists){
            if(await bcrypt.compare(password,CheckIfUserExists.password)){
                const payload={
                    email:CheckIfUserExists.email,
                    id:CheckIfUserExists._id,
                    role:CheckIfUserExists.role,
                }
                const token=jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:"30d",
                })
                CheckIfUserExists.role="Customer"
                CheckIfUserExists.token=token
                CheckIfUserExists.password=undefined
                const options={
                    expiresIn:new Date(Date.now())+2*24*60*46*1000,
                }

                res.cookie("token",token,options).status(200).json({
                    succcess:true,
                    token,
                    CheckIfUserExists,
                    message:"User Logged in Successfully ",
                    
                })
            }
            else{
                return res.json({
                    succcess:false,
                    message:"Password Do not match "
                })
            }
        }
        else{
            return res.json({
                succcess:false,
                message:"You Need to create an Account first ",
            })
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            succcess:false,
            message:"Unable to login",
            error:err.message,
        })
    }
}



