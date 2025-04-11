import axios from 'axios';
import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';
import '../../../Styles/login.css';
import back from '../../assets/Register.jpg';
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${apiUrl}/forgetPassword`, {
      email
      });

      toast.success(data.message || "Check your email for reset instructions.");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center'
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='p-10 login wrapper w-[420px] font-abc h-[450px] rounded-lg text-white flex items-center'>
        <div className='w-full'>
          <h1 className='text-3xl text-center font-extrabold mb-6'>Forgot Password</h1>

          <div className='relative w-full my-8 h-12'>
            <input
              className='w-full h-full bg-transparent placeholder:text-white border-none outline-none custom-bg rounded-[40px] text-lg text-white py-5 pr-11 pl-5'
              name="Email"
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
            />
            <FaUser className='absolute right-[20px] top-1/3 text-lg' />
          </div>

          <p className=" ">
    <a href="/Home/Registration" className="text-white underline hover:text-gray-300 transition">
      Back to Login
    </a>
  </p>

          <button
            className='w-full h-11 bg-white border-none outline-none rounded-[40px] font-bold cursor-pointer text-black shadow-sm mt-4'
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
