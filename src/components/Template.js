import React from "react";
import Loginform from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm"

const Template = ({title,logInHandler,setLogInHandler,formType}) =>{
    return (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center ">

           <div className="h-[80%] w-[25%] flex flex-col  justify-center items-center  bg-[#f0f8ff7a] border-richblack-500 border-2 space-y-4 rounded-md shadow-richblack-300 ">
                <p className="text-center text-[3rem] font-semibold text-[#414444]  "> 
                    {
                    formType === 'login ' ? ('LOGIN') : ('SIGN UP')
                    }
                </p>
                {
                    formType === 'login' ? (<Loginform logInHandler={logInHandler} setLogInHandler={setLogInHandler}/>) :(<SignUpForm logInHandler={logInHandler} setLogInHandler={setLogInHandler} />)
                }
           </div>

        </div>
    )
}

export default Template;    