import { createSlice } from "@reduxjs/toolkit";

const initialState={
    signUpdata:localStorage.getItem("signUpdata"),
    loading:false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
}

const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignUpdata(state,value){
            state.signUpdata=value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setToken(state,value){
            state.token=value.payload
        }
    }
});

export const {setSignUpdata,setLoading,setToken}=authSlice.actions;
export default authSlice.reducer