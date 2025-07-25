import React from 'react';
import heroImage from '../assets/images/heroImage.jpg';
import heroImageL from '../assets/images/heroImageL.jpg';
import AdventureBackGround from '../assets/images/AdventureBackGround.jpg'
import Logo from '../assets/icons/Logo.png'
import MapMp from "../assets/images/MapMp.png"

import HeritageTrails from './HeritageTrails';
import Header from '../utils/Header';

const Hero = () => {
  return (

    <>
    <div className="relative w-full h-screen">
      {/* Hero Image */}
      <img 
        src={heroImageL} 
        alt="The building image with a font" 
        className='w-[100vw] h-[100vh] object-cover brightness-50 rounded-bl-2xl ' 
      />
      
      {/* Optional: Add overlay content here */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-[59px] font-bold mb-4 italic font-kaushan" style={{fontFamily:"Kaushan", fontSize:"5rem"}}>
            March into Madhya Pradesh!
          </h1>
          <p className="text-xl md:text-2xl mb-8" style={{fontFamily:"Montserrat"}}>
            Book, explore, and honor India's military heritage — digitally.
          </p>
          <button style={{padding:"0px 25px 0px 25px"}}   className="bg-white text-gray-800  rounded-full text-lg font-bold hover:bg-gray-100 transition-colors ">
            Explore Destinations
          </button>
        </div>
      </div>
    </div>
    
    <section className='Attractions h-[200vh] ' >
    <div className="bg-cover bg-center  w-full h-full rounded-tr-4xl rounded-br-4xl rounded-bl-4xl object-cover"   style={{ backgroundImage: `url(${AdventureBackGround})` }} >
        <div className="fontforAdveture text-center relative top-[20px] text-6xl text-[#016630] italic font-bold" style={{fontFamily:"Kaushan", letterSpacing:"3px"}}>
            <h1>
            Attractions

            </h1>
        
        </div>


<div className='centerLine communityFont flex flex-row items-center justify-center relative top-[25px] gap-2'>
  <div className='h-px w-[20px] bg-black relative top-[2px]'></div>
  <div>Our Community, Our Pride</div>
  <div className='h-px w-[20px] bg-black relative top-[2px]'></div>
</div>

<div className='GUnCObolImagesinflexBox flex flex-row justify-between gap-4 relative top-[4rem]'>
<div className="h-[313px] w-[392px] hover:shadow-2xl transition-shadow duration-300 shadow-black hover:shadow-black/80 rounded-lg overflow-hidden">
    <img src={heroImageL} alt="" className="w-full h-full object-cover brightness-90" />
  </div>
<div className="h-[313px] w-[392px] hover:shadow-2xl transition-shadow duration-300 shadow-black hover:shadow-black/80 rounded-lg overflow-hidden">
    <img src={heroImageL} alt="" className="w-full h-full object-cover brightness-90" />
  </div>
 <div className="h-[313px] w-[392px] hover:shadow-2xl transition-shadow duration-300 shadow-black hover:shadow-black/80 rounded-lg overflow-hidden">
    <img src={heroImageL} alt="" className="w-full h-full object-cover brightness-90" />
  </div>
<div className="h-[313px] w-[392px] hover:shadow-2xl transition-shadow duration-300 shadow-black hover:shadow-black/80 rounded-lg overflow-hidden">
    <img src={heroImageL} alt="" className="w-full h-full object-cover brightness-90" />
  </div>
</div>


           <div className='AboutTheTour relative top-36 '>
          <h1 className='text-center text-[#105E3B] font-kaushan  text-5xl italic font-kaushan  font-bold' style={{letterSpacing:"2px" , fontFamily:"Kaushan" }}>
          About the Tour
          </h1>

        <div className='centerLineForthewords flex flex-row items-center  justify-center' >
      <div className='h-px w-[20px] bg-black relative top-[2px] ml-5px'></div>
      <div className='text-center' style={{fontFamily:"Montserrat"}}> Journey through courage and heritage </div>
        <div className='h-px w-[20px] bg-black relative top-[2px] mr-5px'></div>

        </div>                
        

        <div className='theFOurCardsDesignforTheTourComponens w-full ' >
      <div className='flex flex-row justify-center items-center gap-4 mt-16'>

        <div className='w-[256px] h-[294px] border-1 rounded-3xl hover:shadow-2xl transition-shadow duration-300 shadow-black hover:shadow-black/80  overflow-hidden '> 
          
          <img src={Logo} alt="" className='relative bottom-[30px]' />
          
                  </div>
        <div className='w-[256px] h-[294px] border-1 rounded-3xl hover:shadow-2xl transition-shadow duration-300 shadow-black hover:shadow-black/80  overflow-hidden'>  </div>
        <div className='w-[256px] h-[294px] border-1 rounded-3xl hover:shadow-2xl transition-shadow duration-300 shadow-black hover:shadow-black/80  overflow-hidden'>  </div>
                <div className='w-[256px] h-[294px] border-1 rounded-3xl hover:shadow-2xl transition-shadow duration-300 shadow-black hover:shadow-black/80  overflow-hidden'>  </div>

        </div>
  <div className='flex flex-row  justify-center relative top-[40px] ' >
             <button style={{padding:"0px 25px 0px 25px" , fontFamily:"Roboto"}}   className="bg-green-600 text-gray-800  rounded-full border-black text-lg font-bold hover:bg-black transition-colors text-white ">
            Learn More About Us
          </button>
        </div>
</div>

        </div> 





</div>
    </section>


<HeritageTrails />

 
    
    </>
  );
};

export default Hero;