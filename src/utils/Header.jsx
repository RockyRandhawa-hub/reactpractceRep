import React, { useState } from 'react';
import Logo from '../assets/icons/Logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Destination', href: '#destination' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Plan your Trip', href: '#plan' }
  ];

  return (
    <header className='flex justify-between items-center absolute top-0 left-0 w-full z-50 bg-opacity-100 px-4 sm:px-6 lg:px-8 py-4'>
      
      {/* Logo */}
      <div className="imgname">  
        <img 
          src={Logo} 
          alt="LogoOfHeritageWalk" 
          className='w-[120px] h-[52px] sm:w-[150px] sm:h-[65px] lg:w-[190.21px] lg:h-[82px] object-cover' 
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex md:gap-8 md:justify-center">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className='text-white hover:text-gray-300 cursor-pointer transition-colors duration-200 font-medium'
          > 
            {item.name}
          </div>
        ))}
      </div>

      {/* Desktop Menu Icon */}
      <div className="hidden md:block">
        <h1 className="logo text-4xl cursor-pointer text-white hover:text-gray-300 transition-colors duration-200">
          ⌘
        </h1>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-white hover:text-gray-300 transition-colors duration-200 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            {/* Hamburger Icon */}
            <div className={`absolute top-1 left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 top-2.5' : ''
            }`}></div>
            <div className={`absolute top-2.5 left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}></div>
            <div className={`absolute top-4 left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 top-2.5' : ''
            }`}></div>
          </div>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-t border-white/20 transition-all duration-300 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <nav className="flex flex-col py-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-white hover:text-gray-300 hover:bg-white/10 px-6 py-3 transition-all duration-200 font-medium border-b border-white/10 last:border-b-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          
          {/* Mobile Menu Icon */}
          <div className="px-6 py-3 border-t border-white/20 mt-2">
            <h1 className="logo text-2xl cursor-pointer text-white hover:text-gray-300 transition-colors duration-200">
              ⌘ Menu Options
            </h1>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 -z-10"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;