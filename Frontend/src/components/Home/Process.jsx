import React from 'react';
import { FaLightbulb } from "react-icons/fa";
import ProcessImg from '../../assets/Process.png';

const Process = () => {
  return (
    <div className="pt-32 pb-16 px-5 bg-gray-50">
      
      {/* عنوان القسم */}
      <div className="text-center mb-16">
  <h1 className="text-2xl font-semibold text-blue-500 uppercase tracking-wider">Our Approach</h1>
  <h1 className="text-5xl font-extrabold text-gray-800 mt-4">
    <span className="text-blue-500">Step-by-Step</span> Process
  </h1>
  <p className="text-gray-600 mt-4 max-w-xl mx-auto text-lg">
    We follow a clear and structured process to deliver the best results for your needs.
  </p>
</div>


      {/* الخط مع الدائرة المتحركة */}
      <div className="flex justify-center items-center mt-8 relative">
        <div className="w-32 h-1 bg-blue-300 relative">
          <div className="absolute top-[-5px] left-0 w-3 h-3 bg-main rounded-full animate-moving-circle"></div>
        </div>
      </div>

      {/* الخطوات */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-16">
        {/* الخطوة الأولى */}
        <div className="flex flex-col items-center text-center max-w-sm mx-auto">
          <div className="flex justify-center items-center bg-main h-24 w-24 rounded-full shadow-lg relative">
            <FaLightbulb className="text-white text-4xl" />
          </div>
          <h2 className="mt-10 font-bold text-xl text-gray-800">Select A Project</h2>
          <p className="mt-4 text-gray-600">
            We have the technology and industry expertise to develop solutions
            that can connect people and businesses across various mobile devices.
          </p>
        </div>

        {/* الخطوة الثانية */}
        <div className="flex flex-col items-center text-center max-w-sm mx-auto">
          <img src={ProcessImg} alt="Process Step" className="w-48 h-auto mb-6" />
          <h2 className="font-bold text-xl text-gray-800">Plan & Strategize</h2>
          <p className="mt-4 text-gray-600">
            Collaborate with our team to outline the steps needed to achieve your project goals effectively.
          </p>
        </div>

        {/* الخطوة الثالثة */}
        <div className="flex flex-col items-center text-center max-w-sm mx-auto">
          <div className="flex justify-center items-center bg-main h-24 w-24 rounded-full shadow-lg relative">
            <FaLightbulb className="text-white text-4xl" />
          </div>
          <h2 className="mt-10 font-bold text-xl text-gray-800">Deliver Excellence</h2>
          <p className="mt-4 text-gray-600">
            We ensure a seamless delivery of high-quality solutions tailored to your needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Process;
