import React from "react"
import Navbar from "../components/Navbar"
import HomeContent from "../components/HomeContent"
import video from "../components/ASSETS/videos/pexels-ron-lach-7676730.mp4"
import calesthenics from "../components/ASSETS/IMAGES/resources/calesthenics-image.jpeg"
import cardio from "../components/ASSETS/IMAGES/resources/cardio-image.jpg"
import bmi from "../components/ASSETS/IMAGES/resources/bmi.png"
import crossfit from "../components/ASSETS/IMAGES/resources/crossfit-image.webp"
import weightTraining from "../components/ASSETS/IMAGES/resources/weight-training.webp"
import yoga from "../components/ASSETS/IMAGES/resources/yoga-image.jpeg"
import zumba from "../components/ASSETS/IMAGES/resources/zumba-image.webp"
import FacilityCard from "../components/FacilityCard"
import { Link } from "react-router-dom"
import { GiMuscularTorso } from "react-icons/gi"
import { GiBiceps } from "react-icons/gi"
import { GiLegArmor } from "react-icons/gi"
import { GiShoulderArmor } from "react-icons/gi"
import { GiArmorPunch } from "react-icons/gi"
import { CiDumbbell } from "react-icons/ci";

const facilities= [ { title: 'Calesthenics', image: calesthenics } ,
                    { title: 'Cardio' , image: cardio } ,
                    { title: 'CrossFit' , image: crossfit } ,
                    { title: 'Weight Training' , image: weightTraining } ,
                    { title: 'Yoga' , image: yoga } ,
                    { title: 'Zumba' , image: zumba } 
                ];

const icons = [ GiArmorPunch , GiBiceps , GiLegArmor , GiMuscularTorso , GiShoulderArmor ] ;

const benifits1 = ['Exercise can make you feel happier' ,'Exercise can help with weight loss' , 'Exercise is good for your muscles and bones' , 'Exercise can increase your energy levels' , 'Exercise can reduce your risk of chronic disease'];
const benifits2 = ['Exercise can help skin health' , 'Exercise can help your brain health and memory' , 'Exercise can help with relaxation and sleep quality' , 'Exercise can reduce pain' , 'Exercise can promote a better sex life']

const HomePage = () => {

    return(
        <div className="flex mx-auto w-full h-[100vh] flex-col items-center justify-between gap-[1rem] overflow-x-hidden ">
            <div>
                <Navbar />
            </div>

            <div>
                <HomeContent />
            </div>
        
            <div className=" w-[100vw] h-[100vh] items-center ">
                <video autoPlay src={video}  loop muted className="bg-video relative w-[100vw] "/>
                <div className=" w-[100vw] text-center">
                    <div className=" w-[90%] h-[90vh] flex flex-wrap items-center text-center justify-between gap-4 mx-auto mt-[-50%] ml-[5%]">
                        {
                            facilities.map((facility)=>{
                                return <FacilityCard key={facility.index} facility ={facility} />    
                            })
                        }
                    </div>
                </div>
            </div>

            <div className=" w-screen h-[100vh] flex justify-center items-center " >
                <div className=" w-[45%] h-[90%] lazy ">
                    <img src={bmi} className="bmi-img loading-lazy " />
                </div>
                <div className="bmi-text h-full w-[50%] flex flex-col justify-center gap-[3rem] flex-wrap">
                        <p className=" text-[#2b2a2a] text-4xl leading-4 mt-[6rem]" >Fitness Element</p>
                        <h1 className=" text-[#2b2a2a] text-6xl leading-[5rem] tracking-widest uppercase " >
                            bmi <div>calculator</div>
                        </h1>
                        <p className=" text-xl text-[#6e6d6c] tracking-[.1rem] leading-[1.5rem] " >VS3 comes packed with the user-friendly BMI Calculator shortcode which lets your website visitors determine their Body Mass Index on the spot.</p>
                        <div className=" w-full h-[10%] mx-auto text-center " >
                            {/* <span class=" absoluteanimate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-100"></span> */}
                            <Link to="/bmi"><button className=" w-[20%] h-full bg-[#1954ff] text-white rounded-xl tracking-[0.1rem] " >Check it out</button></Link>
                        </div>
                </div>
            </div>

            <div className=" h-[98%] w-screen bg-white " >
                <div className=" relative shape2 h-[100vh] w-full mx-auto flex flex-col justify-start items-center gap-4 ">
                    <div className=" w-10/12 h-[15%] flex flex-wrap justify-between gap-4 mt-[4.5rem] " >

                            <div className=" w-[9%] h-full border-[5px] border-richblack-25 rounded-full p-2  ">
                                <GiMuscularTorso className=" w-full h-full text-white rounded-full " />
                            </div>
                            <div className=" w-[9%] h-full border-[5px] border-richblack-25 rounded-full p-2  ">
                                <GiBiceps className=" w-full h-full text-white rounded-full " />
                            </div>
                            <div className=" w-[9%] h-full border-[5px] border-richblack-25 rounded-full p-2  ">
                                <GiLegArmor className=" w-full h-full text-white rounded-full " />
                            </div>
                            <div className=" w-[9%] h-full border-[5px] border-richblack-25 rounded-full p-2  ">
                                <GiShoulderArmor className=" w-full h-full text-white rounded-full " />
                            </div>
                            <div className=" w-[9%] h-full border-[5px] border-richblack-25 rounded-full p-2  ">
                                <GiArmorPunch className=" w-full h-full text-white rounded-full " />
                            </div>
                    </div>

                    <div className=" w-8/12 h-3/6 flex gap-4 justify-between items-center ">
                        <div className=" w-5/12 h-full flex flex-col justify-around items-center ">
                            {                               
                                benifits1.map((benifit)=>{
                                    return(
                                        <div className=" w-full h-1/6 flex items-center gap-2 rounded-full ">
                                            <CiDumbbell className=" w-[10%] h-full text-white rounded-full animate-spin "  />
                                            <p className=" text-lg text-white font-normal ">{benifit}</p>
                                        </div>
                                    )
                                })
                            }    
                        </div>
                        <div className=" w-5/12 h-full justify-around items-center ">
                            {                               
                                benifits2.map((benifit)=>{
                                    return(
                                        <div className=" w-full h-1/6 flex items-center gap-2 ">
                                            <CiDumbbell className=" w-[10%] h-full text-white rounded-full  animate-spin "  />
                                            <p className=" text-lg text-white font-normal ">{benifit}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className=" texxt-xl text-white text-center " >
                            <p>~ ~ Get Trained by Special Workout Programs Designed By Our Experts .... <div><Link to="/excercise" className=" text-2xl animate-pulse mt-1 cursor-pointer " >Click Here to Know more !!</Link></div></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomePage ;