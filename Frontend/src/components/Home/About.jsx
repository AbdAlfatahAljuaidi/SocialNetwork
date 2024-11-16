import React from 'react';
import AboutImage from '../../assets/AboutImage.png';
import main from '../../assets/BgAbout.jpg';
import { FaCheck } from "react-icons/fa";

const About = () => {
  return (
    <div
      className=" lg:flex justify-center items-center pb-20 pt-32 text-left space-x-8"
      style={{
        backgroundImage: `url(${main})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* صورة القسم */}
      <div className="">
        <img src={AboutImage} alt="About Techno" className="" />
      </div>

      {/* محتوى النصوص */}
      <div className="lg:max-w-xl bg-white bg-opacity-80 p-6 rounded-lg ">
        <div className=' mb-9'>    
            <h1 className="text-main text-2xl mb-4">// About Techno</h1>
        <h2 className="text-4xl font-bold leading-tight mb-6">
          We Execute Our Ideas From <br />
          The Start <span className="text-main">To Finish.</span>
        </h2>
        <p className="text-lg text-gray-700">
          There are many variations of passages of Lorem Ipsum available, but the majority have
          suffered alteration in some form, by injected humour, or randomised words creatives.
        </p>

        <div className="w-32 h-1 bg-blue-300 relative mt-3">
          {/* الدائرة المتحركة */}
          <div className="absolute top-[-5px] left-0 w-3 h-3 bg-main rounded-full animate-moving-circle"></div>
        </div>
      

        </div>
    

        <div className="lg:flex justify-between  items-center mt-4">
          <div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-main flex justify-center items-center">
                <FaCheck className="text-white text-[13px]" />
              </div>
              <h1 className="ml-2 text-lg">Connect Students </h1>
            </div>

            <div className="flex items-center mt-2">
              <div className="w-6 h-6 rounded-full bg-main flex justify-center items-center">
                <FaCheck className="text-white text-[13px]" />
              </div>
              <h1 className="ml-2 text-lg">Peer Learning</h1>
            </div>

            <div className="flex items-center mt-2">
              <div className="w-6 h-6 rounded-full bg-main flex justify-center items-center">
                <FaCheck className="text-white text-[13px]" />
              </div>
              <h1 className="ml-2 text-lg">Simplifying Interactions</h1>
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-main flex justify-center items-center">
                <FaCheck className="text-white text-[13px]" />
              </div>
              <h1 className="ml-2 text-lg">Reliable Solutions</h1>
            </div>

            <div className="flex items-center mt-2">
              <div className="w-6 h-6 rounded-full bg-main flex justify-center items-center">
                <FaCheck className="text-white text-[13px]" />
              </div>
              <h1 className="ml-2 text-lg">Campus Communication</h1>
            </div>

            <div className="flex items-center mt-2">
              <div className="w-6 h-6 rounded-full bg-main flex justify-center items-center">
                <FaCheck className="text-white text-[13px]" />
              </div>
              <h1 className="ml-2 text-lg">Student Engagement</h1>
            </div>
          </div>
        </div>
        <button className='mt-8 bg-main text-white px-8 py-2 rounded-lg hover:bg-blue-600 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'>More About</button>
      </div>
    </div>
  );
};

export default About;
