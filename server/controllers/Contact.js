const ContactSchemma=require("../models/Contact")

exports.saveImformation=async(req,res)=>{
    try{
        const {firstName,lastName, email, phoneNumber, message}=req.body;
        
        if(!firstName||!lastName||!email||!phoneNumber||!message){
            return res.json({
                success:false,
                message:"All fields are required",
            })
        }

        const newRecored=await ContactSchemma.create({
            firstName,lastName,email,phoneNumber,message
        })
        
        return res.json({
            success:true,
            message:"Your Imformation has been recorded successfully ",
        })
    }
    
    catch(err){
        return res.json({
            success:false,
            message:err.message,
        })
    }
}

exports.ViewAllinfo=async(res)=>{
    try{
        const Allinfo=await ContactSchemma.find({},{_id:false,__v:0});
        if(!Allinfo){
            return res.json({
                success:false,
                message:"Error Message ",
            })
        }
        return res.json({
            message:"All records are found ",
            Allinfo,
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:err.message,
        })
    }
}