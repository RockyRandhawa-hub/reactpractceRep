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
      <div className="relative top-[80px] z-10 text-white px-8 pt-16 " style={{ fontFamily: "Kaushan" }} >
        <div className="flex flex-wrap justify-between ">
          {/* Logo & Description */}
          
          <div className="w-full md:w-1/3 mb-8 md:mb-0 relative left-[20px]">
            <img src={Logo} alt="Logo" className="w-[190px] h-[82px] object-cover mb-4" />
            <p>
              Experience the legacy. Join our guided heritage walk <br /> through historic  Army landmarks & stories untold.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4">QuickLinks</h2>
            <ul>
              {arr.map((item, index) => (
                <li key={index} className="hover:underline cursor-pointer mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Book Now */}
          <div className="w-full md:w-1/3 relative right-[40px]">
            <h2 className="text-3xl font-bold mb-2">BOOK NOW</h2>
            <p className="mb-4 text-justify">
              Entry is subject to valid ID verification and adherence to the <br /> dress code and visitor guidelines.
            </p>
            <button
              className="bg-green-600 text-white font-bold  rounded-full hover:bg-green-700 transition-colors"
              style={{ fontFamily: "Roboto"  }}
            >
              Pick Your Slot
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white my-8 opacity-40"></div>

        {/* Footer Bottom */}
        <h3 className="text-center font-semibold text-white">
          Terms of Use <span className="mx-2">|</span> Privacy Policy <span className="mx-2">|</span> Contact Us
        </h3>
      </div>
    </div>
  );
};

export default Footer;
