import React from "react";
import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { ViewProducts,DeleteProduct } from "../services/Auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import {  Dialog, DialogTitle,Rating, Typography } from '@mui/material';
import { deleteItem } from "../slices/ProductSlice";


const ProductActions=()=>{
    const dispatch=useDispatch()
    const { allItems } = useSelector((state) => state.product )
    const [open,setOpen]=useState(false);
    useEffect(()=>{
        ViewProducts(dispatch)
        console.log(allItems)
    },[])
    return(
        <div className=" w-[80%] overflow-x-hidden overflow-y-auto bg-transparent opacity-95">

            <div class="flex flex-col w-full items-start">
                <div class="w-full ">
                    {/* <p className="text-white text-2xl font-bold font-inter ml-[1.23em]">Customers</p>
                    <p className=" text-richblue-2 mt-[0.49em] font-inter text-xl ml-[1.49em] font-semibold mb-[0.63em]">List Of Customers</p> */}
                    <div class=" flex justify-start">
                        <table className="w-[60%] ">
                            <thead class="bg-gray-50 text-richblack-25">
                                <tr>
                                    <th class="px-3 py-1 text-lg  border-collapse border-dashed border-2 border-richblack-5 border-l-0 border-t-0 text-gray-500 font-semibold font-inter text-left">
                                        ID
                                    </th>
                                    <th class="px-3 py-3 text-lg  border-collapse border-dashed border-2 border-richblack-5 border-t-0 text-gray-500 font-semibold font-inter text-left">
                                        Product Name
                                    </th>
                                    <th class="px-3 py-1 text-lg  border-collapse border-dashed border-2 border-richblack-5 border-t-0 text-gray-500 font-semibold font-inter text-left">
                                        Stock
                                    </th>
                                    <th class="px-3 py-1 text-lg  border-collapse border-dashed border-2 border-richblack-5 border-t-0 border-r-0 text-gray-500 font-semibold font-inter text-left">
                                        Current Price
                                    </th>
                                    <th class="px-3 py-1 text-lg  border-collapse border-dashed border-2 border-richblack-5 border-t-0 text-gray-500 font-semibold font-inter text-left">
                                        Original Price
                                    </th>
                                    <th class="px-3 py-1 text-lg  border-collapse border-dashed border-2 border-richblack-5 border-t-0 text-gray-500 font-semibold font-inter text-left">
                                        Discount %
                                    </th>  
                                    <th class="px-3 py-1 text-lg  border-collapse border-dashed border-2 border-richblack-5 border-t-0 border-r-0 text-gray-500 font-semibold font-inter text-left">
                                        Actions 
                                    </th>                                    
                                </tr>
                            </thead>
                            <tbody className="bg-transparent  text-richblack-5">
                                {
                                    allItems.length > 0 ? allItems.map((item) => {
                                        return (
                                            <tr className="whitespace-nowrap overflow-x-scroll " key={item._id}>
                                                <td className="px-3 py-1 text-medium font-medium border-collapse border-dashed border-2  border-richblack-5 border-l-0 border-b-0 ">
                                                    {item?._id}
                                                </td>
                                                <td className="px-3 py-1 text-medium font-medium tracking-wider border-collapse border-dashed border-2  border-richblack-5 border-b-0 ">
                                                    {`${item?.title.toString().substring(0,20)}...`}
                                                </td>
                                                <td className="px-3 py-1 text-medium font-medium tracking-wider border-collapse border-dashed border-2  border-richblack-5 border-b-0 ">
                                                    {item?.stock}
                                                </td>
                                                <td className="px-3 py-1 text-medium font-medium tracking-wider border-collapse border-dashed border-2  border-richblack-5 border-b-0 ">
                                                    { 
                                                        1 && item.price.discounted ? (
                                                            item.price.current_price
                                                    ) : (
                                                        <p>--</p>
                                                    ) }
                                                </td>
                                                <td className="px-3 py-1 text-medium font-medium tracking-wider border-collapse border-dashed border-2  border-richblack-5 border-b-0 ">
                                                    { item.price.before_price === '0' ? (item.price.savings_percent) : (<p></p>)}
                                                </td>
                                                <td className="px-3 py-1 text-medium font-medium tracking-wider border-collapse border-dashed border-2  border-richblack-5 border-b-0 ">
                                                    { !item.price.discounted ? (
                                                        <p>--</p>
                                                    ) : (
                                                        item.price.savings_percent
                                                    ) }
                                                </td>
                                                
                                                <td className="px-6 py-4 border-collapse border-dashed border-2  border-richblack-5 border-r-0 border-b-0 ">
                                                    <button className="  shadow-sm shadow-richblack-5 w-[40%] " onClick={(e)=>setOpen(true)} >Edit</button>
                                                    <button className=" shadow-sm shadow-richblack-5 w-[40%] " onClick={(e) => {
                                                        DeleteProduct(dispatch,item._id)
                                                        dispatch(deleteItem(item._id));
                                                    }}>Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <div>
                                            Loading..
                                        </div>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle fontWeight={"bold"} fontSize={"23px"} textAlign={"center"}>Edit Product</DialogTitle>
                <form className='flex flex-col items-center justify-evenly h-[30vh] w-[60vh] m-[1.34em]' >
                    <input type="text" className="h-[6vh] w-[80%] border-richblack-800 rounded-md border-2" />
                    <input type="number" className="h-[6vh] w-[80%] border-richblack-800 rounded-md border-2" />
                    <input type="number" className="h-[6vh] w-[80%] border-richblack-800 rounded-md border-2" />
                    
                    <button onClick={() => setOpen(false)}>Save Changes</button>
                </form>
            </Dialog>
        </div>
    );
}

export default ProductActions;