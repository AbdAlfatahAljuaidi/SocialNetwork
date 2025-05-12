// SignUp.js
import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
import { useTranslation } from 'react-i18next';


const SignUp = ({ switchToLogin ,changeLanguage }) => {

    const [Name,setName] = useState("")
    const [Email,setEmail] = useState("")
    const [Password,setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showText, setShowText] = useState(false);

    const { t } = useTranslation();
    const navigate =useNavigate()

    const submitForm = async () => {
        if (isSubmitting) return; // منع الضغط المتكرر
      
        setIsSubmitting(true);
        try {
          const { data } = await axios.post(`${apiUrl}/User/SignUp`, {
            Name,
            Email,
            Password
          });
      
          if (
            data.message ===
            "new user created now you should go to your email to activate it"
          ) {
            console.log("user signup success");
            toast.success("New user created now you should go to your email to activate it");
          }
        } catch (error) {
          console.log(error.response);
          if (
            error.response?.data?.message.includes("fails to match the required pattern")
          ) {
            toast.error(
              "Password must include uppercase and lowercase letters, numbers, and symbols."
            );
          }
          
        } finally {
          setIsSubmitting(false);
        }
      };


    
    return (
      <div className='w-full p-10'>
      <div>
        <h1 className='text-3xl text-center font-extrabold '>{t('register.title')}</h1>

        <div className='relative w-full my-4 md:my-8 mx-0 h-12'>
          <input
            className='w-full h-full bg-transparent border-none outline-none placeholder:text-white custom-bg rounded-[40px] text-lg text-white py-5 pr-11 pl-5'
            name="Name"
            type='text'
            onChange={(e) => setName(e.target.value)}
            placeholder={t('register.username')}
          />
          <FaUser className='absolute right-[20px] top-1/3 text-lg' />
        </div>

        <div className='relative w-full my-4 md:my-8 mx-0 h-12'>
          <input
            className='w-full h-full bg-transparent border-none outline-none placeholder:text-white custom-bg rounded-[40px] text-lg text-white py-5 pr-11 pl-5'
            name="Email"
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('register.email')}
          />
          <FaEnvelope className='absolute right-[20px] top-1/3 text-lg' />
        </div>

        <div className='relative w-full my-4 md:my-8 mx-0 h-12'>
          <input
            className='w-full h-full bg-transparent border-none outline-none placeholder:text-white custom-bg rounded-[40px] text-lg text-white py-5 pr-11 pl-5'
            name="Password"
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('register.password')}
          />
          <FaLock className='absolute right-[20px] top-1/3 text-lg' />
        </div>

        <button
          className='w-full h-11 bg-white border-none outline-none rounded-[40px] font-bold cursor-pointer text-black shadow-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={submitForm}
          disabled={isSubmitting}
        >
          {isSubmitting ? t('register.registering') : t('register.register')}
        </button>

        <div className='text-sm text-center mt-5 mr-0 ml-4 pb-2'>
          <p>
            {t('register.alreadyHaveAccount')}{' '}
            <a className='text-white font-semibold hover:underline' href='#' onClick={switchToLogin}>
              {t('register.login')}
            </a>
          </p>
        </div>
      </div>
    </div>
    );
};

export default SignUp;
