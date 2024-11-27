import React ,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories , fetchAllCustomers , ViewProducts } from "../services/Auth";

const AdminRightPanel = ()=>{

    const { allCategories } = useSelector((state) => state.category)
    const { allCustomers } = useSelector((state) => state.profile)
    const { allItems } = useSelector((state) => state.product )
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAllCategories(dispatch)
        fetchAllCustomers(dispatch)
        ViewProducts(dispatch)
        console.log("All Customers are :-")
    }, [])

    return(
        <div className=" w-full h-full mx-auto mt-4 ">
            
            <div className=" flex w-[80%] h-[30%] mx-auto justify-between">

                <div className=" w-[15%] h-[63%] border-[10px] rounded-full border-[#9681cf] text-center flex flex-col justify-start items-center flex-wrap cursor-pointer hover:scale-[1.08] hover:border-[#54bee88b] transition-all duration-[0.2] ">
                    <p className=" text-[3rem] text-[#c5dae2fb] "> {allCategories.length>0?<p>{allCategories.length}</p>:<p>Loading...</p>} </p>
                    <p className=" text-[1rem] text-[#b394c0] ">CATEGORIES</p>
                </div>

                <div className=" w-[15%] h-[63%] border-[10px] rounded-full border-[#9681cf] text-center flex flex-col justify-start cursor-pointer items-center flex-wrap hover:scale-[1.08] hover:border-[#54bee88b] transition-all duration-[0.2] ">
                    <p className=" text-[3rem] text-[#c5dae2fb] ">{allCustomers.length>0?<p>{allCustomers.length}</p>:<p>Loading..</p>} </p>
                    <p className=" text-[1rem] text-[#b9a4c3] ">USERS</p>
                </div>

                <div className=" w-[15%] h-[63%] border-[10px] rounded-full border-[#9681cf] text-center flex flex-col justify-start cursor-pointer items-center flex-wrap hover:scale-[1.03] hover:border-[#54bee88b] transition-all duration-[0.2] ">
                    <p className=" text-[3rem] text-[#c5dae2fb] ">{allItems.length>0?<p>{allItems.length}</p>:<p>Loading..</p>} </p>
                    <p className=" text-[1rem] text-[#b394c0] ">PRODUCTS</p>
                </div>

                <div className=" w-[15%] h-[63%] border-[10px] rounded-full border-[#9681cf] text-center flex flex-col justify-start cursor-pointer items-center flex-wrap hover:scale-[1.03] hover:border-[#54bee88b] transition-all duration-[0.2] ">
                    <p className=" text-[3rem] text-[#c5dae2fb] ">{allCustomers.length>0?<p>{allCustomers.length}</p>:<p>Loading..</p>} </p>
                    <p className=" text-[1rem] text-[#b394c0] ">ORDERS</p>
                </div>

            </div>
        </div>
    )
}

export default AdminRightPanel;