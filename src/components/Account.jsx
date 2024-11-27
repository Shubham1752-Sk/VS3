import {FaUserAlt} from "react-icons/fa"
import {NavLink, useNavigate} from "react-router-dom"

export default function Account(){

    const navigate = useNavigate();
    return(
        <div className=" w-full h-full overflow-hidden">
            <div className=" w-full h-[100vh] flex flex-col  bg-white mt-[30%] space-y-6  items-center ">

                <div className=" w-full h-full rounded-full flex items-center flex-wrap " >

                    {/* Side Menu Code */}
                    <div className="rounded-r-[4rem] w-[20%] h-[100vh] flex flex-col items-center gap-[2rem] bg-[#4881dc] text-white  ">

                        <h1 className=" text-[2rem] font-bold leading-[5.5rem] tracking-wide ">MENU</h1>

                        <div className=" w-full h-[70%] pl-2 flex flex-col items-start gap-4 justify-center text-lg cursor-pointer ">
                            
                                <div className=" w-full h-[10%]  ">
                                    <p onClick={ () => navigate("/") } className="p-1 leading-[3rem] hover:text-[#4881dc] hover:bg-white hover:px-8 transition-all duration-[0.5s] " >HOME</p>
                                </div>

                                <div className=" w-full h-[10%] ">
                                    <p onClick={ () => navigate("/recepies") } className="p-1 leading-[3rem] hover:text-[#4881dc] hover:bg-white hover:px-8 transition-all duration-[0.5s] " >RECEPIES</p>
                                </div>
                                <div className=" w-full h-[10%] ">
                                    <p className="p-1 leading-[3rem] hover:text-[#4881dc] hover:bg-white hover:px-8 transition-all duration-[0.5s] " >COURSES</p>
                                </div>
                                <div className=" w-full h-[10%] ">
                                    <p className="p-1 leading-[3rem] hover:text-[#4881dc] hover:bg-white hover:px-8 transition-all duration-[0.5s] " >EDIT PROFILE</p>
                                </div>
                                <div className=" w-full h-[10%] ">
                                    <p className="p-1 leading-[3rem] hover:text-[#4881dc] hover:bg-white hover:px-8 transition-all duration-[0.5s] " >LOGOUT</p>
                                </div>
            
                        </div>

                    </div>

                    {/* Details Form */}
                    <div className=" w-[65%] h-[90%] border-[1px] border-[#4881dc] flex flex-col items-center justify-center mx-auto rounded-xl gap-4 " >
                        <div className="  w-full h-[22%] rounded-full mt-[-2rem]">
                            <FaUserAlt  className=" w-[15%] h-full  p-2  rounded-full border-[2px] mx-auto border-[#368bdcd9] text-[#368bdcd9] bg-white  "/>
                        </div>

                        <div className="  w-11/12 h-6/12 p-3 flex justify-around rounded-lg border-[1px] border-[#4881dc]">
                                <div className=" w-6/12 space-y-4 justify-baseline ">
                                    <div className=" flex flex-col gap-1 px-2 ">
                                        <h1 className=" text-lg " >Name Here</h1>
                                        <div className="w-11/12 h-[0.025rem] bg-[#4881dc]  "></div>
                                    </div>
                                    <div className=" flex flex-col gap-1 px-2 ">
                                        <h1 className=" text-lg " >Name Here</h1>
                                        <div className="w-11/12 h-[0.025rem] bg-[#4881dc]  "></div>
                                    </div>
                                    <div className=" flex flex-col gap-1 px-2 ">
                                        <h1 className=" text-lg " >Name Here</h1>
                                        <div className="w-11/12 h-[0.025rem] bg-[#4881dc]  "></div>
                                    </div>
                                </div>
                                <div className=" w-6/12 space-y-4 justify-baseline  ">
                                    <div className=" flex flex-col gap-1 px-2 ">
                                        <h1 className=" text-lg " >Name Here</h1>
                                        <div className="w-11/12 h-[0.025rem] bg-[#4881dc]  "></div>
                                    </div>
                                    <div className=" flex flex-col gap-1 px-2 ">
                                        <h1 className=" text-lg " >Name Here</h1>
                                        <div className="w-11/12 h-[0.025rem] bg-[#4881dc]  "></div>
                                    </div>
                                    <div className=" flex flex-col gap-1 px-2 ">
                                        <h1 className=" text-lg " >Name Here</h1>
                                        <div className="w-11/12 h-[0.025rem] bg-[#4881dc]  "></div>
                                    </div>
                                </div>
                            </div>

                            <div className=" w-10/12 " >
                                <p className=" text-sm ">From your account dashboard you can view your recent <span className="text-[#4881dc]" >orders</span>, manage your billing address, and edit your <span className=" text-[#4881dc] "> Password</span> and <span className=" text-[#4881dc] ">Account details.</span> </p>
                            </div>
                    </div>
                </div>

                <div>
                    <div className=" footer-banner ">

                    </div>
                </div>
            </div>
        </div>
    )
}

