const mongoose=require("mongoose");
const { mailSender } = require("../config/SendMail");
const ContactUSTemplate=require("../templates/ContactUsTemplate")

const ContactSchemma=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
})

async function SendEmail(email){
    try{
        const mailResponse=await mailSender(email,"Conformation email from dreamBasket",ContactUSTemplate());
        console.log(mailResponse);
    }
    catch(err){
        console.log("Error While Sending Email ",err);
        throw err
    }
}

ContactSchemma.pre("save",async function (next){
    if(this.isNew)
        await SendEmail(this.email);
    
    next();
})

module.exports=mongoose.model("ContactSchemma",ContactSchemma)