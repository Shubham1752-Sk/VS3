

export default function CategoryDropDown({ setAddCategory , setCategoryActions ,setAddProduct , setMenuSelected }){

    const func1=()=>{
        setCategoryActions(false);
        setAddProduct(false);
        setMenuSelected(true);
        setAddCategory((prev) => !prev)
    }

    const func2=()=>{
        setAddProduct(false);
        setAddCategory(false);
        setMenuSelected(true);
        setCategoryActions((prev)=> !prev)
    }

    return(
        <div className="dropdown absolute flex flex-col w-[19%] mt-16 bg-[#072b63] text-[#88aae2] items-start justify-center rounded-lg">

            <div className=" w-full h-[8%] ">
                <p className="p-1 leading-[3rem] hover:text-white hover:bg-[#415067] hover:px-8  transition-all duration-[0.5s] " onClick={func1} >ADD CATEGORY</p>
            </div>

            <div className=" w-full h-[8%] ">
                <p className="p-1 leading-[3rem] hover:text-white hover:bg-[#415067] hover:px-8  transition-all duration-[0.5s] " onClick={func2} >VIEW CATEGORIES</p>
            </div>

        </div>
    )
}