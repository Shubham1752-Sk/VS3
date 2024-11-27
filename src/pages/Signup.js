import React from 'react'
import Template from '../components/Template';


const Signup = ({logIn,setLogin}) => {

    return (
        <div className='login-signup'>
            <Template
                title = "LOGIN"
                setLogin={setLogin}
                logInr={logIn}
                formType='signup'
            />
        </div>
    )
   
}

export default Signup;