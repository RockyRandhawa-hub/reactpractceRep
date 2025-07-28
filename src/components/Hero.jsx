import React from 'react';
import heroImageL from '../assets/images/heroImageL.jpg';
import AdventureBackGround from '../assets/images/AdventureBackGround.jpg';
import Logo from '../assets/icons/Logo.png';
import HeritageTrails from './HeritageTrails';

const Hero = () => {
  return (
    <>
      {/* WRAPPER: Unifying background for smooth transitions */}
      <div
        className="bg-cover bg-center w-full text-white"
        style={{ backgroundImage: `url(${AdventureBackGround})` }}
      >

        {/* HERO SECTION */}
        <div className="relative w-full min-h-screen">
          <img
            src={heroImageL}
            alt="Temple with sky"
            className="w-full h-full object-cover brightness-50"
          />

          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 italic" style={{ fontFamily: "Kaushan" }}>
                March into Madhya Pradesh!
              </h1>
              <p className="text-lg md:text-2xl mb-8" style={{ fontFamily: "Montserrat" }}>
                Book, explore, and honor India's military heritage — digitally.
              </p>
              <button className="bg-white text-gray-800 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors px-8 py-2">
                Explore Destinations
              </button>
            </div>
          </div>
        </div>

        {/* ATTRACTIONS SECTION */}
        <section className="py-24 -mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center text-[#016630] text-4xl md:text-6xl italic font-bold mb-6" style={{ fontFamily: "Kaushan" }}>
              Attractions
            </div>

            <div className="flex items-center justify-center gap-2 text-black mb-12" style={{ fontFamily: "Montserrat" }}>
              <div className="h-px w-5 bg-black" />
              <span>Our Community, Our Pride</span>
              <div className="h-px w-5 bg-black" />
            </div>

            {/* Attraction Images */}
           <div className="flex flex-wrap md:flex-nowrap justify-center gap-14">

              {[1, 2, 3, 4].map((_, idx) => (
                <div
                  key={idx}
                  className="w-full sm:w-[392px] h-[313px] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <img src={heroImageL} alt={`Attraction ${idx + 1}`} className="w-full h-full object-cover brightness-90" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT THE TOUR SECTION */}
        <section className="mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center text-[#105E3B] text-4xl md:text-5xl italic font-bold mb-4" style={{ fontFamily: "Kaushan" }}>
              About the Tour
            </h2>

            <div className="flex justify-center items-center gap-2 mb-12 text-black" style={{ fontFamily: "Montserrat" }}>
              <div className="h-px w-5 bg-black" />
              <span>Journey through courage and heritage</span>
              <div className="h-px w-5 bg-black" />
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-full sm:w-[256px] h-[294px] border border-black rounded-3xl hover:shadow-2xl transition-shadow duration-300 shadow-black hover:shadow-black/80 overflow-hidden flex items-center justify-center bg-white/30 text-black text-center"
                >
                  {item === 0 ? (
                    <img src={Logo} alt="Logo" className="h-20" />
                  ) : (
                    <span className="text-lg font-semibold">Coming Soon</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <button className="bg-green-600 text-white rounded-full text-lg font-bold hover:bg-black transition-colors px-8 py-2">
                Learn More About Us
              </button>
            </div>
          </div>
        </section>

        {/* HERITAGE TRAILS SECTION */}
        <div className="-mt-16">
          <HeritageTrails />
        </div>
      </div>
    </>
  );
};

export default Hero;
