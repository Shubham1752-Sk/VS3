import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ViewCartItems, StartPayment, removeItemFromCart, updateQuantity } from '../services/Auth';
import ShopNavbar from '../components/ShopNavbar';
import { removeItemsFromCart, ChangeQuantity } from '../slices/CartSlics';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { endpoints } from '../services/api';
import Paypalbuttons from "./PaymentForm"

export default function Cart() {
  const dispatch = useDispatch();
  const { allCartItems } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const [clientToken,setClientToken]=useState("")
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    ViewCartItems(dispatch, token)
  }, [])
  
  const { totalAmount } = useSelector((state) => state.cart);
  const getClientToken=async()=>{
    try{
      const response=await apiConnector("POST",endpoints.GENERATE_PAYPAL_CLIENT_TOKEN,null,{
        Authorization: `Bearer ${token}`,
      })
      console.log(response);
      const client_token = await response.json();
      setClientToken(client_token);
    }
    catch(err){
      toast.error(err);
      console.log(err);
    }
  }
  useEffect(()=>{
    getClientToken();
  },[])
  
  return (
    <>
      <ShopNavbar />
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className=" mb-[2.34em] flex justify-center items-center text-2xl font-inter font-semibold text-richblack-900">
              Shopping Cart
            </h1>
            <div className="flow-root">

              <ul className="-my-6 divide-y divide-gray-200">
                {
                  allCartItems.length > 0 ? (
                    allCartItems.map((item) => (
                      <li key={item._id} className="flex py-6">
                        <div className="h-[25vh] w-[15vw] flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            className="h-[100%] w-[100%] "
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a className='font-inter text-xl font-medium '>{item.title.toString()}</a>
                              </h3>
                              <p className="ml-4 text-xl font-inter font-medium">${item.price}</p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className=" text-richblack-900 font-medium mr-[0.67em] text-xl"
                              >
                                Quantity
                              </label>
                              <select
                                className='text-xl font-medium'
                                value={item.quantity}
                                onChange={(e) => {
                                  updateQuantity(dispatch, item._id, e.target.value, token);
                                  dispatch(ChangeQuantity([item._id, e.target.value]))
                                }}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) => {
                                  removeItemFromCart(dispatch, item._id, token);
                                  dispatch(removeItemsFromCart(item._id))
                                }}
                                type="button"
                                className=" text-xl font-medium font-inter"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div>Loading</div>
                  )
                }
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p className=' text-xl font-inter font-semibold'>Subtotal</p>
              <p className=' text-xl font-inter font-semibold'>$ {totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p className='font-inter text-xl font-semibold'>Total Items in Cart</p>
              <p className='font-inter text-xl font-semibold'>{allCartItems.length} items</p>
            </div>
            <p className="mt-0.5 font-inter text-gray-500 text-xl">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                onClick={(e) => StartPayment(dispatch, token, allCartItems)}
                className=" bg-richblue-2 text-xl items-center text-white justify-center font-inter flex font-semibold h-[35px] w-[2200px] rounded-md "
              >
                Proceed To Stripe Checkout
              </Link>
            </div>
            <div className='flex flex-col justify-center items-center h-[9%] w-[100%] mt-[1.07em]'>
              <Paypalbuttons/>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                <button
                  type="button"
                  className="font-medium text-indigo-600 text-xl "
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}