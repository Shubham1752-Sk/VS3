import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { filterByPrice, setItems } from '../slices/ProductSlice';
import ProductCard from '../components/ProductCard';
import ShopNavbar from '../components/ShopNavbar';
import {getProductsbyFilters , fetchProductsByCategory, ViewCartItems, ViewProducts } from '../services/Auth';
import { Checkbox } from '@mui/material';
import { apiConnector } from '../services/apiConnector';
import { endpoints } from '../services/api';
import { setLoading } from '../slices/AuthSlice';

const SearchPage = () => {
    const location = useLocation()
    const [checked,setChecked]=useState([])
    const searchInput = location.pathname.split("/").at(-1);
    let { all_items } = useSelector((state) => state.product)
    const [allProducts,setAllProducts]=useState([])
    const dispatch=useDispatch()
    const [priceFilter,setPriceFilter]=useState(0);
    const {allCategories}=useSelector((state)=>state.category)
    const [products, setProducts] = useState([])
    const priceArray=[
        {
            _id:1,
            value:50,
        },
        {
            _id:2,
            value:1000
        },
        {
            _id:3,
            value:1500
        },
        {
            _id:4,
            value:2000
        },
        {
            _id:5,
            value:2500
        }
    ]
    const FetchFilterdata=async()=>{
        try{
            const response=await apiConnector("POST",endpoints.GET_PRODUCTS_FILTERS,{checked,searchInput,priceFilter})
            if(response.data.succcess){
                setAllProducts(response.data.allProducts)
            }
            else{
                throw new Error("unable to fetch realted imformation")
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        if(checked.length>0 || priceFilter!=0){
            setLoading(true);
            FetchFilterdata();
            setLoading(false);
        }
        else{
            FetchFilterdata();
        }
    },[checked,searchInput,priceFilter])
    
    const handleFilter=(value,id,price)=>{
        let arr=[...checked]
        if(value){
            arr.push(id);
        }
        else{
            arr=arr.filter(c=>c!==id)
        }
        setChecked(arr);
        console.log("Arr",arr);
    }
return (
    <>
        <ShopNavbar />
        <div className=' h-[100vh] w-screen flex flex-row '>
            <div className='w-[30%] h-[90%] flex flex-col items-center justify-start over '>
                <div>Category Filter</div>
                {
                    
                    allCategories.length>0?(
                        allCategories.map((category)=>{
                            return (
                                <div>
                                    <input type='checkbox' name='categorynames' value={category._id} onChange={(e)=>handleFilter(e.target.checked,category._id)} />
                                    <label htmlFor='categorynames'>{category.categoryName}</label>
                                </div>
                            );
                        })
                    ):(
                        <div>Loading</div>
                    )
                }
                <div> Price Filter </div>
                <input type='range' value={priceFilter} onChange={(e)=>{
                    setPriceFilter(e.target.value)
                }} step={5} min={0} max={2800}
                />
            </div>
            <div className="max-h-screen w-[70%] flex flex-row flex-wrap overflow-x-hidden overflow-y-scroll">
                {
                    products.length > 0 ? (
                        products.map((product) => {
                            return (
                                <ProductCard product={product} key={product._id} price={product.price}></ProductCard>
                            );
                        })
                    ) : (
                        <div className='flex flex-row justify-evenly gap-10 mt-4 flex-wrap overflow-scroll '>
                            {
                                allProducts.length > 0 ?
                                    allProducts.map(product => {
                                        return (
                                            <ProductCard product={product} key={product._id} price={product.price}></ProductCard>
                                        );
                                    }
                                    ) : (
                                        <div>
                                            No Data found
                                        </div>
                                    )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    </>
)
}

export default SearchPage