import React  from "react";
import Login from "../../pages/Login"
import SignUp from "../../pages/Signup"

const Template = ({formType}) => {
    return (
        <div className=" h-[80%] w-[25%] flex flex-col justify-center items-center bg-[rgba(240, 248, 255, 0.225)] border-[rgba(0,0,0,0.25)]  ">
            <p>
                {
                    formType === 'login' ? ("Login") : ("Sign Up")
                }
            </p>

            <div>
                formType ==='login' ? (<Login/>) : (<SignUp/>)
            </div>
        </div>
    )
}

export default Template;