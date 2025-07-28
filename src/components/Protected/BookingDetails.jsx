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
      const res = await axios.post(`https://royanheritage.onrender.com/api/v1/verify/verifyOtp`, { otp }, { withCredentials: true })

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
      <div className="relative z-20 flex justify-center items-start px-4 py-8 min-h-[calc(100vh-160px)]">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl text-white p-4 sm:p-6 lg:p-7 mt-4 sm:mt-8 lg:mt-12">
          <a href="#" className='flex flex-row items-center justify-center'>
            <img
              className="rounded-xl shadow-md mb-4 sm:mb-5 w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover"
              src={heroImage}
              alt="Verification Banner"
            />
          </a>

          <h2 className="text-xl sm:text-2xl font-semibold mb-1 text-center">Verify Your Email</h2>
          <p className="text-xs sm:text-sm text-gray-300 mb-4 text-center px-2">
            Type the OTP below which is sent to your email
          </p>

          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full h-[40px] sm:h-[45px] px-3 sm:px-4 text-sm text-gray-900 bg-white rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4 opacity-80"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            type="button"
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-orange-600 to-green-500 hover:from-orange-400 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
            onClick={handleVerify}
          >
            Verify OTP
          </button>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="w-full sm:w-1/3 relative right-[150px] px-4 sm:px-6 py-2 bg-gradient-to-r from-orange-600 to-green-500 hover:from-orange-400 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-xs sm:text-sm "
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>
          </div>

          <p className="text-xs mt-3 sm:mt-4 text-center text-gray-300">
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
