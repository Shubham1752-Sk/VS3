import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allCategories:[],
}

const categorySlice=createSlice({
    name:"category",
    initialState:initialState,
    reducers:{
        setAllCategories(state,value){
            state.allCategories=value.payload
        },
        removeCategory(state,value){
            let arr=[]
            arr=state.allCategories.filter((category)=>category._id!==value.payload)
            state.allCategories=arr;
        },
        updateEditCategory(state,value){
            let arr=state.allCategories;
            for(let x of arr){
                if(x._id.toString()===value.payload[0]){
                    x.categoryName=value.payload[1];
                }
            }
            state.allCategories=arr;
        },
    }
});

export const {setAllCategories,removeCategory,updateEditCategory}=categorySlice.actions;
export default categorySlice.reducer