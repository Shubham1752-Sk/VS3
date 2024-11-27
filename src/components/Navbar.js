import React, { useCallback, useContext, useState } from "react";
import logimg from "../components/ASSETS/IMAGES/resources/logo-dark.png"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../services/Auth";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth)
    const dispatch=useDispatch()
    return (
        <div>
            <div className="navbar relative flex flex-wrap w-[100vw] bg-#FFF py-2 items-center justify-around mx-auto space-x-10 bg-white ">
                <img src={logimg} className="cursor-pointer w-[65px] h-[60px] " height={30} width={30} />
                <ul className="nav-links flex space-x-8 text-[#05498d] " >

                    <li className=" text-[#05498d] ">
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/facilities">Facilities</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/reviews">Reviews</Link>
                    </li>
                    <li>
                        <Link to="/ContactUs">Contact</Link>
                    </li>
                </ul>
                <div className='flex ml-5 mr-3 gap-3'>
                    {token == null &&
                        <>
                            <Link to="/login">
                                <button className="hover-button w-[100px] bg-[#4b80fa] text-white cursor-pointer rounded-lg h-[40px] ">
                                    Login
                                </button>
                            </Link>

                            <Link to="/signup">
                                <button className="hover-button w-[100px] bg-[#4b80fa] text-white cursor-pointer rounded-lg h-[40px] ">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    }
                    {token != null &&
                        <>
                            <Link to="/">
                                <button className="signInBtn w-[100px] bg-[#4b80fa] text-white cursor-pointer rounded-lg h-[40px] " onClick={() => {
                                    LogOut(dispatch)
                                }}>
                                    Log Out
                                </button>
                            </Link>

                            <Link to="/">
                                <button className="signInBtn w-[100px] bg-[#4b80fa] text-white cursor-pointer rounded-lg h-[40px] ">
                                    Dashboard
                                </button>
                            </Link>
                        </>
                    }
                </div>
                {/* <button onClick={signInHandler} className="signInBtn w-[100px] bg-[#4b80fa] text-white cursor-pointer rounded-lg h-[40px] ">
                    {

                    }
                </button>
                <button onClick={signUpHandler} className="signInBtn w-[100px] bg-[#4b80fa] text-white cursor-pointer rounded-lg h-[40px] "> {signUp} </button> */}

            </div>
        </div>
    )
}

export default Navbar;