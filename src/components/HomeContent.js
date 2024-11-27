import React from "react";
import { useNavigate } from "react-router-dom";

const HomeContent= (props) =>{

    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-[80vh] flex-wrap  items-center justify-between w-full">
            <div className="text-container flex flex-col items-center mt-[5rem] justify-between relative w-[100vw]">
                <marquee scrollamount="10" scrolldelay="0" className="absolute w-[110%] z-[-10] text-[14rem] text-[#dddcda] tracking-[1.5rem] font-bold " >GYM FIT LIFESTYLE</marquee>
                <h1 className="overlapping-text text-[3.5rem] z-50 text-[#2b2a2ad4] mt-[7.5rem] tracking-[1rem] font-bold ">BUILT FOR POWER</h1>
            </div>
            <div className="button-container">
                <button onClick={()=> navigate("/shop")} className=" translate-y-[-6rem] purchase-btn w-[200px] h-[50px] p-3 bg-[#4b80fa] font-bold text-white cursor-pointer rounded-xl text-center tracking-[0.2rem] mt-[-2rem] ">PURCHASE</button>
            </div>
        </div>
    )
}

export default HomeContent;