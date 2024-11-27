

import slide_image1 from "./ASSETS/IMAGES/Shop/banner-1.jpg"
import slide_image2 from "./ASSETS/IMAGES/Shop/banner-2.avif"
import slide_image3 from "./ASSETS/IMAGES/Shop/Banner-3.jpg"
import slide_image4 from "./ASSETS/IMAGES/Shop/banner-4.jpg"
import slide_image5 from "./ASSETS/IMAGES/Shop/banner-5.jpeg"
import slide_image6 from "./ASSETS/IMAGES/Shop/banner-6.jpeg"
import slide_image7 from "./ASSETS/IMAGES/Shop/banner-7.jpeg"
import {HiArrowLeft} from "react-icons/hi"
import { useState } from "react";

export default function Slider(){

    const [nextButton,setNextButton] = useState(true);
    const [prevButton,setPrevButton] = useState(false);

    const images =[ slide_image1 , slide_image2 , slide_image3 , slide_image4 , slide_image5 , slide_image6 , slide_image7 ];
    let img_no = 1;

    // const [img_no , setImg_no] = useState(1);
    const [image , setImage] = useState(images[img_no]);

    function nextHandler(){
        
        console.log('previous image no . is :' ,img_no);
        if(img_no == images.length){
            setNextButton(false);
        }
        else
            {   
                img_no+=1;
                setImage(images[img_no]);
                console.log('new image no . is :' ,img_no);
            }

        setPrevButton(true);
    }

    function prevHandler(){
        
        if(img_no != 1){
            img_no-=1;
            setImage(images[img_no]);
        }
        else
            setPrevButton(false);


        setNextButton(true);
    }

    return(
        <div className=" w-full h-full p-2 mt-6 ">
            
            <div className=" w-[95vw] h-[50vh] flex justify-between items-center">
                {
                    prevButton ? 
                    (
                        <button onClick={prevHandler} className=" w-[5%] h-[15%] bg-[#7d7777] rounded-[3rem] p-2 cursor-pointer ">
                            <HiArrowLeft className=" w-full h-[5vh]  "/>
                        </button>
                    ) : 
                    (
                        <div></div>
                    )
                }

                <div className=" w-[80vw] h-[60vh] ">
                    <img src={image} className=" w-full h-full " />
                </div>

                {
                    nextButton ?
                    (
                        <button onClick={nextHandler} className=" w-[5%] h-[15%] bg-[#7d7777] rounded-[3rem] p-2  cursor-pointer ">
                            <HiArrowLeft className=" w-full h-[5vh] rotate-180 "/>
                        </button>
                    ) :
                    (
                        <div></div>
                    )
                }
            </div>
        </div>
    )
}