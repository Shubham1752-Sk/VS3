import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useState } from "react";
import { useEffect } from "react";
import { SignUp } from "../services/Auth";

const Verify_email = () => {
    const { signUpdata } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const dispatch=useDispatch();
    useEffect(()=>{
        if (!signUpdata) {
            navigate("signup");
        }
    },[])
    const{
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    }=signUpdata

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(SignUp(firstName,email,lastName,password,confirmPassword,navigate,otp));
        setOtp("");
    }

    return (
        <div className=" bg-richblue-2 h-screen w-screen opacity-70 ">
            <p className="text-[1.825rem] font-bold pt-2 text-white text-center capitalize">
                A verification code has been sent to you. Enter the code below
            </p>
            <div className="bg-white w-[55%] h-[35%] mx-auto mt-[1.23em] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] flex-col justify-start items-center rounded-xl">
                <form onSubmit={handleOnSubmit} className="mt-[1.23em] pt-[70px]">
                    <OTPInput
                        numInputs={6}
                        value={otp}
                        onChange={setOtp}
                        renderInput={(props) => (
                            <input
                                {...props}

                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[33px] font-semibold text-black mx-[1.23em] lg:w-[60px] border-2 border-black aspect-square text-center focus:outline-2 "
                            />
                        )}
                    />
                    <div className="flex w-[100%] justify-evenly mt-[1.03rem]">
                        <button className="text-richblue-2 font-semibold mt-[2.23em] ml-[2.23em]">Resend OTP</button>
                        <button type="submit" className="w-[50%] bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">Verify Email</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Verify_email