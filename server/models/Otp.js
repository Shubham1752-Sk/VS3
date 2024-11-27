const mongoose=require("mongoose");
const { mailSender } = require("../config/SendMail");
const emialTemplate=require("../templates/emailVerificationTemplate")

const OtpSchemma=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})

async function SendEmail(email,otp){
    try{
        const mailResponse=await mailSender(email,"Verification Email from DreamBasket",emialTemplate(otp));
        console.log(mailResponse);
    }
    catch(err){
        console.log("Error While Sending Email ",err);
        throw err
    }
}

OtpSchemma.pre("save",async function(next){
    if(this.isNew)
        await SendEmail(this.email,this.otp);
    
    next();
})

module.exports=mongoose.model("otp_schemma",OtpSchemma);