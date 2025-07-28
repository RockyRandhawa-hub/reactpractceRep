import { Link } from "react-router-dom";
import Logo from "../assets/icons/Logo.png";
import FooterImg from "../assets/images/FooterImg.jpg";
import React from 'react';

const Footer = () => {
  const arr = ["Attractions", "Experiences", "Destination and Events", "FAQ'S", "BLog"];

  return (
    <div className="relative w-full min-h-[70vh]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${FooterImg})` }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>

      {/* Content */}
      <div className="relative top-[40px] sm:top-[60px] lg:top-[80px] z-10 text-white px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16" style={{ fontFamily: "Kaushan" }}>
        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-between">
          {/* Logo & Description */}
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0 text-center lg:text-left lg:relative lg:left-[20px]">
            <img src={Logo} alt="Logo" className="w-[150px] h-[65px] sm:w-[170px] sm:h-[73px] lg:w-[190px] lg:h-[82px] object-cover mb-4 mx-auto lg:mx-0" />
            <p className="text-sm sm:text-base">
              Experience the legacy. Join our guided heritage walk <br className="hidden lg:block" /> through historic Army landmarks & stories untold.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0 text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">QuickLinks</h2>
            <ul>
              {arr.map((item, index) => (
                <li key={index} className="hover:underline cursor-pointer mb-2 text-sm sm:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Book Now */}
          <div className="w-full lg:w-1/3 text-center lg:text-left lg:relative lg:right-[40px]">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">BOOK NOW</h2>
            <p className="mb-4 text-sm sm:text-base lg:text-justify">
              Entry is subject to valid ID verification and adherence to the <br className="hidden lg:block" /> dress code and visitor guidelines.
            </p>
            <Link to="/EnterEmail">
            <button
              className="bg-green-600 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 lg:px-6 lg:py-3 rounded-full hover:bg-green-700 transition-colors text-sm sm:text-base"
              style={{ fontFamily: "Roboto" }}
            >
              Pick Your Slot
            </button>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white my-6 sm:my-8 opacity-40"></div>

        {/* Footer Bottom */}
        <h3 className="text-center font-semibold text-white text-sm sm:text-base">
          <span className="inline-block">Terms of Use</span>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="inline-block">Privacy Policy</span>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="inline-block">Contact Us</span>
        </h3>
      </div>
    </div>
  );
};

export default Footer;