import React from 'react'
import MapMp from "../assets/images/MapMp.png"
import Logo from "../assets/icons/Logo.png"
const HeritageTrails = () => {
  return (
    <>
{/* 
<div className="w-full overflow-hidden relative">
  <img
    src={MapMp}
    alt="Map Background"
    className="w-full h-auto object-cover opacity-50"
  />
  <h1 className='absolute top-[30px] w-full inline-block text-center text-5xl text-[#105E3B] italic font-semibold'  style={{fontFamily:"kaushan"}} >Heritage Trails</h1>

</div> */}


 <div className='w-full h-fit '> 
    
        <div id='bgImagofMpMap'>
    <div className="bg-cover bg-center  w-full h-[100vh]  object-cover  opacity-50"   style={{ backgroundImage: `url(${MapMp})` }} > 
            <div className='headingforHeritageTrails flex flex-row justify-center'>
                <h1 className='text-3xl mt-16 font-bold text-green-400 italic' style={{fontFamily:"Kaushan"}}>  Heritage Trails </h1>
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
                     Discover more 
                   </button>
                 </div>
         </div>
     </div>

        </div>

    </div> 

    </>
    
  )
}

export default HeritageTrails