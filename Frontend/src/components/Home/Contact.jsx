import React from 'react';
import ContactUs from '../../assets/contactUs.jpg';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="pt-20 pb-12 px-5 bg-gray-200 text-white" style={{
      backgroundImage: `url(${ContactUs})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>

      {/* Section Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold uppercase tracking-wider">For complaints and suggestions</h1>
        <h1 className="text-5xl font-extrabold text-white mt-4">You can contact us through</h1>
      </div>

      {/* Line with animated circle */}
      <div className="flex justify-center items-center mt-2 relative">
        <div className="w-32 h-1 bg-blue-300 relative">
          <div className="absolute top-[-5px] left-0 w-3 h-3 bg-main rounded-full animate-moving-circle"></div>
        </div>
      </div>
      
      <p className="text-white mt-4 max-w-xl mx-auto text-lg text-center">
      We always listen to your suggestions, and if you have any complaints, we will definitely work on resolving them because your opinion matters to us.
      </p>

      {/* Contact Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Contact Item */}
        <div className="flex justify-center items-center bg-white px-6 py-6 rounded-lg shadow-lg">
          <div className="flex justify-center items-center bg-main w-12 h-12 rounded-full text-white">
            <FaLocationDot size={24} />
          </div>
          <div className="ml-4">
            <h1 className="text-black font-semibold">Office Address</h1>
            <h2 className="text-gray-500">Amman Arab University</h2>
          </div>
        </div>

        {/* Repeated Contact Items */}
        <div className="flex justify-center items-center bg-white px-6 py-6 rounded-lg shadow-lg">
          <div className="flex justify-center items-center bg-main w-12 h-12 rounded-full text-white">
            <MdOutlineMailOutline size={24} />
          </div>
          <div className="ml-4">
            <h1 className="text-black font-semibold">Email Address</h1>
            <h2 className="text-gray-500">abdalfatah.aljuaidi@gmail.com</h2>
          </div>
        </div>

        <div className="flex justify-center items-center bg-white px-6 py-6 rounded-lg shadow-lg">
          <div className="flex justify-center items-center bg-main w-12 h-12 rounded-full text-white">
            <FaPhoneAlt size={24} />
          </div>
          <div className="ml-4">
            <h1 className="text-black font-semibold">Phone Number</h1>
            <h2 className="text-gray-500">+962-78240-7533</h2>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Contact;
