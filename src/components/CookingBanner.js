import React from "react"
import image from "../components/ASSETS/IMAGES/user/resources/cooking-banner-4.jpg"

export default function CookingBanner(){
    return(
        <div className="cooking-banner w-[100vw] h-[20vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  ">
            <img className=" w-full h-full  " src ={image} />
        </div>
    )
}