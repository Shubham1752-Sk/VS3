import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allCustomers:[],
    EditCustomer : null,
}

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setAllCustomers( state , value ){
            state.allCustomers = value.payload
            console.log('All customer data being set :- ',state.allCustomers)
        }
    }
}) 

export const { setAllCustomers } = profileSlice.actions;
export default profileSlice.reducer ;