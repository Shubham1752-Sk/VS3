const mongoose=require("mongoose");

const ItemSchemma=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Object,
        required:true,
    },
    description:{
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category_model",
    },
    image:{
        type:String,
        required:true,
    },
    ratingAndReview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"rating_schemma",
        },
    ],
    stock:{
        type:Number,
        required:true,
    }
})

const Item_Model=mongoose.model("ItemSchemma",ItemSchemma)

const category_model=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true,
    },
    itemList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ItemSchemma",
        }
    ],
})

const category_Model=mongoose.model("category_model",category_model)


module.exports={
    category_Model,
    Item_Model,
}