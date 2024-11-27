import {motion} from "framer-motion";
import {useRef , useEffect , useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from "styled-components";
import slide_image1 from "./ASSETS/IMAGES/Shop/banner-1.jpg"
import slide_image2 from "./ASSETS/IMAGES/Shop/banner-2.avif"
import slide_image3 from "./ASSETS/IMAGES/Shop/Banner-3.jpg"
import slide_image4 from "./ASSETS/IMAGES/Shop/banner-4.jpg"
import slide_image5 from "./ASSETS/IMAGES/Shop/banner-5.jpeg"
import slide_image6 from "./ASSETS/IMAGES/Shop/banner-6.jpeg"
import slide_image7 from "./ASSETS/IMAGES/Shop/banner-7.jpeg"

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


  const images =[ slide_image1 , slide_image2 , slide_image3 , slide_image4 , slide_image5 , slide_image6 , slide_image7 ];

export default function Slider2(){
    return(
        <div className="APP">

        <div>
            in the 2ns slider
        </div>

        <Carousel responsive={responsive}>
            {
                images.map((image)=>{
                return (
                    <div className=" w-[80vw] h-[60vh] ">
                        <img src={image} className=" w-full h-full " />
                    </div>
                )
            })
            }
        </Carousel>;

        {/* <Wrapper>
            <div className="container">
                <div classname="wrapper">
                    <div className="banner-image">
                        <figure>
                            <img src={}/>
                        </figure>
                        <h1> {title}</h1>
                        <p>summary</p>
                    </div>
                </div>
            </div>
        </Wrapper> */}

        {/* <motion.h1 animate={{X:250}}> HEllo </motion.h1> */}
        </div>
    )
}

const Wrapper = styled.section