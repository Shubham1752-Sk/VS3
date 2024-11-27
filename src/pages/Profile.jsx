import Navbar from "../components/Navbar";
import Account from "../components/Account";


export default function Profile(){
    return(
        <div className="profile-page bg-fixed w-full h-[100vh] ">

            <div className=" w-[100vw] flex flex-col justify-center items-center  ">

                <Navbar/>

                <Account   />

            </div>

        </div>
    )
}