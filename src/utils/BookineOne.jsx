import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import heroImageL from "../assets/images/heroImageL.jpg"
import heroImage from "../assets/images/heroImage.jpg"
import { useState } from 'react';
import axios from 'axios';

const BookingOne = () => {
  const BASE_URL = import.meta.env.VITE_SERVEROTP;
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  async function handleClick() {
    // Clear previous errors
    setError("");
    
    // Validate email before sending request
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await axios.post(`https://royanheritage.onrender.com/api/v1/verify/generateOtp`, { email: email.trim() }, { withCredentials: true });
      console.log(res);
      
      localStorage.setItem("GenerationofOtpTOken", res.data.data);

      if (res.data.statusCode == 201) {
        navigate("/EnterEmail/BookingDetails");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("API Error:", err);
      
      // Handle different error scenarios
      if (err.response) {
        // Server responded with error status
        const statusCode = err.response.status;
        const message = err.response.data?.message || "An error occurred";
        
        switch (statusCode) {
          case 400:
            setError("Invalid email address");
            break;
          case 429:
            setError("Too many requests. Please wait before trying again.");
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError(message);
        }
      } else if (err.request) {
        // Network error
        setError("Network error. Please check your connection.");
      } else {
        // Other error
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  // Checking if we're on the child route
  const isOnBookingDetails = location.pathname.includes('/BookingDetails');

  return (
    <div className="bgImageforVerificationOfEmailId relative w-full min-h-screen pt-[80px] sm:pt-[100px]">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroImageL})` }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      {/* Conditionally render based on route */}
      {!isOnBookingDetails ? (
        // Default view: Email form (only show when not on BookingDetails route)
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
              Enter your email below to receive an OTP and verify your identity.
            </p>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className={`w-full h-[40px] sm:h-[45px] px-3 sm:px-4 text-sm text-gray-900 bg-white rounded-lg shadow-sm border transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent opacity-80 disabled:opacity-50 disabled:cursor-not-allowed ${
                  error 
                    ? 'border-red-400 focus:ring-red-500' 
                    : email && isValidEmail(email)
                    ? 'border-green-400 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              
              {/* Error message */}
              {error && (
                <p className="text-red-400 text-xs mt-2 text-center bg-red-100/10 backdrop-blur-sm rounded px-2 py-1">
                  {error}
                </p>
              )}
              
              {/* Success indicator */}
              {email && isValidEmail(email) && !error && (
                <p className="text-green-400 text-xs mt-2 text-center">
                  ✓ Valid email format
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleClick}
              disabled={isLoading || !email || !isValidEmail(email)}
              className={`w-full py-2 sm:py-3 font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base ${
                isLoading || !email || !isValidEmail(email)
                  ? 'bg-gray-500 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-orange-600 to-green-500 hover:from-orange-400 hover:to-green-600 text-white'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending OTP...
                </div>
              ) : (
                'Get OTP'
              )}
            </button>

            <p className="text-xs mt-3 sm:mt-4 text-center text-gray-300">
              We'll never share your email with anyone else.
            </p>
            
            {/* Email format hint */}
            <p className="text-xs mt-2 text-center text-gray-400">
              Please enter a valid email (e.g., user@example.com)
            </p>
          </div>
        </div>
      ) : (
        // Render child routes (BookingDetails) when on that route
        <div className="relative z-20 w-full h-full">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default BookingOne;