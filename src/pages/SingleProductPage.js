import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ShopNavbar from '../components/ShopNavbar';
import { SingleProductById } from '../services/Auth';
import { useDispatch, useSelector } from 'react-redux';
import {  Dialog, DialogTitle,Rating, Typography } from '@mui/material';
import { CreateRating } from '../services/Auth';
import { AddToCart } from '../services/Auth';

const SingleProductPage = () => {
  const loacation=useLocation()
  const dispatch=useDispatch()
  const {token}=useSelector((state)=>state.auth)
  const [ratingValue,setRatingValue]=useState(0)
  const id=loacation.pathname.split("/").at(-1);
  const [SingleProduct,setSignProduct]=useState(null);
  const [price,setPrice]=useState(null)
  const [open,setOpen]=useState(false);
  const [review,setReview]=useState("")
  const [Quantity,setQuantity]=useState(0);

  useEffect(()=>{
    SingleProductById(dispatch,id,setSignProduct,setPrice);
  },[])

  const handleRatingSubmit=(e)=>{
    e.preventDefault();
    console.log(ratingValue,review)
    CreateRating(dispatch,SingleProduct._id,ratingValue,review,token)
  }
  
  return (
    <>
        <ShopNavbar/>
        {
            SingleProduct!=null?(
                <div className='h-[50vh] mt-[2.34em] w-[100vw] flex flex-row '>
                    <div className='h-[100%] w-[30%] rounded-md flex flex-row justify-center items-center'>
                        <img src={SingleProduct.image} className='w-[55%] h-[75%]'/>
                    </div>
                    <div className='h-[100%] w-[70%] pb-[7.33em] flex flex-col '>
                        <p className='text-richblack-900 text-2xl font-inter font-semibold mt-[2.34em] flex flex-wrap h-[20%] w-[80%] '>{SingleProduct.title}</p>
                        <p className='font-bold mt-[20px] text-[1.74em] '>{price.current_price}</p>
                        {
                            SingleProduct.stock>0?(
                                <div className=' text-richblack-700 font-semibold text-xl capitalize mt-[0.48em]'>
                                    In Stock
                                </div>
                            ):(<div>
                                Out Stock
                            </div>)
                        }
                        <div className=' flex flex-row w-[60%] h-[20%] '>
                            <p className='text-richblack-900 font-semibold text-xl'>Quantity:</p>
                            <div className='flex flex-row h-[100%] w-[30%] justify-evenly items-center'>
                                <button className='h-[45px] w-[50px] bg-richblack-200 rounded-md flex justify-center items-center text-richblack-900 text-[2.14em] font-extrabold' onClick={()=>{
                                    if(Quantity==0){
                                        return
                                    }
                                    else{
                                        setQuantity(Quantity-1);
                                    }
                                }}>-</button>
                                <div className='h-[45px] w-[50px] text-richblack-900 text-[1.54em] flex justify-center items-center font-extrabold'>{Quantity}</div>
                                <button className='h-[45px] w-[50px] bg-richblack-200 rounded-md flex justify-center items-center text-richblack-900 text-[2.14em] font-extrabold' onClick={()=>{
                                    setQuantity(Quantity+1);
                                }}>+</button>
                            </div>
                        </div>
                        <button className=" bg-black text-[21px] mt-[0.45em] w-[25%] text-white font-inter font-medium transition-all hover:bg-orange-2" onClick={()=>{
                                AddToCart(dispatch,token,SingleProduct._id,Quantity)
                            }}>Add To Cart</button>
                        <button onClick={()=>{
                            setOpen(false);setReview("");setRatingValue(0)
                        }}>Submit Review</button>
                    </div>
                </div>
            ):(
                <div>
                    Loading...
                </div>
            )
        }
        <Dialog open={open}  onClose={()=>setOpen(false)}>
            <DialogTitle fontWeight={"bold"} fontSize={"23px"} textAlign={"center"}>Add Review</DialogTitle>
            <form className='flex flex-col items-center justify-center h-[40vh] w-[50vh] m-[1.34em]' onSubmit={handleRatingSubmit}>
                <Typography mt={"1em"} fontSize={"19px"}>Add Ratings</Typography>
                <Rating aria-required value={ratingValue} precision={0.25} size='34' onChange={(event,newvalue)=>{
                    setRatingValue(newvalue)
                }}/>
                <div className='flex flex-col items-center justify-center'>
                    <Typography mt={"1em"} fontSize={"19px"}>Add Review</Typography>
                    <textarea className=' border-2 border-richblack-800 h-[165px] w-[257px] rounded-sm' name='review' value={review} onChange={(e)=>setReview(e.target.value)}></textarea>
                </div>
                <button>Submit Review</button>
            </form>
        </Dialog>
    </>
  )
}

export default SingleProductPage