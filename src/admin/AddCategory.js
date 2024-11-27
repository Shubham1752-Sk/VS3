import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCategorys, UpdateCategory } from "../services/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddCategory=()=>{
    const {EditCategory}=useSelector((state)=>state.category)
    const initialState=EditCategory?(EditCategory.categoryName):("")
    const [categoryname,setCategoryName]=useState(initialState);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    
    const handleonSubmit=(e)=>{
        console.log(EditCategory)
        e.preventDefault();
        
        if(!EditCategory)
            dispatch(AddCategorys(categoryname,navigate));
        else
            dispatch(UpdateCategory(categoryname,EditCategory._id,dispatch))
        
        setCategoryName("");
    }
    return(
        <div className=" w-[90%] p-6 border-[1px] border-richblack-100 shadow-richblack-5 shadow-lg rounded-full gap-6 ">
            <form onSubmit={handleonSubmit} className=" flex flex-col gap-8 " >
                <div className=" flex flex-wrap items-center " >
                    <label htmlFor="categoryName" className=" text-3xl font-bold px-8 text-[#aedbe1ea] " >Category Name<sup>*</sup></label>
                    <input className=" w-[30%] placeholder:text-[#aedbe1ea] placeholder:text-xl shadow-sm shadow-richblack-5 "
                        required
                        type="text"
                        onChange={(e)=>setCategoryName(e.target.value)}
                        placeholder="Enter Catgory Name"
                        value={categoryname}
                    />
                </div>
                <div className=" w-full mx-auto h-[4rem] text-center  ">
                    {
                        EditCategory?(<button className=" w-full mx-auto  " >Save Changes</button>):(<button className=" w-[20%] mx-auto h-full bg-[#1a2892] rounded-full p-2 text-xl text-white shadow-sm shadow-richblack-5 " >Add Category</button>)
                    }
                </div>
            </form>
        </div>
    );
}

export default AddCategory