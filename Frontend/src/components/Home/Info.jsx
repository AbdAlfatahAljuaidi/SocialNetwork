import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import callAction from '../../assets/call-action-img.jpg';
import callActionbg from '../../assets/call-action-bg.jpg';
import { LuMessagesSquare } from "react-icons/lu";
import { Link } from 'react-router-dom';

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
        <img src={callAction} alt="Ask AAU" className="mx-auto lg:mx-0 rounded-lg shadow-lg" />
        <div className="flex flex-wrap justify-around items-center mt-8 gap-8">
          {/* Students Connected */}
          <div className="text-center">
            <span className="text-4xl font-extrabold ">
              {inView && <CountUp end={10000} duration={5} />}+
            </span>
            <h1 className="text-xl mt-2">Students Connected</h1>
          </div>
          {/* Questions Asked */}
          <div className="text-center">
            <span className="text-4xl font-extrabold ">
              {inView && <CountUp end={5000} duration={5} />}+
            </span>
            <h1 className="text-xl mt-2">Questions Asked</h1>
          </div>
          {/* Answers Provided */}
          <div className="text-center">
            <span className="text-4xl font-extrabold ">
              {inView && <CountUp end={15000} duration={5} />}+
            </span>
            <h1 className="text-xl mt-2">Answers Provided</h1>
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
          Join Ask AAU for collaborative learning, where students can share knowledge and engage in meaningful discussions to help each other.
        </p>
        <Link to={"/Home/Registration"} >
        <button className="bg-white px-6 py-3 mt-6 text-main font-bold rounded-lg shadow-md hover:bg-main hover:bg-blue-700 hover:text-white transition-all duration-300">
          Join Now
        </button>
        </Link>
        <div className="mt-9 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-extrabold">Need Help to Connect?</h1>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Get started by joining the Ask AAU platform, where you can ask questions, provide answers, and collaborate with peers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
