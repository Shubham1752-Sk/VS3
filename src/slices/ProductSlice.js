import { createSlice } from "@reduxjs/toolkit";

const initialState={
    categoryItems:[],
    allItems:[],
}

const ProductSlice = createSlice({
    name:"product",
    initialState:initialState,
    reducers:{
        setAllProducts(state , value){
            state.categoryItems = value.payload;
        },
        setItems(state,value){
            state.allItems=value.payload
        },
        deleteItem( state , value ){
            let newItems = [];
            newItems = state.allItems.filter(item=>
                item._id !== value.payload
            )
            state.allItems = newItems ; 
        }
    }
})

export const {setAllProducts,deleteItem,setItems}=ProductSlice.actions
export default ProductSlice.reducer