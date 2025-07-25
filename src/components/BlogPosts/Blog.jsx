import React from 'react';
import Header from '../../utils/Header';
import Navdeep from "../../assets/images/Navdeep.jpg";
import Footer from '../../utils/Footer';


const Blog = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="relative w-full h-[100vh]">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${Navdeep})` }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Text Content */}
        <div className="relative z-10 flex items-center justify-center h-full ">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4 italic" style={{fontFamily:"Kaushan"}}>
            Read the Stories Behind India’s Historic <br /> Army Site.
          </h1>
        </div>
      </div>

      <div className='TheFourCardCOmpoennt w-full h-screen flex flex-row'>

        <div className="widthOneForTheComponenntOneTheBlankSpaceForFirstSide w-[292px]"> </div>

        <div className="rowOneForCardComp w-[1148px]  flex flex-row">
          <div className="cardComponentOneForImageOne w-[552px] h-[456px]">
            <img src={Navdeep} alt=""  className='w-[432px] h-[324px] rounded-3xl mt-[35px]'/>
            <p className='text-justify'> <span className=' relative bottom-[5px] text-xs font-bold'>.</span> 8 min read </p>
            <p style={{fontFamily:"Montserrat"}} className='text-xl'>Plan Your Journey Through Military’s <br /> Heritage: Timings and What to <br /> Expect</p>
          </div>
           <div className="cardComponentOneForImageOne w-[552px] h-[456px] ml-[40px]">
            <img src={Navdeep} alt=""  className='w-[432px] h-[324px] rounded-3xl mt-[35px]'/>
            <p className='text-justify'> <span className=' relative bottom-[5px] text-xs font-bold'>.</span> 8 min read </p>
            <p style={{fontFamily:"Montserrat"}} className='text-xl'>Plan Your Journey Through Military’s <br /> Heritage: Timings and What to <br /> Expect</p>
          </div>
          <div className='w-[292px]'></div>
        </div>

      </div>


            <div className='TheFourCardCOmpoenntRowTwo w-full h-screen flex flex-row relative bottom-[80px]'>

        <div className="widthOneForTheComponenntOneTheBlankSpaceForFirstSide w-[292px]"> </div>

        <div className="rowOneForCardComp w-[1148px] h-full flex flex-row">
          <div className="cardComponentOneForImageOne w-[552px] h-[456px]">
            <img src={Navdeep} alt=""  className='w-[432px] h-[324px] rounded-3xl '/>
            <p className='text-justify'> <span className=' relative bottom-[5px] text-xs font-bold'>.</span> 8 min read </p>
            <p style={{fontFamily:"Montserrat"}} className='text-xl'>Plan Your Journey Through Military’s <br /> Heritage: Timings and What to <br /> Expect</p>
          </div>
           <div className="cardComponentOneForImageOne w-[552px] h-[456px] ml-[40px]">
            <img src={Navdeep} alt=""  className='w-[432px] h-[324px] rounded-3xl '/>
            <p className='text-justify'> <span className=' relative bottom-[5px] text-xs font-bold'>.</span> 8 min read </p>
            <p style={{fontFamily:"Montserrat"}} className='text-xl'>Plan Your Journey Through Military’s <br /> Heritage: Timings and What to <br /> Expect</p>
          </div>
          <div className='w-[292px]'></div>
        </div>

      </div>

<Footer />
    </>
  );
};

export default Blog;
