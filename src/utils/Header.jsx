import React from 'react';
import Logo from '../assets/icons/Logo.png';

const Header = () => {
  return (
    <header className='hidden md:flex md:justify-between md:items-center md:absolute md:top-0 md:left-0 md:w-full md:z-50  md:bg-opacity-100  md:px-8 md:py-4'>
      
      {/* Logo */}
      <div className="imgname">  
        <img src={Logo} alt="LogoOfHeritageWalk" className='w-[190.21px] h-[82px] object-cover' />
      </div>

      <div className="sections md:flex md:gap-8 md:justify-center">
        <div className='HomeSection text-white hover:text-gray-900 cursor-pointer '> Home </div>
        <div className='HomeSection text-white hover:text-gray-900 cursor-pointer '> Destination </div>
        <div className='HomeSection text-white hover:text-gray-900 cursor-pointer '> Experiences </div>
        <div className='HomeSection text-white hover:text-gray-900 cursor-pointer '> Plan your Trip </div>
      </div>

      <div>
        <h1 className="logo text-4xl cursor-pointer text-white hover:text-gray-900  relative right-[30px]">⌘</h1>
      </div>

    </header>
  );
};

export default Header;