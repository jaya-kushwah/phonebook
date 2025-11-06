import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import AboutUs from './Components/AboutUs';
import Contact from './Components/Contact';
import Image from './Components/Image';
import Dashbord from './Components/Dashbord';
import Add from './Components/Add';
import Show from './Components/Show';
import EditContact from './Components/EditContact';
import AddGroup from './Components/AddGroup';
import ForgotPassword from './Components/ForgetPassword';
import ResetPassword from './Components/ResetPassword';
import OTPVerify from './Components/OTPVerify';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Image />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/signup' element={<SignUp />}></Route>
                    <Route path='/forgot_password' element={<ForgotPassword></ForgotPassword>}></Route>
                    <Route path='/reset_password' element={<ResetPassword></ResetPassword>}></Route>
                    <Route path='/otp_verify' element={<OTPVerify></OTPVerify>}></Route>
                    <Route path='/about' element={<AboutUs></AboutUs>}></Route>
                    <Route path='/contact' element={<Contact />}></Route>
                    <Route path='/dashbord' element={<Dashbord />}></Route>
                    <Route path='/add' element={<Add />}></Route>
                    <Route path='/show' element={<Show />}></Route>
                    <Route path='/group' element={<AddGroup />}></Route>
                    <Route path='/edit/:id' element={<EditContact />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
