import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import callAction from '../../assets/call-action-img.jpg';
import callActionbg from '../../assets/call-action-bg.jpg';
import { LuMessagesSquare } from "react-icons/lu";

const Info = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <div
      className="pt-20 pb-16 flex flex-col lg:flex-row justify-center items-center gap-12 bg-cover bg-center px-5"
      style={{
        backgroundImage: `url(${callActionbg})`,
      }}
    >
      {/* Left Section */}
      <div ref={ref} className="text-white text-center lg:text-left">
        <img src={callAction} alt="Call Action" className="mx-auto lg:mx-0 rounded-lg shadow-lg" />
        <div className="flex flex-wrap justify-around items-center mt-8 gap-8">
          {/* Happy Clients */}
          <div className="text-center">
            <span className="text-4xl font-extrabold ">
              {inView && <CountUp end={90000} duration={5} />}k
            </span>
            <h1 className="text-xl mt-2">Happy Clients</h1>
          </div>
          {/* Account Numbers */}
          <div className="text-center">
            <span className="text-4xl font-extrabold ">
              {inView && <CountUp end={45} duration={5} />}+
            </span>
            <h1 className="text-xl mt-2">Account Numbers</h1>
          </div>
          {/* Finished Projects */}
          <div className="text-center">
            <span className="text-4xl font-extrabold ">
              {inView && <CountUp end={40} duration={5} />}k
            </span>
            <h1 className="text-xl mt-2">Finished Projects</h1>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="max-w-lg text-center lg:text-left lg:ml-9">
        <div className="flex justify-center items-center w-24 h-24 rounded-full bg-main mx-auto lg:mx-0">
          <LuMessagesSquare className="text-white text-4xl animate-bounce" />
        </div>
        <h1 className="text-3xl text-white font-extrabold mt-6">+880 013 143 206</h1>
        <p className="text-white text-lg mt-4 leading-relaxed">
          We have the technology and industry expertise to develop solutions that can connect people and businesses.
        </p>
        <button className="bg-white px-6 py-3 mt-6 text-main font-bold rounded-lg shadow-md hover:bg-main hover:text-white transition-all duration-300">
          Contact Us
        </button>
        <div className="mt-9 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-extrabold">Need Help To Start?</h1>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Holistically brand clicks-and-mortar interfaces without stylish a synergistic vortals. Dynamically iterate compelling manufactured products rather than moving forward.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
