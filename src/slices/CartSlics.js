import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allCartItems:[],
    totalAmount:0,
    quantity:0,
}

const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setAllCartItems(state,value){
            state.allCartItems=value.payload
        },
        removeItemsFromCart(state,value){
            let arr=[]
            arr=state.allCartItems.filter(item=>item._id!==value.payload);
            state.allCartItems=arr
            state.totalAmount=state.allCartItems.reduce(
                (amount, item) => item.price * item.quantity + amount ,0)
        },
        setTotalAmount(state,value){
            state.totalAmount=value.payload
        },
        ChangeQuantity(state,value){
            let arr=state.allCartItems
            for(let x of arr){
                if(x._id.toString()===value.payload[0]){
                    x.quantity=value.payload[1]
                }
            }
            state.allCartItems=arr;
            state.totalAmount=state.allCartItems.reduce(
                (amount, item) => item.price * item.quantity + amount,0)
            state.totalAmount=parseInt(state.totalAmount)
        }
    }
})

export const {setAllCartItems,removeItemsFromCart,setTotalAmount,ChangeQuantity}=cartSlice.actions;
export default cartSlice.reducer