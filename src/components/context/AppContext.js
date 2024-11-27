import { useState ,createContext } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"


export const AppContext = createContext();

export default function AppContextProvider({children}){
    const [ logIn , setLogIn ] = useState (false);
    const navigate = useNavigate();

    // const submitHandler = (event , formType) => {
    //     {
    //         formType === 'login' ?
    //     (
            
    //     ) :
    //     (
    //         console.log('Before Submission ');
    //     console.log(formData)
    //     event.preventDefault();
    //     if(formData.password != formData.confirmPassword) {
    //         toast.error("Passwords do not match");
    //         return ;
    //     }

    //     setLogIn(true);
    //     toast.success("Account Created");
    //     const accountData = {
    //         ...formData
    //     };
    //     console.log("printing account data ");
    //     console.log(accountData);

    //     navigate("/");

    //     )
    //     }
    // }


    const value ={
        logIn , setLogIn 
    };

    return <AppContext.Provider value={value} > {children}</AppContext.Provider>;
}



