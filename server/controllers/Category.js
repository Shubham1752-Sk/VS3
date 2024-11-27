const {category_Model, Item_Model}=require("../models/Item")
const mongoose=require("mongoose")

exports.createCategory=async(req,res)=>{
    try{
        const {categoryName}=req.body;
        

        if(!categoryName){
            return res.json({
                succcess:false,
                message:"Category Name required ",
            })
        }
        console.log(categoryName)
        if(await category_Model.findOne({categoryName:categoryName})){
            return res.json({
                succcess:false,
                message:"Category Already Exists , Enter A New Catrgory ",
            })
        }
        const newCategory=await category_Model.create({
            categoryName
        })
        return res.status(200).json({
            succcess:true,
            message:"Category Has been Created Successfully ",
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            succcess:false,
            message:err.message,
        })
    }
}

exports.ViewCategories=async(req,res)=>{
    try{
        const allCategories=await category_Model.find({}).populate("itemList").exec()
        if(!allCategories){
            return res.json({
                message:"No Categories Found ",
            })
        }
        return res.json({
            succcess:true,
            allCategories
            
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            succcess:false,
            message:err.message
        })
    }
}

exports.deleteCategory=async(req,res)=>{
    try{
        const {id}=req.body;
        const allCategories=await category_Model.find({})
        if(!id){
            return res.json({
                succcess:false,
                message:"Id Is Required For Deletion of Category ",
            })
        }
        if(await category_Model.findByIdAndDelete({_id:id})){
            await Item_Model.deleteMany({category:id})
            return res.json({
                succcess:true,
                message:"Category Has Been Deleted Successfully ",
                allCategories
            })
        }
    }
    catch(err){
        console.log(err)
        return res.json({
            succcess:false,
            message:err.message
        })
    }
}

exports.UpdateCateory=async(req,res)=>{
    try{
        const {categoryName,id}=req.body;
        if(!categoryName){
            return res.json({
                succcess:false,
                message:"Category Name is required ",
            })
        }
        const CategoryTobeUpdated=await category_Model.findById(new mongoose.Types.ObjectId(id));
        CategoryTobeUpdated.categoryName=categoryName;
        CategoryTobeUpdated.save()
        return res.json({
            succcess:true,
            message:"Category Has Been Updated Successfully ",
        })
    }
    catch(err){
        console.log(err)
        console.error(err);
        return res.json({
            succcess:false,
            message:err.message
        })
    }
}