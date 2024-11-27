import React, { useState , useContext } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// import AppContext from './context/AppContext';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../services/Auth';
import { setSignUpdata } from '../slices/AuthSlice';

const SignUpForm = ({setLogIn}) => {

    // const { setLogIn , navigate , logIn   } = useContext(AppContext);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);

    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [formData, setFormdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword:"",
    })

    const changeHandler=(e)=>{
        setFormdata((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }))
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(setSignUpdata(formData))
        dispatch(sendOtp(formData.email,navigate));
        setFormdata({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword:"",
        })
    }
    

  return (
    <div className='gap-[0.3rem] mx-auto w-[100%] space-y-4  '>
        

        <form onSubmit={submitHandler} className='gap-[0.3rem] mx-auto w-[80%] ' >
            <div className=' flex justify-between' >
                    <label>
                        <p className='text-[1rem] text-[#353935]  '>First Name<sup>*</sup></p>
                        <input className='pb-1 w-[98%] placeholder:text-[#efe6e6e0] placeholder:text-sm'
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                        />
                    </label>

                    <label>
                        <p className='text-[1rem] text-[#353935]  '>Last Name<sup>*</sup></p>
                        <input className='pb-1 w-[100%] placeholder:text-[#efe6e6e0] placeholder:text-sm'
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                        />
                    </label>
            </div>
            <label>
                    <p className='text-[1rem] text-[#353935]  '>Email Address<sup>*</sup></p>
                    <input className='pb-1 w-[100%] placeholder:text-[#efe6e6e0] placeholder:text-lg'
                        required
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        placeholder="Enter Email Address "
                        value={formData.email}
                    />
            </label>
            <div>
                <label>
                    <p className='text-[1rem] text-[#353935]  '>Create Password<sup>*</sup></p>
                    <input className='pb-1 w-[100%] placeholder:text-[#efe6e6e0] placeholder:text-lg'
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        value={formData.password}
                    />
                    <span className='absolute mt-1 text-[2rem] ml-[-2rem] ' onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                    </span>
                </label>

                <label>
                    <p className='text-[1rem] text-[#353935]  '>Confirm Password<sup>*</sup></p>
                    <input className='pb-1 w-[100%] placeholder:text-[#efe6e6e0] placeholder:text-lg'
                        required
                        type= {showConfirmPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                    />
                    <span className='absolute mt-1 text-[2rem] ml-[-2rem] ' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                    </span>
                </label>
            </div>
            <button className='h-[30%] w-[64%] text-lg cursor-pointer rounded-xl border-none bg-gradient-to-br from-[#F7F7F7] to-[#A5A5A5] ml-[17%] text-[#303030] font-semibold mt-3  ' >
                Create Account
            </button>
        </form>

    </div>
  )
}

export default SignUpForm;