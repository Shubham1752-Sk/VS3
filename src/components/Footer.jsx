export default function Footer(){
    return (
        <div >
            <div className=" w-[100vw] mx-auto ">
                <div className="absolute footer-banner w-full h-[50vh] flex flex-wrap flex-col gap-4 justify-around items-center text-center ">
                    <div  className=" mt-6 text-xl font-medium text-[#1a4384] ">Join Our Courses</div>
                    <div>
                        <p className=" text-white font-bold text-7xl ">Ready to start learning? Enroll now!</p>
                    </div>
                    <div>
                        <button className=" hover-button w-[100px] bg-[#4b80fa] text-white cursor-pointer rounded-lg h-[40px] " >
                            Courses
                        </button>
                    </div>
                </div>
                <div className=" mt-[50%] w-full h-[50vh] flex gap-4  ">
                    <div className=" w-4/12 h-full bg-black text-white">
                        hola
                    </div>
                    <div className=" w-4/12 h-full bg-black text-white ">
                        hey
                    </div>
                </div>
            </div>
        </div>
    )
}