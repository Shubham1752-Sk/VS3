const mongoose=require("mongoose");

const ratingAndReviewSchemma=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    },
    products:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ItemSchemma"
    }
})

module.exports=mongoose.model("rating_schemma",ratingAndReviewSchemma);