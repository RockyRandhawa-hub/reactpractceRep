import React, { useState } from 'react';

import heroImageL from '../assets/images/heroImageL.jpg';
import heroImage from '../assets/images/heroImage.jpg'
import Logo from "../assets/icons/Logo.png"
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_SERVEROTP;


const BookingOne = () => {
  const [email,setemail] = useState("");
const navigate = useNavigate();
async function handleClick() {
  try {
const res= await axios.post(`${BASE_URL}GenerateOtp`, { email }, { withCredentials: true });
    console.log( res.data.data);

    localStorage.setItem("GenerationofOtpTOken" , res.data.data)

    
    
    // const allcookies = document.cookie;
    // console.log(allcookies);
    

    if(res.data.statusCode == 201){
navigate("/success")      
    }else{
      return (
        <>
        <h1 className='z-10 text-9xl'> hey this is not doen something went wrong</h1>
        </>
      )
    }
  } catch (err) {
    console.error("API Error:", err);
  }
}


  return (
    <div className="bgImageforVerificationOfEmailId relative w-full h-screen pt-[100px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroImageL})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      {/* Email Verification Card */}
    <div className="relative z-20 flex justify-center items-center px-4">
      <div className="w-full max-w-sm md:max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl text-white p-5 sm:p-7">
        
        {/* Image Banner */}
        <a href="#" className='flex flex-row items-center justify-center'>
          <img
            className="  rounded-xl shadow-md mb-5 h-[220px]"
            src={heroImage}
            alt="Verification Banner"
          />
        </a>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-1 text-center">Verify Your Email</h2>
        <p className="text-sm text-gray-300 mb-4 text-center">
          Enter your email below to receive an OTP and verify your identity.
        </p>

        {/* Input Field */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full h-[45px] px-4 text-sm text-gray-900 bg-white rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4 opacity-80"
        onChange={(e)=>setemail(e.target.value)}
        />

        {/* Button */}
        <button
          type="button"
          className="w-full py-2 bg-gradient-to-r from-orange-600 to-green-500 hover:from-orange-400 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          onClick={handleClick}
        >
          Get OTP
        </button>

        {/* Footer Text */}
        <p className="text-xs mt-4 text-center text-gray-300">
          We'll never share your email with anyone else.
        </p>
      </div>
    </div>

<Outlet />
    </div>
  );
};

export default BookingOne;
