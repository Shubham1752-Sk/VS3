import React from "react";
import {BiLocationPlus} from "react-icons/bi"
import {MdOutlineMailOutline} from "react-icons/md"
import {FcPhoneAndroid} from "react-icons/fc"

const ContactUs=()=>{
    return(
        <div>
            <div className="uppercase h-[3.43em] pt-[1.03em] bg-richblack-300 text-white text-center text-[1.43em] w-screen font-semibold  mt-[2.34em] ">Contact Us</div>
            <div className=" w-screen h-[70vh] flex flex-row ">
                <div className="h-[100%] w-[50%] flex flex-col items-center justify-center">
                    <p className="text-[2.34em] font-bold justify-start">Feel Free To Contact Us</p>
                    <div className=" mx-auto flex w-[65%] h-[25%] flex-row items-center justify-evenly mt-[1.49em] ">
                        <BiLocationPlus size={20}/>
                        <span className="text-[1.23em]">Address goes here, street, Crossroad 123.</span>
                    </div>
                    <div className=" mx-auto flex w-[65%] h-[25%] flex-row items-center justify-around mt-[0.89em] ">
                        <FcPhoneAndroid size={20} className="-ml-[68px]"/>
                        <a href="tel:+917814405105" className="text-[1.23em]">7814405105</a>
                    </div>
                </div>
                <div className="h-[100%] w-[50%] mt-[4.34em]">

                    <form action="https://formspree.io/f/xaygwqqn" method="post" className="flex flex-col justify-center items-center shadow-md h-auto">
                        <input
                            className="border-solid border border-pure-greys-2 mt-[3.34em]   placeholder:text-black h-12 w-[80%] focus:outline-none  "
                            type="text"
                            name="name"
                            required
                            placeholder="Name"
                        />
                        <input
                            className="border-solid border border-pure-greys-2 mt-[1.34em] placeholder:text-black h-12 w-[80%] focus:outline-none  "
                            required
                            type="email"
                            placeholder="Email"
                            name="email"
                        />
                        <textarea 
                            className="border-solid border border-pure-greys-2 mt-[1.34em] mb-[2.34em] placeholder:text-black w-[80%] focus:outline-none  "
                            required
                            name="message"
                            rows={8} 
                            cols={8} 
                            placeholder="Message" />
                        <button type="submit" className=" bg-black h-[2.23em] mb-[1.45em] w-[45%] text-white font-inter font-medium transition-all hover:bg-orange-2">Send Message</button>
                    </form>
                </div>
            </div>
            <div className="mt-[6.34em] w-screen h-[40vh]">
               <iframe className="h-[100%] w-[100%]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.5066248977805!2d74.90422097552103!3d31.619976274168444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39197d801271aab5%3A0x59fed7c2ea02e603!2sAlfa%20one!5e0!3m2!1sen!2sin!4v1687675115027!5m2!1sen!2sin"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    );
}

export default ContactUs