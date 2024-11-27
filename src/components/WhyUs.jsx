import React from "react";
import {CgGym} from "react-icons/cg"
import {GrContact} from "react-icons/gr"
// import {TbTreadmill} from "react-icons/Tb"
// import {MdContactPage} from "react-icons/md"
import {GiGymBag} from "react-icons/gi"
import {MdContactPage,MdSportsGymnastics} from "react-icons/md"

export default function WhyUs() {
    return (
        <div className=" relative shape flex flex-wrap items-center gap-10 justify-center mt-5 h-[95vh] w-[90%] shape border-[20px] border-x-[#FFF] overflow-hidden">
            
            <div className=" absolute font-bold text-[5rem] text-[#1c4e81] w-[20%] ml-[-70%]  " >
                <div>V</div>
                <div>S</div>
                <div>3</div>
            </div>

            <div className=" inner-shape text-white h-full flex flex-col justify-center bg-[#5c7ac0bd] w-full mx-auto mr-[-50%] font-medium  ">
                <div className=" w-1/2 mr-[-80%]">
                    <h1 className=" head w-[80%] mr-1 mx-auto text-[5rem] font-thin text-[#ffffff] mt-[-4%] " >WHY US</h1>
                    <p className="w-[80%] mx-auto leading-6 tracking-2 text-lg border-white ">At VS3 Gym and Fitness, we believe that fitness and wellbeing are the cornerstones of a full and vibrant life. Established in 2002, we began our journey as a family-owned business dedicated to providing exceptional gym equipment at affordable prices. But, we dreamed bigger than just being an ordinary fitness equipment supplier; we aspired to lead the industry.</p>
                </div>
                
                <div className=" w-[80%] mx-auto gap-8 justify-start mt-3 flex flex-wrap text-7xl text-white">
                    <div>
                        <CgGym className=" w-[70px] p-2 border-[3px] rounded-full border-white" />
                    </div>
                    <div>
                        <MdContactPage className=" w-[70px] text-7xl p-1 text-white border-[3px] rounded-full border-white"  />
                    </div>
                    <div>
                        <MdSportsGymnastics className=" w-[70px] text-7xl p-1 text-white border-[3px] rounded-full border-white"  />
                    </div>
                    <div>
                        <GiGymBag className=" w-[70px] text-7xl p-1 text-white border-[3px] rounded-full border-white"  />
                    </div>
                </div>
            </div>

        </div>
    )
}