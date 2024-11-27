

export default function ProductDropDown({setAddProduct , setAddCategory , setCategoryActions , setMenuSelected , setProductView }){
    const func= () =>{
        setAddCategory(false);
        setCategoryActions(false);
        setMenuSelected(true);
        setAddProduct((prev) => !prev);
    }

    const func2= () =>{
        setAddCategory(false);
        setCategoryActions(false);
        setMenuSelected(true);
        setProductView((prev) => !prev);
    }

    return(
        <div className="dropdown absolute flex flex-col w-[19%] mt-16 bg-[#072b63] text-[#88aae2] items-start justify-center rounded-lg ">

            <div className=" w-full h-[8%] ">
                <p className="p-1 leading-[3rem] hover:text-white hover:bg-[#415067] hover:px-8  transition-all duration-[0.5s] " onClick={func} >ADD PRODUCTS</p>
            </div>

            <div className=" w-full h-[8%] ">
                <p className="p-1 leading-[3rem] hover:text-white hover:bg-[#415067] hover:px-8  transition-all duration-[0.5s] " onClick={func2} >VIEW PRODUCTS</p>
            </div>

            <div className=" w-full h-[8%] ">
                <p className="p-1 leading-[3rem] hover:text-white hover:bg-[#415067] hover:px-8  transition-all duration-[0.5s] " >REMOVE PRODUCTS</p>
            </div>

        </div>
    )
}