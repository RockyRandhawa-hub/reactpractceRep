import React from 'react'
import MapMp from "../assets/images/MapMp.png"
import Logo from "../assets/icons/Logo.png"

const HeritageTrails = () => {
  return (
    <>
      <div className='w-full h-fit relative'> 
        <div id='bgImagofMpMap'>
          <div className="bg-cover bg-center w-full min-h-screen object-cover" style={{ backgroundImage: `url(${MapMp})` }}>
            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10"> 
            
            {/* Header Section */}
            <div className='headingforHeritageTrails flex flex-row justify-center pt-12'>
              <h1 className='text-5xl font-bold text-green-300 italic drop-shadow-2xl' style={{fontFamily:"Kaushan"}}>
                Heritage Trails
              </h1>
            </div>

            {/* Subtitle */}
            <div className='flex justify-center mt-4'>
              <p className='text-white text-xl font-medium text-center max-w-2xl px-4 drop-shadow-lg'>
                Discover the rich cultural heritage and historical landmarks of Madhya Pradesh
              </p>
            </div>

            {/* Cards Section */}
            <div className='theFOurCardsDesignforTheTourComponens w-full mt-12'>
              <div className='flex flex-row justify-center items-center gap-6 flex-wrap px-4'>
                <div className='w-[256px] h-[294px] bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-3xl hover:shadow-2xl hover:bg-white/30 transition-all duration-300 shadow-xl hover:shadow-black/60 overflow-hidden relative group hover:scale-105'> 
                  <img src={Logo} alt="" className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300' />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
                  <div className='absolute bottom-4 left-4 text-white'>
                    <h3 className='font-bold text-xl drop-shadow-lg'>Ancient Temples</h3>
                    <p className='text-sm opacity-90 drop-shadow-md'>Sacred Heritage Sites</p>
                  </div>
                </div>
                
                <div className='w-[256px] h-[294px] bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-3xl hover:shadow-2xl hover:bg-white/30 transition-all duration-300 shadow-xl hover:shadow-black/60 overflow-hidden relative group hover:scale-105'>
                  <div className='w-full h-full bg-gradient-to-br from-green-500/60 to-blue-600/60 flex items-center justify-center'>
                    <div className='text-center text-white'>
                      <div className='text-5xl mb-4 drop-shadow-lg'>🏰</div>
                      <h3 className='font-bold text-xl drop-shadow-lg'>Historic Forts</h3>
                      <p className='text-sm opacity-90 drop-shadow-md'>Architectural Marvels</p>
                    </div>
                  </div>
                </div>
                
                <div className='w-[256px] h-[294px] bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-3xl hover:shadow-2xl hover:bg-white/30 transition-all duration-300 shadow-xl hover:shadow-black/60 overflow-hidden relative group hover:scale-105'>
                  <div className='w-full h-full bg-gradient-to-br from-purple-500/60 to-pink-600/60 flex items-center justify-center'>
                    <div className='text-center text-white'>
                      <div className='text-5xl mb-4 drop-shadow-lg'>🏛️</div>
                      <h3 className='font-bold text-xl drop-shadow-lg'>Palaces</h3>
                      <p className='text-sm opacity-90 drop-shadow-md'>Royal Legacy</p>
                    </div>
                  </div>
                </div>
                
                <div className='w-[256px] h-[294px] bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-3xl hover:shadow-2xl hover:bg-white/30 transition-all duration-300 shadow-xl hover:shadow-black/60 overflow-hidden relative group hover:scale-105'>
                  <div className='w-full h-full bg-gradient-to-br from-orange-500/60 to-red-600/60 flex items-center justify-center'>
                    <div className='text-center text-white'>
                      <div className='text-5xl mb-4 drop-shadow-lg'>🎨</div>
                      <h3 className='font-bold text-xl drop-shadow-lg'>Art & Culture</h3>
                      <p className='text-sm opacity-90 drop-shadow-md'>Living Traditions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className='mt-16 px-4'>
              <div className='flex justify-center'>
                <div className='grid grid-cols-3 gap-8 text-center text-white'>
                  <div className='bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
                    <div className='text-4xl font-bold text-green-300 drop-shadow-lg'>50+</div>
                    <div className='text-base opacity-90 mt-2 drop-shadow-md'>Heritage Sites</div>
                  </div>
                  <div className='bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
                    <div className='text-4xl font-bold text-green-300 drop-shadow-lg'>1000+</div>
                    <div className='text-base opacity-90 mt-2 drop-shadow-md'>Years of History</div>
                  </div>
                  <div className='bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
                    <div className='text-4xl font-bold text-green-300 drop-shadow-lg'>25+</div>
                    <div className='text-base opacity-90 mt-2 drop-shadow-md'>Guided Tours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className='flex flex-row justify-center mt-12 pb-16'>
              <button 
                style={{padding:"15px 40px", fontFamily:"Roboto"}}   
                className="bg-green-500 hover:bg-green-600 text-white rounded-full text-xl font-bold transition-all duration-300 shadow-2xl hover:shadow-green-500/30 hover:scale-110 border-2 border-green-300 drop-shadow-xl"
              >
                Discover More Trails
              </button>
            </div>

            {/* Decorative Elements */}
            <div className='absolute top-20 left-10 w-24 h-24 bg-green-400/30 rounded-full blur-xl animate-pulse'></div>
            <div className='absolute bottom-20 right-10 w-40 h-40 bg-blue-400/30 rounded-full blur-xl animate-pulse'></div>
            <div className='absolute top-1/2 left-5 w-20 h-20 bg-purple-400/30 rounded-full blur-xl animate-pulse'></div>
            <div className='absolute top-1/3 right-1/4 w-16 h-16 bg-pink-400/30 rounded-full blur-xl animate-pulse'></div>
            <div className='absolute bottom-1/3 left-1/4 w-28 h-28 bg-orange-400/30 rounded-full blur-xl animate-pulse'></div>
          </div>
        </div></div>
      </div>
    </>
  )
}

export default HeritageTrails;