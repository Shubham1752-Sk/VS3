import { endpoints } from "./api";
import { toast } from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { setLoading, setSignUpdata, setToken } from "../slices/AuthSlice";
import { setAllCategories } from "../slices/CategorySlice";
import { setAllProducts, setItems } from "../slices/ProductSlice";
import { setAllCartItems, setTotalAmount } from "../slices/CartSlics";
import { setAllCustomers } from "../slices/ProfileSlice";

export function sendOtp(email,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",endpoints.SEND_OTP,{email})
            console.log(response);
            if(response.data.succcess){
                console.log(response);
                toast.success("OTP SENT SUCCESSFULLY ");
                navigate("/verifyEmail")
            }
        }
        catch(err){
            toast.error("Could NOT SEND OTP");
            console.log(err);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function SignUp(firstName,email,lastName,password,cpassword,navigate,otp){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        console.log(firstName,email,lastName,password,cpassword,otp)
        try{
            const response=await apiConnector("POST",endpoints.SIGN_IN,{
                firstName,
                email,
                lastName,
                password,
                cpassword,
                otp,
            })
            console.log(response);
            if(response.data.success){
                toast.success("Sign Up Successfull")
                localStorage.setItem("signUpdata",{firstName,email,lastName,password,cpassword})
                navigate("/login");
            }
            else{
                throw new Error(response.data.message)
            }
        }
        catch(err){
            console.log(err);
            toast.error("Unable To Sign Up")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function Login_Info(email,password,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",endpoints.LOGIN_IN,{
                email,
                password
            })
            if(response.data.succcess){
                console.log(response);
                toast.success("Login Successfull")
                navigate("/");
            }
            localStorage.setItem("token", JSON.stringify(response.data.token))
            dispatch(setToken(response.data.token))
        }
        catch(err){
            console.log(err);
            toast.error("Unable To Login")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function AddCategorys(categoryName,navigate){
    console.log(categoryName)
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",endpoints.ADD_CATEGORY,{categoryName})
            if(response.data.succcess){
                console.log(response);
                toast.success("Category Added Successfully")
                navigate("/");
            }
        }
        catch(err){
            console.log(err);
            toast.error("Unable To Add Category")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const fetchAllCategories=async(dispatch)=>{
    // const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("GET",endpoints.VIEW_CATEGORY)
        console.log(response);
        if(response.data.succcess){
            dispatch(setAllCategories(response.data.allCategories))
        }
    }
    catch(err){
        console.log(err);
        toast.error("Unable To View Category")
    }
    dispatch(setLoading(false));
    // toast.dismiss(toastId);
}

export const deleteCategory=async(dispatch,id)=>{
    const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("DELETE",endpoints.DELETE_CATEGORY,{id})
        // console.log(response);
        if(response.data.succcess){
            toast.success("Category Deleted Sucessfully");
        }
    }
    catch(err){
        console.log(err);
        toast.error("Unable To delete Category")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
}

export const UpdateCategory=async(categoryName,id,dispatch)=>{
    const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("POST",endpoints.UPDATE_CATEGORY,{categoryName,id})
        console.log(response);
        if(response.data.succcess){
            toast.success("Catgory Updated Successfully");
        }
        else{
            throw new Error("Not Able To update Category");
        }
    }
    catch(err){
        console.log(err);
        toast.error("Unable To Update Category");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
}

export const AddProducts=async(dispatch,title,price,savings_price,stock,category,image)=>{
    const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("POST",endpoints.ADD_PRODUCT,{title,price,savings_price,stock,category,image})
        console.log(response);
        if(response.data.success){
            toast.success("Product Added Successfully");
        }
        else{
            throw new Error("Unable To Add Product");
        }
    }
    catch(err){
        console.log(err);
        toast.error("Unable To Add Product ");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
}

export const ViewProducts=async(dispatch)=>{
    // const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("GET",endpoints.VIEW_PRODUCT)
        if(response.data.succcess){
            dispatch(setAllProducts(response.data.AllProducts))
            dispatch(setItems(response.data.a))
        }
        else{
            throw new Error("Unable to fetch products")
        }
    }
    catch(err){
        console.log(err);
    }
    // toast.dismiss(toastId);
    dispatch(setLoading(false));
}

export const fetchProductsByCategory=async(dispatch,categoryName,setProducts)=>{
    console.log(categoryName);
    const toastId=toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("POST",endpoints.VIEW_PRODUCTS_BY_CATEGORY,{categoryName})
        console.log(response)
        if(response.data.success){
            setProducts(response.data.AllProducts)
        }
        else{
            throw new Error("Error Occured")
        }
    }
    catch(err){
        console.log(err);
        toast.error("Unable to fetch products from catgeory ")
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false))
}

export const getresetPasswordEmail=async(dispatch,email,navigate)=>{
    const toastId=toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("POST",endpoints.RESET_PASSWORD_TOKEN,{email});
        console.log(response);
        if(response.data.success){
            toast.success("Reset Email Sent");
        }
        else{
            throw new Error("Unable to send email")
        }
    }
    catch(err){
        console.log(err);
        toast.error("Unable to reset Email , try again in some time");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false))
}

export const resetPassword=async(dispatch,password, confirmPassword, token, navigate)=>{
    const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("POST",endpoints.RESET_PASSWORD,{password,confirmPassword,token})
        console.log(response);
        if(response.data.success){
            toast.success("Password Reset Successful");
            navigate("/login");
        }
        else{
            throw new Error("Unable To Reset Email");
        }
    }
    catch(err){
        console.log(err);
        toast.error(err);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
}

export const LogOut=(dispatch)=>{
    const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    localStorage.setItem("token",null);
    localStorage.setItem("signUpdata",null);
    dispatch(setToken(null));
    dispatch(setSignUpdata(null));
    toast.success("Logout SuccessFull")
    dispatch(setLoading(false));
    toast.dismiss(toastId)
}

export const SingleProductById=async(dispatch,id,setSignProduct,setPrice)=>{
    // const toastId=toast.loading("Loading...");
    dispatch(setLoading(true))    
    try{
        const response=await apiConnector("GET",endpoints.PRODUCT_BY_ID+`${id}`)
        console.log(response);
        if(response.data.succcess){
            setSignProduct(response.data.viewProduct)
            setPrice(response.data.viewProduct.price)
        }
        else{
            throw new Error("Unable to fetch the desired Product ");
        }
    }
    catch(err){
        console.log(err);
    }
    // toast.dismiss(toastId);
    dispatch(setLoading(false));
}

export const CreateRating=async(dispatch,productId,rating,review,token)=>{
    console.log(productId,rating,review,token)
    const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("POST",endpoints.CREATE_RATING,{productId,rating,review},{
            Authorization: `Bearer ${token}`,
        })        
        console.log(response)
        if(response.data.success){
            toast.success("Review Added Successfully")
        }
        else{
            throw new Error("Unable to submit review")
        }
    }
    catch(err){
        console.log(err);
        toast.error(err.message)
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
}

export const GetAllReviews=async(dispatch)=>{
    // const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("GET",endpoints.VIEW_ALL_RATING);
        console.log(response);
        if(response.data.success){
            
        }
        else{
            throw new Error("Unable To get Reviews")
        }
    }
    catch(err){
        console.log(err);
        toast.error(err.message);
    }
    // toast.dismiss(toastId);
    dispatch(setLoading(false));
}

export const AddToCart=async(dispatch,token,productId,quantity)=>{
    console.log(token,productId,quantity)
    const toastId=toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("POST",endpoints.ADD_TO_CART,{productId,quantity},
        {
            Authorization: `Bearer ${token}`,
        })
        console.log(response);
        if(response.data.success){
            toast.success("Item Is Added To Cart");
        }
        else{
            throw new Error("Unable To Add item To Cart ");
        }
    }
    catch(err){
        console.log(err);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
}

export const ViewCartItems=async(dispatch,token)=>{
    // const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("GET",endpoints.VIEW_CART,null,
        {
            Authorization: `Bearer ${token}`,
        })
        if(response.data.success){
            dispatch(setAllCartItems(response.data.AllResults));
            dispatch(setTotalAmount(response.data.amount))
        }
        else{
            throw new Error(response.data.message)
        }
    }
    catch(err){
        console.log(err);
        toast.error(err);
    }
    // toast.dismiss(toastId);
    dispatch(setLoading(false));
}

export const StartPayment=async(dispatch,token,CartItems)=>{
    const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("POST",endpoints.START_PAYMENT,CartItems,{
            Authorization: `Bearer ${token}`,
        })
        console.log(response)
        if(response.data.url){
            window.location.href=response.data.url
            console.log("Successfully")
            console.log(response)
        }
    }
    catch(err){
        console.log(err);
        toast.error(err);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false))
}

export const ChangeUserPassword=async(dispatch,oldPassword,newPassword,confirmNewPassword,token)=>{
    const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("POST",endpoints.UPDATE_PASSWORD,{
            oldPassword,newPassword,confirmNewPassword
        },{
            Authorization: `Bearer ${token}`,
        })
        console.log(response);
        if(response.data.success){
            toast.success("User Password Updated Successfully ");
        }
        else{
            throw new Error("Unable To Update User Password ");
        }
    }
    catch(err){
        console.log(err);
        toast.error(err);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false))
}

export const removeItemFromCart=async(dispatch,id,token)=>{
    const toastId=toast.loading("Loading..")
    dispatch(setLoading(false));
    try{
        const response=await apiConnector("DELETE",endpoints.REMOVE_ITEM_FROM_CART,{id},{
            Authorization: `Bearer ${token}`,
        })
        console.log(response);
        if(response.data.success){
            toast.success("Product Removed From Cart ");
        }
        else{
            console.log("Unable To remove product from Cart")
        }
    }
    catch(err){
        console.log(err);
        toast.error(err);
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId);
}

export const updateQuantity=async(dispatch,id,quantity,token)=>{
    // const toastId=toast.loading("Loading...");
    // dispatch(setLoading(true));
    try{
        const response=await apiConnector("POST",endpoints.UPDATE_QUANTITY,{id,quantity},{
            Authorization: `Bearer ${token}`,
        })
        
        if(response.data.success){
            // toast.success("Quantity updated successfully")
        }
        else{
            console.log("Unable to update quantity")
        }
    }
    catch(err){
        console.log(err);
        toast.error(err);
    }
    // toast.dismiss(toastId);
    // setLoading(false)
}

export const fetchAllCustomers=async(dispatch)=>{
    // const toastId=toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("GET",endpoints.VIEW_ALL_CUSTOMERS)
        console.log(response);
        if(response.data.success){
            dispatch(setAllCustomers(response.data.allresult))
            
        }
    }
    catch(err){
        console.log(err);
        toast.error("Unable To Fetch Customers")
    }
    dispatch(setLoading(false));
    // toast.dismiss(toastId);
}

export const DeleteProduct=async(dispatch,id)=>{
    // const toastId=toast.loading("Loading..");
    dispatch(setLoading(true));
    try{
        const response=await apiConnector("DELETE",endpoints.DELETE_PRODUCT,{id});
        console.log(response)
        if(response.data.succcess){
            toast.success("Product Deleted Successfully ");
        }
        else{
            throw new Error ("Unable To delete product from Database")
        }
    }
    catch(err){
        console.log(err);
    }
    dispatch(setLoading(false));
    // toast.dismiss(toastId)
}
