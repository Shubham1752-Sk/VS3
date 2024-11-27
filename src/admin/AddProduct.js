import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AddProducts, fetchAllCategories } from "../services/Auth";


const AddProduct=()=>{
    const {allCategories}=useSelector((state)=>state.category)
    const [file,setFile]=useState("")
    const [image,setImage]=useState("")
    const dispatch=useDispatch()
    const [title,setTitle]=useState("");
    const [price,setPrice]=useState(0);
    const [saving_price,set_Saving_price]=useState(0);
    const [stock,setStock]=useState(0);
    const [category,setCategory]=useState("")
    useEffect(()=>{
        fetchAllCategories(dispatch)
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(file)
        console.log(image);
        console.log(title);
        console.log(price);
        console.log(stock);
        console.log(saving_price)
        console.log(category);
        AddProducts(dispatch,title,price,saving_price,stock,category,image);
    }

    function func(e){
        const file2=e.target.files[0];
        const reader=new FileReader()
        reader.readAsDataURL(file2);
        reader.onload=()=>{
            console.log(reader);
            setImage(reader.result);
        }
    }
    
    return(
        <div className=" w-full " onSubmit={handleSubmit}>
            <form  className="overflow-x-hidden overflow-y-auto w-full h-full ml-[3.23em] ">
                <div className="text-white flex flex-col items-start justify-center mb-[0.89em]">
                <label htmlFor="title" className="mb-[0.56em] text-[1.275rem] leading-[1.375rem] text-richblack-5 font-mono">Title<sup className="text-pink-500">*</sup></label>
                <input
                    type="text"
                    name="title"
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}
                    placeholder="Title"
                    className="bg-white text-black h-[2.87em] border-2 w-[85%] border-richblack-400 mt-[0.07em] "
                />
                </div>
                
                <div className="text-white flex flex-col items-start justify-center mb-[0.89em]">
                <label htmlFor="price" className="mb-[0.56em] text-[1.275rem] leading-[1.375rem] text-richblack-5 font-mono">Price<sup className="text-pink-500">*</sup></label>
                <input
                    required
                    type="number"
                    name="price"
                    min={0}
                    onChange={(e)=>setPrice(e.target.value)}
                    value={price}
                    placeholder="Price"
                    className="bg-white text-black h-[2.87em] border-2 w-[85%] border-richblack-400 mt-[0.07em] "
                />
                </div>

                <div className="text-white flex flex-col items-start justify-center mb-[0.89em]">
                <label htmlFor="saving_price" className="mb-[0.56em] text-[1.275rem] leading-[1.375rem] text-richblack-5 font-mono">Price<sup className="text-pink-500">*</sup></label>
                <input
                    required
                    type="number"
                    name="price"
                    min={0}
                    onChange={(e)=>set_Saving_price(e.target.value)}
                    value={saving_price}
                    placeholder="Price"
                    className="bg-white text-black h-[2.87em] border-2 w-[85%] border-richblack-400 mt-[0.07em] "
                />
                </div>

                <div className="text-white flex flex-col items-start justify-center mb-[0.89em]">
                <label htmlFor="category" className="mb-[0.56em] text-[1.275rem] leading-[1.375rem] text-richblack-5 font-mono">Categories<sup className="text-pink-500">*</sup></label>
                    <select className="bg-white text-black h-[2.47em] rounded-sm w-[85%] border-2 border-richblack-400 mt-[0.07em]" name="category" onChange={(e)=>setCategory(e.target.value)} >
                        {
                           allCategories.length>0 && allCategories.map((category,index)=>{
                                return(
                                    <option key={index} value={category?._id}>{category?.categoryName}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="text-white flex flex-col items-start justify-center mb-[0.89em]">
                    <label htmlFor="file" className="mb-[0.56em] text-[1.275rem] leading-[1.375rem] text-richblack-5 font-mono">Product Image<sup className="text-pink-500">*</sup></label>
                    <input
                        required
                        type="file"
                        name="file"
                        onChange={(e)=>func(e)}
                        className="bg-white text-black h-[2.87em] border-2 w-[85%] border-richblack-400 mt-[0.07em] "
                    />
                </div>
                
                <div className="text-white flex flex-col items-start justify-center mb-[0.89em]">
                    <label htmlFor="stock" className="mb-[0.56em] text-[1.275rem] leading-[1.375rem] text-richblack-5 font-mono">Stock<sup className="text-pink-500">*</sup></label>
                    <input
                        required
                        type="number"
                        min={0}
                        name="stock"
                        value={stock}
                        onChange={(e)=>setStock(e.target.value)}
                        placeholder="Stock"
                        className="bg-white text-black h-[2.87em] border-2 w-[85%] border-richblack-400 mt-[0.07em] "
                    />
                </div>
                <div className=" w-full text-center ">
                    <button className="text-white text-lg h-[50px] w-[20%] bg-[#142569] rounded-lg">Add Product</button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct