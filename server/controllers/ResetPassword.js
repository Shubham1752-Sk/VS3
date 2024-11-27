const { emit } = require("process");
const { mailSender } = require("../config/SendMail")
const UserModel=require("../models/User");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

exports.resetPasswordToken=async(req,res)=>{
    try{
        const {email}=req.body;
        const newEmail=email
        const users=await UserModel.find({})
        flag=false
        let newUser;
        // console.log(users)
        for(let x of users){
            if(x.email===newEmail){
                flag=true;
            }
            else{
                continue;
            }
        }
    
        if (flag==false) {
			return res.json({
                users,
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}
        const token=crypto.randomBytes(20).toString("hex");
        console.log(flag)

        for(let x of users){
            if(x.email===newEmail){
                x.token=token
                x.resetPasswordExpires=Date.now()+3600000
                x.save()
            }
            else{
                continue;
            }
        }
        const url=`http://localhost:3000/update-password/${token}`;

        await mailSender(
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        )

        res.json({
            success:true,
            message:"Email Sent Successfully, Please Check Your Email to Continue Further",
        })
    }
    catch(err){
        return res.json({
			success: false,
			message:err.message
		});
    }
}

exports.resetPassword=async(req,res)=>{
    try{
        const {password,confirmPassword,token}=req.body;
        const newToken=token
        console.log(password);
        console.log(confirmPassword)
        if(confirmPassword!==password){
            return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
        }

        const userDetails=await UserModel.findOne({token:newToken});
        if(!userDetails){
            return res.json({
                success:true,
                message:"Token is not valid ",
            })
        }

        console.log(userDetails)
        
        const encryptedPassword=await bcrypt.hash(password,10);
        const encryptedConfirmPassword=await bcrypt.hash(confirmPassword,10);
        
        userDetails.password=encryptedPassword;
        userDetails.cpassword=encryptedConfirmPassword;
        userDetails.save();

        res.json({
			success: true,
			message: `Password Reset Successful`,
		});
    }
    catch(err){
        return res.json({
			error: err.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
    }
}