import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import heroImage from '../../assets/images/heroImage.jpg'
import axios from 'axios'

const BookingDetails = () => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const BASE_URL = import.meta.env.VITE_SERVEROTP;
 

  const isOnBookingForm = location.pathname.includes('/BookingForm')

  useEffect(() => {
    const otpToken = localStorage.getItem('GenerationofOtpTOken')
    if (!otpToken) {
      toast.error('Please verify your email address')
      navigate('/EnterEmail')
    }
  }, [navigate])

  const handleVerify = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/verify/verifyOtp`, { otp }, { withCredentials: true })

      if (res.status === 201) {
        toast.success("OTP verified")
      navigate("/EnterEmail/BookingDetails/BookingForm")

      }
    } catch (error) {
      toast.error("Wrong OTP")
    }
  }

  const handleResendOtp = () => {
    toast("Resend OTP clicked") // Hook this to resend OTP endpoint if you have one
  }

  return (
    <div>
      <Toaster />
      {!isOnBookingForm ? (
        <div className="absolute top-[12%] left-[37%] z-20 flex justify-center items-center px-4">
          <div className="w-full max-w-sm md:max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl text-white p-5 sm:p-7">
            <a href="#" className='flex flex-row items-center justify-center'>
              <img
                className="rounded-xl shadow-md mb-5 h-[300px]"
                src={heroImage}
                alt="Verification Banner"
              />
            </a>

            <h2 className="text-2xl font-semibold mb-1 text-center">Verify Your Email</h2>
            <p className="text-sm text-gray-300 mb-4 text-center">
              Type the OTP below which is sent to your email
            </p>

            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full h-[45px] px-4 text-sm text-gray-900 bg-white rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4 opacity-80"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              type="button"
              className="w-full py-2 bg-gradient-to-r from-orange-600 to-green-500 hover:from-orange-400 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={handleVerify}
            >
              Verify OTP
            </button>

            <button
              type="button"
              className="w-1/3 mt-[20px] h-[2rem] py-1 bg-gradient-to-r from-orange-600 to-green-500 hover:from-orange-400 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>

            <p className="text-xs mt-4 text-center text-gray-300">
              We'll never share your email with anyone else.
            </p>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  )
}

export default BookingDetails
