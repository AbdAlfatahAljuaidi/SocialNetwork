import React from 'react';
import { FaCheckCircle, FaCloud, FaHeadset, FaInfinity, FaShareAlt } from 'react-icons/fa';

const Pricing = () => {
  return (
    <div className="pt-32 pb-16 px-5 bg-gray-100">
    <div className="text-center mb-9">
  <h1 className="text-2xl font-semibold text-blue-500 uppercase tracking-wider">Flexible Pricing</h1>
  <h1 className="text-5xl font-extrabold text-gray-800 mt-4">
    <span className="text-blue-500">Choose</span> Your Plan
  </h1>
  <p className="text-gray-600 mt-4 max-w-xl mx-auto text-lg">
    No matter your needs, we’ve got a plan tailored for you. Discover the perfect fit today!
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
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Basic Pack</h1>
            <h2 className="text-5xl font-extrabold text-blue-500 mb-6">$49</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-blue-500" />
                <h1>30 Days Trial Features</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaCloud className="text-blue-500" />
                <h1>Synced To Cloud Database</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaHeadset className="text-blue-500" />
                <h1>10 Hours Of Support</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaShareAlt className="text-blue-500" />
                <h1>Social Media Integration</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaInfinity className="text-blue-500" />
                <h1>Unlimited Features</h1>
              </div>
            </div>
            <button className="mt-8 w-full text-white bg-blue-500 border border-blue-500 px-8 py-3 rounded-lg hover:bg-blue-600 hover:border-blue-600 transition-all duration-200">
              Select Plan
            </button>
          </div>

          {/* البطاقة الثانية */}
          <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 to-white border hover:shadow-2xl transition-shadow duration-300">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Pro Pack</h1>
            <h2 className="text-5xl font-extrabold text-blue-500 mb-6">$99</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-blue-500" />
                <h1>30 Days Trial Features</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaCloud className="text-blue-500" />
                <h1>Synced To Cloud Database</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaHeadset className="text-blue-500" />
                <h1>20 Hours Of Support</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaShareAlt className="text-blue-500" />
                <h1>Social Media Integration</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaInfinity className="text-blue-500" />
                <h1>Unlimited Features</h1>
              </div>
            </div>
            <button className="mt-8 w-full text-white bg-blue-500 border border-blue-500 px-8 py-3 rounded-lg hover:bg-blue-600 hover:border-blue-600 transition-all duration-200">
              Select Plan
            </button>
          </div>

          {/* البطاقة الثالثة */}
          <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 to-white border hover:shadow-2xl transition-shadow duration-300">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Pre Pack</h1>
            <h2 className="text-5xl font-extrabold text-blue-500 mb-6">$149</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-blue-500" />
                <h1>30 Days Trial Features</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaCloud className="text-blue-500" />
                <h1>Synced To Cloud Database</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaHeadset className="text-blue-500" />
                <h1>30 Hours Of Support</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaShareAlt className="text-blue-500" />
                <h1>Social Media Integration</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaInfinity className="text-blue-500" />
                <h1>Unlimited Features</h1>
              </div>
            </div>
            <button className="mt-8 w-full text-white bg-blue-500 border border-blue-500 px-8 py-3 rounded-lg hover:bg-blue-600 hover:border-blue-600 transition-all duration-200">
              Select Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
