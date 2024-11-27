import React , { useState } from "react";
import { useNavigate } from "react-router-dom"
import CategoryDropDown from "../components/CategoryDropDown"
import ProductsDropDown from "../components/ProductsDropDown"
import AddCategory from "./AddCategory"
import AddProduct from "./AddProduct"
import ProductsView from "./ProductsView"
import CategoryActions from "./CategoryActions"
import AdminRightPanel from "./AdminRightPanel"


const AdminPanel =() =>{

    const navigate = useNavigate();

    const [ categoryDropdown , setCategoryDropDown ] = useState(false);
    const [ productDropdown , setProductDropDown ] = useState(false);
    const [ addCategory , setAddCategory ] = useState(false);
    const [ categoryActions , setCategoryActions ] = useState(false);
    const [ addProduct , setAddProduct ] = useState(false);
    const [ productView , setProductView ] = useState(false);
    const [ menuSelected , setMenuSelected ] = useState(false);

    const func =()=>{
        setAddCategory(false);
        setAddProduct(false);
        setCategoryActions(false);
        setMenuSelected(false);
        navigate("/admin")
    }

    return(

        <div className="admin-bg w-full h-[100vh] flex items-center  flex-wrap bg-[#95f0e6df] overflow-x-hidden " >
            <div className="rounded-tr-[4rem] w-[20%] h-[100vh] flex flex-col items-center gap-[2rem] bg-[#4881dca0] text-white m-0 ">

                <h1 className=" text-[2rem] font-bold leading-[5.5rem] tracking-wide ">MENU</h1>

                <div className=" w-full h-[70%] pl-2 flex flex-col items-start gap-4 justify-center text-lg cursor-pointer ">
                    
                        <div className=" w-full h-[10%]  ">
                            <p onClick={ func } className="p-1 leading-[3rem] hover:text-[#4881dc] hover:bg-white hover:px-8 transition-all duration-[0.5s] " >HOME</p>
                        </div>

                        <div className=" flex flex-col gap-2 w-full h-[10%] ">
                            <p onClick={() => setCategoryDropDown((prev) =>  !prev )} className="p-1 leading-[3rem] hover:text-[#4881dc] hover:bg-white hover:px-8 transition-all duration-[0.5s] " >CATEGORIES</p>
                            {
                                categoryDropdown && <CategoryDropDown setAddCategory={setAddCategory} setCategoryActions={setCategoryActions} setAddProduct={setAddProduct} setMenuSelected={ setMenuSelected} className=" w-[20%] "/> 
                            }
                        </div>
                        <div className=" flex flex-col gap-2 w-full h-[10%] ">
                            <p onClick={() => setProductDropDown((prev) =>  !prev )} className="p-1 leading-[3rem] hover:text-[#4881dc] hover:bg-white hover:px-8 transition-all duration-[0.5s] " >PRODUCTS</p>
                            {
                                productDropdown && <ProductsDropDown setAddProduct={setAddProduct} setAddCategory={setAddCategory} setCategoryActions={setCategoryActions} setMenuSelected={ setMenuSelected} setProductView={setProductView} className=" w-full "/> 
                            }
                        </div>
                        <div className=" w-full h-[10%] ">
                            <p className="p-1 leading-[3rem] hover:text-[#4881dc] hover:bg-white hover:px-8 transition-all duration-[0.5s] " >USERS</p>
                        </div>
                        <div className=" w-full h-[10%] ">
                            <p className="p-1 leading-[3rem] hover:text-[#4881dc] hover:bg-white hover:px-8 transition-all duration-[0.5s] " >ORDERS</p>
                        </div>
                        <div className=" w-full h-[10%] ">
                            <p className="p-1 leading-[3rem] hover:text-[#4881dc] hover:bg-white hover:px-8 transition-all duration-[0.5s] " >LOGOUT</p>
                        </div>

                </div>

            </div>

            <div className=" w-[80%] h-full flex flex-col gap-2 flex-wrap justify-center items-center">
                {/* <p className=" text-4xl font-bold text-center text-[#ffffffa2] leading-loose tracking-wide ">Admin Section</p> */}
                {/* <AddProduct className="w-[90%]" /> */}
                {
                    
                    menuSelected ? (
                        ( addCategory && <AddCategory/> ) || ( categoryActions && <CategoryActions/> ) || ( addProduct && <AddProduct/> ) || ( productView && <ProductsView className=" flex justify-start " /> )
                    ) : 
                    (
                        <AdminRightPanel />
                    )
                    
                }
            </div>
        </div>
    )
}

export default AdminPanel;