import { useState, useEffect } from "react";
// import Slider2 from "../components/Slider"
import ShopNavbar from "../components/ShopNavbar";
import banner from "../components/ASSETS/IMAGES/Shop/banner-8.jpg"
import proteinBanner from "../components/ASSETS/IMAGES/Shop/banner-12.webp"
import { ViewProducts, fetchAllCategories } from "../services/Auth";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { NavLink } from "react-router-dom";

export default function ShoppingPage() {

    const [loading, setLoading] = useState(false);
    const [fetchAllProducts, setAllProducts] = useState([]);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch()
    const { allCategories } = useSelector((state) => state.category)
    const { categoryItems } = useSelector((state) => state.product)
    const [arr, setArr] = useState([])
    useEffect(()=>{
        ViewProducts(dispatch);
    },[])

    return (
        <div className="w-full h-full" >
            <div className=" h-[100vh] ">
                <ShopNavbar />
                <div className=" w-full h-[65vh] mx-auto mt-1 ">
                    <img className=" w-full h-full " src={banner} />
                </div>
            </div>

            <div className=" flex flex-col gap-4 h-[100vh] ">
                <div className=" w-[95vw] h-[35vh] mx-auto ">
                    <img className=" w-full h-full " src={proteinBanner} />
                </div>
                {console.log(fetchAllProducts)}
                <div className=" w-[95vw] flex flex-wrap gap-2 justify-around mx-auto ">
                    {loading ? (<div>Loading...</div>) :
                        (
                            categoryItems.slice(9, 13).map((product) => {
                                return (
                                    <NavLink to={`/product_search/${product._id}`}>
                                        <ProductCard product={product} key={product._id} price={product.price}></ProductCard>
                                    </NavLink>
                                )
                            })
                        )
                    }
                </div>
                {
                    allCategories.length > 0 ? (
                        allCategories.map((category) => {
                            return (
                                <>
                                    <p>Items Relted to {category.categoryName}</p>
                                    <div className="flex w-full flex-row justify-around flex-wrap">
                                        {
                                            categoryItems.map((product) => {
                                                if (product.category === category._id) {
                                                    return (
                                                        <NavLink to={`/product_search/${product._id}`}>
                                                            <ProductCard product={product} key={product._id} price={product.price}></ProductCard>
                                                        </NavLink>
                                                    );
                                                }
                                            })
                                        }
                                    </div>
                                </>
                            );
                        })
                    ) : (
                        <div>Loading...</div>
                    )
                }
            </div>

        </div>
    )
}