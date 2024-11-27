import react from "react";
import Navbar from "./Navbar";
import ArrowShape from "./ArrowShape";

export default function AboutUsHome (){

    return (
        <div className=" relative w-full ">
            <div>
                <Navbar/>
            </div>

            <div className="absolute arrowShape w-[25%] h-[15%] bg-[#05498d] translate-x-[60rem] mt-[8.5rem] "></div>
            
            <div className=" w-full h-8/12 mt-[2rem] p-3 " >
                <h1 className="head text-8xl font-bold text-center tracking-[1rem] text-[#05498d] underline " >ABOUT</h1>
                <div className="  w-full bg-[#a8c5e4e8] mt-[2rem] ">
                    <p className=" w-9/12 mx-auto text-lg font-medium leading-[2.5rem] tracking-wider mt-4 text-[#ffffff] p-10 ">
                        <span className="text-7xl text-[#05498d]">V</span> S3 is more than a place where high performers come to be their best. VS3 has attracted global attention for its method of training and the incorporation of technology in its fitness regimens. It was rated the Top Training Gym in Times Of India and NYC in New York Magazine’s Best Of issue.
                    </p>
                </div>

            <div className="absolute arrowShape w-[25%] translate-x-[-0.9rem] h-[15%] bg-[#05498d] mt-[-10rem] rotate-180 "></div>
                
            </div>

            <div className="h-[100vh] w-11/12 flex gap-4 mx-auto mt-[10rem] justify-center items-center ">
                    <div className=" w-1/2 flex flex-col justify-center " >
                        <h1 className="head tracking-[0.7rem] text-6xl font-bold text-[#05498d] ">Our Mission</h1>
                        <p className=" w-10/12 text-lg font-medium leading-[2.5rem] tracking-wider mt-4 ">We are the un-corporation. Our mission is to provide you with all the tools you need to reach your fitness goals in a clean, vibrant, engaging environment you will be proud to call your GYM. We won’t hold you hostage like other fitness clubs, you’ll want to stay because we care!</p>
                    </div>
                    <div className="img-container w-1/2 h-[90%] ">
                        {/* <img src="./ASSETS/IMAGES/resources/gym-interior.webp" className="loading-lazy" /> */}
                    </div>
            </div>

        </div>
    )

}