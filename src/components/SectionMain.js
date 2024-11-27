import React from "react";
import Navbar from "./Navbar";
import SectionMain_content from "./HomeContent"

const SectionMain=(props)=>{
    // console.log(props.navItems);
    return(
        <div className="flex mx-auto w-full flex-col items-center justify-between gap-[1rem]">
            <div>
                <Navbar a
                    navItems = {props.navItems}
                />
            </div>
            <div>
                <SectionMain_content/>
            </div>

        </div>
    )
}

export default SectionMain;