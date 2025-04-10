import React from 'react';
import { FaCheckCircle, FaCloud, FaHeadset, FaInfinity, FaShareAlt } from 'react-icons/fa';

const Pricing = () => {
  return (
    <div className="pt-24 pb-16 px-5 bg-[#EFF2F7]">
      <div className="text-center mb-9">
        <h1 className="text-2xl font-semibold text-blue-500 uppercase tracking-wider">Why Choose Ask AAU?</h1>
        <h1 className="text-5xl font-extrabold text-gray-800 mt-4">
          <span className="text-blue-500">Enhancing</span> Your Learning Experience
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto text-lg">
          Ask AAU provides a collaborative space where students can engage, learn, and share knowledge effortlessly.
        </p>
      </div>

      {/* الخط مع الدائرة المتحركة */}
      <div className="flex justify-center items-center mt-1 relative">
        <div className="w-32 h-1 bg-blue-300 relative">
          <div className="absolute top-[-5px] left-0 w-3 h-3 bg-main rounded-full animate-moving-circle"></div>
        </div>
      </div>

      {/* البطاقات */}
      <div className="w-[90%] m-auto mt-12 text-center text-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* البطاقة الأولى */}
          <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 to-white border hover:shadow-2xl transition-shadow duration-300 relative">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Ask & Answer</h1>
            <p className="text-gray-600 mt-4">Engage with a community of students to ask questions and provide answers in a supportive environment.</p>
          </div>

          {/* البطاقة الثانية */}
          <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 to-white border hover:shadow-2xl transition-shadow duration-300">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Collaborate & Learn</h1>
            <p className="text-gray-600 mt-4">Work together with fellow students on projects, assignments, and academic discussions.</p>
          </div>

          {/* البطاقة الثالثة */}
          <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 to-white border hover:shadow-2xl transition-shadow duration-300">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Stay Connected</h1>
            <p className="text-gray-600 mt-4">Build a strong academic network and stay up to date with the latest discussions and topics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
