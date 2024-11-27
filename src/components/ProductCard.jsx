
import {MdDiscount} from "react-icons/md";

export default function ProductCard({ product , key,price }){
    return(
        <div className=" w-[250px] h-[50vh] bg-transparent hover:bg-[#e0dde1b1] hover:scale-[1.05] transition-all duration-[120] flex flex-col  gap-2 ">
            <div>
                <img src={product.image} className=" w-[95%] h-[15rem] mx-auto " />
            </div>
            <div className=" w-full mt-1 p-1 ">
                <p className=" text-lg font-semibold mt-1 tracking-wide text-[#3368cbe2] " >{product.title.toString().substring(0,25)}...</p>
            </div>

            {
                (price.discounted==="true") ? 
                (
                    <div className="flex gap-2 items-center p-1">
                        <MdDiscount className="text-2xl text-[#fa3737]"/> <span className="  ">Awail this Product at {price.current_price} only</span>
                    </div>
                ) :
                (
                    <div>{price.current_price}</div>
                )
            }
        </div>

    )
}