

export default function RandomMealInfo({meal}){
    return(
        <div className=" h-[65vh] w-[70vw] flex border-1 rounded-xl border-black bg-[#4482e4d8] p-1 gap-2">
        {/* in the meal info cont */}
            <div className=" w-[50%] h-full bg-white p-2 rounded-lg ">
                <img className="w-full h-full rounded-md " src={meal.image} />
            </div>
            <div className=" w-[45%] h-full flex flex-col  ">
                <div className=" w-full  ">
                    <p className=" w-full text-center text-4xl font-semibold text-white ">{meal.name}</p>
                </div>
                <div className=" w-full h-[60%] mt-2 ">
                    <p className=" mx-auto w-[80%] h-full text-lg text-white leading-7 tracking-wide ">{`${meal.description.toString().substring(0,200)}...`}</p>
                </div>
                <div className=" w-full h-[10%] mx-auto my-auto bg-white text-[#4881dc] rounded-xl border-[5px]  border-[#4881dc] ">
                    <button className=" w-full font-semibold text-lg " >
                        More Info
                    </button>
                </div>
            </div>
            
        </div>
    )
}