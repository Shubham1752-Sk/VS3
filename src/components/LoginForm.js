import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Login_Info } from '../services/Auth';

const LoginForm = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [formData,setFormData]=useState({
       email:"",
       password:""     
    })

    const changeHandler=(e)=>{
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }))
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(Login_Info(formData.email,formData.password,navigate))
        setFormData({
            email:"",
            password:""
        })
    }
    const {token}=useSelector((state)=>state.auth)
    return (
            <form onSubmit={submitHandler} className='gap-[0.3rem] mx-auto w-[80%] space-y-4 py-4 '>
                <label >
                    <p className='text-[1.1rem] text-[#353935]  '>
                        Email Address<sup>*</sup>
                    </p>
                    <input className='pb-1 w-[100%] placeholder:text-[#efe6e6e0] placeholder:text-lg'
                        required
                        type="email"
                        value = {formData.email}
                        onChange={changeHandler}
                        placeholder="Enter email id"
                        name="email"
                    />
                </label>
        
                <label className=' relative '>
                    <p className='text-[1.1rem] text-[#353935]  mt-2'>
                        Password<sup>*</sup>
                    </p>
                    <input className='pb-1 w-[100%] placeholder:text-[#efe6e6e0] placeholder:text-lg'
                        required
                        type= {showPassword ? ("text") : ("password")}
                        value = {formData.password}
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        name="password"
                    />
        
                    <span className='absolute mt-1 text-[2rem] ml-[-2rem] ' onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                    </span>
        
                    {
                        token==null && (
                            <Link to="/forgot-password">
                                <p className='text-[0.9rem] w-[80%] ml-[57%] cursor-pointer text-[#353935]  mt-1'>
                                    Forgot Password?
                                </p>
                            </Link>
                        )
                    }
                </label>
        
                <button className='h-[15%] w-[64%] text-lg cursor-pointer rounded-xl border-none bg-gradient-to-br from-[#F7F7F7] to-[#A5A5A5] ml-[17%] text-[#303030] font-semibold   ' >
                    Sign In
                </button>
        
            </form>
        )
        
}

export default LoginForm;