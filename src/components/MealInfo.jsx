

export default function MealInfo({meal}){

    // let desc = meal.description.substing(0,200);

    return(
        <div className=" h-[45vh] w-[35vw] flex border-1 rounded-xl border-black bg-[#4482e4d8] p-1 gap-2">
        in the meal info cont
            <div className=" w-[50%] h-full bg-white p-2 rounded-lg ">
                <img className="w-full h-full rounded-md " src={meal.image} />
            </div>
            <div className=" w-[45%] h-full flex flex-col  ">
                <div className=" w-full  ">
                    <p className=" w-full text-center text-2xl font-semibold text-white ">{meal.name}</p>
                </div>
                <div className=" w-full ">
                    <p className=" w-full ">{`${meal.description.toString().substring(0,150)}...`}</p>
                </div>
                <button className=" w-full font-semibold text-lg ">
                    More Info
                </button>
            </div>
            
        </div>
    )
}