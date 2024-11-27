import Cart from './pages/Cart';
import { useEffect, useState } from 'react';
import { Link, Route , Routes } from "react-router-dom"
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Facilities from "./pages/Facilities.js"
import About from "./pages/About"
import Verify_email from './components/VerifyEmail';
import AddCategory from './admin/AddCategory';
import ContactUs from './components/ContactUs';
import CategoryActions from './admin/CategoryActions';
import AddProduct from './admin/AddProduct';
import Profile from "./pages/Profile";
import Recepies from "./pages/Recepies";
import ForgotPassword from './components/ForgotPasswordEmail';
import UpdatePassword from './pages/UpdatePassword';
import ShoppingPage from './pages/ShoppingPage';
import Excercise from './pages/Excercises';
import SearchPage from './pages/SearchPage';
import ExerciseDetail from './components/ExcerciseComponents/pages/ExerciseDetail';
import { ViewProducts, fetchAllCategories } from './services/Auth';
import { useDispatch } from 'react-redux';
import SingleProductPage from './pages/SingleProductPage';
import BmiPage from './components/BmiPage';
import AdminPanel from './admin/AdminPanel';

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    fetchAllCategories(dispatch);
    ViewProducts(dispatch)
  })  
  
  return (
      <div className='flex flex-col items-center justify-center'>
      <Routes>
        {/* <Route index element = {<HomePage/>} /> */}
        <Route path = "/" element={<HomePage/>}/>
        <Route path = "/login" element={<LoginForm />} />
        <Route path = "/signup" element={<SignUpForm />} />
        <Route path = "/facilities" element={<Facilities/>}/>
        <Route path = "/about" element={<About/>}/>
        <Route path="/update-password/:id" element={<UpdatePassword/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path = "/verifyEmail" element={<Verify_email/>} />
        <Route path = "/addCategory" element={<AddCategory/>}/>
        <Route path = "/ContactUs" element={<ContactUs/>}/>
        <Route path = "/addProduct/" element={<AddProduct/>}/>
        <Route path = "/viewCategories" element={<CategoryActions/>}/>
        <Route path = "/editCategory/:id/" element={<AddCategory/>}/>
        <Route path = "/account" element={<Profile/>}/>
        <Route path = "/recepies" element={<Recepies/>}/>
        <Route path = "/shop" element={<ShoppingPage/>} />
        <Route path = "/excercise" element={<Excercise/>} />
        <Route path ="/exercise/:id" element={<ExerciseDetail/>} />
        <Route path='/search/:str' element={<SearchPage/>}/>
        <Route path='/product_search/:id' element={<SingleProductPage/>}/>
        <Route path='/viewCart' element={<Cart/>}/>
        {/* <Route path='/admin/dashboard' element={<Dashboard/>}/> */}
        <Route path='/user/updatePassword' element={<UpdatePassword/>} />
        <Route path = '/admin' element={<AdminPanel/>}/>
        <Route path = '/bmi' element={<BmiPage/>}/>
        <Route path = "*" element= {<div> Page NotFound</div>}/>
      </Routes>

      {/* <WhyUs className=" h-full w-full flex flex-col justify-center items-center "  /> */}
    </div>
  );
}

export default App;
