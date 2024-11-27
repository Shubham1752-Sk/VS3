import { useState } from "react"
import logimg from "../components/ASSETS/IMAGES/resources/logo-dark.png"
import { AiOutlineSearch } from "react-icons/ai"
import { AiOutlineUser } from "react-icons/ai"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { AiOutlineSolution } from "react-icons/ai"
import { IoIosAirplane } from "react-icons/io"
import { MdEmail } from "react-icons/md"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { ViewProducts } from "../services/Auth"

export default function ShopNavbar() {
    const dispatch=useDispatch()
    const [searchInput, setSearchInput] = useState("");
    const [selectedItem, setSelectedItem] = useState(-1);
    const { token } = useSelector((state) => state.auth)
    const { allItems } = useSelector((state) => state.product)
    const [suggesstion, setSuggestionsInfo] = useState([])
    const ChangeHandler = (e) => {
        setSearchInput(e.target.value);
        setSuggestionsInfo(allItems.filter(product => product.title.includes(searchInput)))
        console.log(searchInput)
    }
    const handleKeyDown = (e) => {
        console.log(e.key);
        console.log(selectedItem)
        console.log(searchInput)
        if (e.key === "ArrowUp" && selectedItem > 0) {
            setSelectedItem(prev => prev - 1);
        }
        else if (e.key === "ArrowDown" && selectedItem < allItems.length - 1) {
            setSelectedItem(prev => prev + 1);
        }
        else if (e.key === "Enter") {
            if (selectedItem >= 0) {
                setSearchInput(suggesstion[selectedItem].title);
                window.open(`/product_search/${suggesstion[selectedItem]._id}`)
            }
            window.open(`/search/${searchInput}`)
            setSearchInput("")
        }
        else if (e.key === "BackSpace") {
            console.log(searchInput);
            setSearchInput(e.target.value)
            setSuggestionsInfo(allItems.filter(product => product.title.includes(searchInput)))
        }
    }
    return (
        <div>
            <div className=" navbar relative flex flex-wrap w-[100vw]  py-2 items-center justify-around mx-auto space-x-10 bg-white  ">
                <img src={logimg} className="cursor-pointer w-[65px] h-[60px] " height={30} width={30} />
                <div className="relative flex items-center justify-center w-[30vw] h-[6vh]  border-[1px] border-richblack-600 ">
                    <input
                        className=" w-[100%] h-full border-none bg-white"
                        value={searchInput}
                        onChange={(e) => ChangeHandler(e)}
                        type="text" name="searchFeild"
                        placeholder="Try Our Search"
                        onKeyDown={handleKeyDown}
                        autoComplete="off" />
                    <div className=" w-2/12 items-center  h-full ">
                        <AiOutlineSearch className=" text-xl text-[#3360b3a7] items-center mt-3  mx-auto " />
                    </div>
                </div>
                <div className=" flex flex-wrap gap-2 ">
                    {
                        token !== null && (
                            <>
                                <div className="flex items-center gap-1">
                                    <AiOutlineUser className="text-2xl text-[#3360b3a7]" /> <span className="text-[#544f4f] text-xl ">My Profile</span>
                                </div>
                            </>
                        )
                    }
                    <div className="flex items-center gap-1">
                    <Link to="/viewCart"><AiOutlineShoppingCart className="text-2xl text-[#3360b3a7] " /> <span className="text-[#544f4f] text-xl">ShoppingCart</span></Link>
                    </div>
                </div>
            </div>
            <div className=" fw-full items-center flex h-[7vh] bg-[#3360b3a7]">
                <ol className=" h-full flex items-center gap-5 text-white text-xl ml-6 cursor-pointer transition-all  ">
                    <li className="h-full p-3 hover:bg-white group hover:text-[#3360b3a7] duration-[0.5s] ">Nutrition</li>
                    <li className="h-full p-3 hover:bg-white group hover:text-[#3360b3a7] duration-[0.5s] ">Protein</li>
                    <li className="h-full p-3 hover:bg-white group hover:text-[#3360b3a7] duration-[0.5s] ">Gym Wear</li>
                    <li className="h-full p-3 hover:bg-white group hover:text-[#3360b3a7] duration-[0.5s] ">Machines/Dumbells</li>
                </ol>
            </div>
            <div className=" w-full flex items-center mx-auto h-[6vh] bg-[#cbcfd8]">
                <div className=" w-8/12 gap-6 flex mx-auto items-center text-[#544f4f] text-lg ">
                    <div className=" flex ">
                        <div>
                            <AiOutlineSolution className="text-3xl text-[#544f4f] " />
                        </div>
                        <div>
                            Indian Products Manufactured for Indian Customers
                        </div>
                    </div>
                    <div className=" flex ">
                        <div>
                            <IoIosAirplane className="text-3xl text-[#544f4f] " />
                        </div>
                        <div>
                            Fast and Safe Delivery
                        </div>
                    </div>
                    <div className=" flex ">
                        <div>
                            <MdEmail className="text-3xl text-[#544f4f] " />
                        </div>
                        <div>
                            SignUp to avail Offers
                        </div>
                    </div>
                </div>
            </div>
            {
                searchInput && (
                    <div className="absolute w-[30vw] h-[25vh] bg-white top-[9%] z-10 left-[29%] overflow-y-auto overflow-x-hidden border-2 border-richblack-900 rounded-md ">
                        {
                            suggesstion.map((suggest, index) => {
                                return (
                                    <>
                                        <NavLink to={`/product_search/${suggest._id}`} onKeyDown={() => {
                                        }} className={`text-richblack-900 font-inter overflow-y-auto ${selectedItem === index ? (" bg-richblack-200 w-full") : ("bg-white")}`}>{suggest.title.toString().substring(0, 25)}...</NavLink>
                                        <br></br>
                                    </>
                                );
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}