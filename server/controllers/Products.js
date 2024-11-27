const {Item_Model}=require("../models/Item")
const {category_Model}=require("../models/Item")
const cloudinary=require("cloudinary").v2
const {UploadfileToCloudinary}=require("../config/FileUploader");
const { default: mongoose } = require("mongoose");
require("dotenv").config()

exports.createProduct=async(req,res)=>{
    try{
        const {title,price,savings_price,category,stock,image}=req.body;
          
        if(!title||!price||!category||!stock||!image){
            return res.json({
                succcess:false,
                message:"All Fields Are Neccessary To Create A Product ",
            })
        }

        if(await Item_Model.findOne({title:title})){
            return res.json({
                succcess:false,
                message:" Product Already Exists ",
            })
        }

        const ImageUrl=await cloudinary.uploader.upload(image,{
            upload_preset:"project_folder"
        })
        console.log(ImageUrl);
        const findCategory=await category_Model.findById(category);

        const PriceValue={
            "discounted":savings_price>0?("true"):("false"),
            "current_price":savings_price>0?(price-savings_price):(price),
            "currency":"USD",
            "before_price":savings_price>0?(price):(0),
            "savings_amount":savings_price>0?(savings_price):(0),
            "savings_percent":savings_price>0?(((price-savings_price)/100)*price):(0)
        }
        const newItem=await Item_Model.create({
            title:title,
            price:PriceValue,
            ratingAndReview:[],
            category:category,
            image:ImageUrl.url,
            stock:stock
        })
        findCategory.itemList.push(newItem._id);
        findCategory.save()
        return res.status(200).json({
            success:true,
            message:"Product Created Successfully",
        })
    }
    catch(err){
        console.log(err)
        return res.json({
            succcess:false,
            message:err.message
        })
    }
}

exports.ViewAllProducts=async(req,res)=>{
    try{
        const a=await Item_Model.find({});
        const AllCategories=await category_Model.find({});
        let AllProducts=[]
        let count=0;
        for(let x of AllCategories){
            count=0;
            for(let y of a){
                if(x._id.toString()===y.category.toString() && count<4){
                    count++;
                    AllProducts.push(y);
                }
            }
        }
        return res.json({
            succcess:true,
            message:"Displaying All Products ",
            AllProducts,
            a,
            // price
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

exports.DeleteProduct=async(req,res)=>{
    try{
        const {id}=req.body
        const response=await Item_Model.findOneAndDelete(new mongoose.Types.ObjectId(id))
        const response2=await category_Model.findByIdAndUpdate(
            response.category,{$pull:{itemList:response._id}},{$new:true}
        )
        return res.json({
            succcess:true,
            message:"Item Delted Successfully"
        })
    }
    catch(err){
        console.log(err)
        return res.json({
            succcess:false,
            message:err.message,
        })
    }
}

exports.UpdateProduct=async(req,res)=>{
    try{
        const id=req.params.id;
        const {title,price,description,category,stock,image}=req.body;
        const UpdatedCategory=await category_Model.findById({category});
        const ProductTObeupdated=await Item_Model.findById(
            {id},
            {title,price,description,category:UpdatedCategory,stock,image},
            {new:true},
            )
        
        return res.json({
            succcess:true,
            message:"Product Has Been Updated Successfully ",
            ProductTObeupdated
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

exports.viewProductsById=async(req,res)=>{
    try{
        const id=req.params.id;
        const newId=id.toString()
        const viewProduct=await Item_Model.findOne({_id:newId},{title:true,price:true,stock:true,image:true});

        if(!viewProduct){
            return res.json({
                succcess:false,
                message:"Desired Product is not present ",
            })
        }

        return res.json({
            succcess:true,
            viewProduct,
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:"Unable to fetch data from database ",
            error:err.message,
        })
    }
}

exports.fetchProductsByCategory=async(req,res)=>{
    try{
        const categoryName=req.body.categoryName
        if(!categoryName){
            return res.json({
                success:false,
                message:"Category Name is required"
            })
        }
        const CatgeorySearched=await category_Model.findOne({categoryName})
        if(!CatgeorySearched){
            return;
        }
        const AllProducts=await Item_Model.find({category:id},{title:true,price:true,image:true,stock:true},{group:{categoryName}})
        const count=AllProducts.length
        return res.json({
            success:true,
            AllProducts,
            count
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

exports.filterFunction=async(req,res)=>{
    try{
        const {checked,searchInput,priceFilter}=req.body
        let arrgs={}
        let allProducts=[]
        let newValue=searchInput.toString()
        if(checked.length>0){
            arrgs=checked
        }
        if( checked.length==0 && priceFilter==0){
            allProducts=await Item_Model.find(
                {title:{$regex:".*"+searchInput+"*.",$options:'i'}}
            )
        }
        else if(checked.length>0 && priceFilter==0 ) {
            allProducts=await Item_Model.find(
                {category:arrgs,$and:[
                    {title:{$regex:".*"+searchInput+"*.",$options:'i'}}
                ]} 
            )
        }
        else if( checked.length>0 && priceFilter!=0 ){
            allProducts=await Item_Model.find(
                {category:arrgs,$and:[
                    {title:{$regex:".*"+searchInput+"*.",$options:'i'}}
                ]} 
            )
            allProducts=allProducts.filter(item=>{
                item.price.current_price<priceFilter
            })
            console.log("allProducts",allProducts.length)
        }
        return res.json({
            succcess:true,
            allProducts,
        });
    }   
    catch(err){
        console.log(err);
        return res.json({
            succcess:false,
            message:err.message
        })
    }
}