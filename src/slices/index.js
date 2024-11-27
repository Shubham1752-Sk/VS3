import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import CategorySlice from "./CategorySlice";
import ProductSlice from "./ProductSlice"
import CartSlics from "./CartSlics";
import ProfileSlice from "./ProfileSlice";

const rootReducer=combineReducers({
    auth:AuthSlice,
    category:CategorySlice,
    product:ProductSlice,
    cart:CartSlics,
    profile:ProfileSlice,
})

export default rootReducer