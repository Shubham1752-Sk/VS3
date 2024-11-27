const rating_schemma=require("../models/RatingAndReview");
const {Item_Model}=require("../models/Item")
const { default: mongoose } = require("mongoose");
const RatingAndReview = require("../models/RatingAndReview");


exports.CreateRating=async(req,res)=>{
    try{
        const id=req.user.id;
        const {rating,review,productId}=req.body;
        if(!rating||!review){
            return res.json({
                success:false,
                message:"All fields are neccessary ",
            })
        }
        const id3=new mongoose.Types.ObjectId(productId)
        const productdetails=await Item_Model.findById({_id:id3});
        // if(!productdetails.PurchasedCustomers.includes(id)){
        //     return res.json({
        //         success:false,
        //         message:"You Need To Purchase The Product To Add The Review ",
        //     })
        // }
        const id2=new mongoose.Types.ObjectId(productId)
        const AlreadyReviewed=await rating_schemma.findById({_id:id2});
        if(AlreadyReviewed){
            return res.json({
                success:false,
                message:"Product Already Reviewed ",
            })
        }
        const newRecord=await rating_schemma.create({
            user:id,rating,review,products:productdetails._id
        })
        const updatedId=new mongoose.Types.ObjectId(productId)
        const response=await Item_Model.findById(updatedId)
        console.log(response.ratingAndReview)
        response.ratingAndReview=[]
        response.ratingAndReview.push(newRecord._id)
        response.save()
        return res.json({
            success:true,
            mesage:"Rating And Review Added For The Product ",
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:"Unable to add rating for the desired Product ",
        })
    }
}

exports.getAverageRatings=async(req,res)=>{
    try{
        const product_id=req.body.id;

        const result=await rating_schemma.aggregate(
            {
                $match:{
                    products:new mongoose.Types.ObjectId(product_id)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRatings:{$avg:"$rating"},
                }
            }
        )
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRatings:result[0].averageRatings
            })
        }
        return res.status(200).json({
            success:false,
            averageRatings:0,
            message:"No Ratings Found ",
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            error:err.message,
            message:"Error Occured ",
        })
    }
}

exports.getAllRatings=async(req,res)=>{
    try{
        const allResults=await rating_schemma.find({})
        if(!allResults){
            return res.json({
                success:false,
                message:"Not rating found to display "
            })
        }
        return res.json({
            success:true,
            allResults
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:err.mesage,
        })
    }
}

exports.DeleteProductRating=async(req,res)=>{
    try{
        const id=req.user.id;
        const {productId}=req.body;
        const response=await rating_schemma.findOneAndDelete(
            {user:id},{products:productId}
        )
        
        const ProductsDetials=await Item_Model.findByIdAndUpdate(
            productId,{$pull:{ratingAndReview:response._id}},{$new:true}
        );
        
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            mesage:err.mesage
        })
    }
}