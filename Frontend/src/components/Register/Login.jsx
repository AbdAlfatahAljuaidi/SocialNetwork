import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Login = ({ switchToRegister, setUser ,changeLanguage }) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false); // ✅ حالة تسجيل الدخول
    const { t } = useTranslation();
    const navigate = useNavigate();

    const submitForm = async () => {
        if (isLoggingIn) return;
        setIsLoggingIn(true); // ✅ بدأ الإرسال

        try {
            const { data } = await axios.post(`${apiUrl}/User/Login`, {
                Email,
                Password,
            });

            if (data.message === "login success") {
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);

                toast.success(`Welcome ${data.user.Name}`);
                navigate("/Index");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setIsLoggingIn(false); // ✅ انتهاء الإرسال
        }
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/index');
        }
    }, [navigate]);

    return (
        <div className='w-full p-3 md:p-10 login'>
        <div>
          <h1 className='text-4xl text-center font-extrabold'>{t('login.title')}</h1>
  
          {/* Email */}
          <div className='relative w-full my-8 mx-0 h-12'>
            <input
              className='w-full h-full bg-transparent placeholder:text-white border-none outline-none custom-bg rounded-[40px] text-lg text-white py-5 pr-11 pl-5'
              name="Email"
              type='text'
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('login.email')}
            />
            <FaUser className='absolute right-[20px] top-1/3 text-lg' />
          </div>
  
          {/* Password */}
          <div className='relative w-full my-8 mx-0 h-12'>
            <input
              className='w-full h-full bg-transparent border-none outline-none custom-bg placeholder:text-white rounded-[40px] text-lg text-white py-5 pr-11 pl-5'
              name="Password"
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.password')}
            />
            <FaLock className='absolute right-[20px] top-1/3 text-lg' />
          </div>
  
          {/* Remember & Forgot Password */}
          <div className='flex justify-between text-sm mt-5 mr-0 ml-4'>
          
            <Link to="/ForgetPassword">
              <span className='text-white hover:underline'>{t('login.forgot')}</span>
            </Link>
          </div>
  
          {/* Submit Button */}
          <button
            className='w-full h-11 bg-white border-none outline-none rounded-[40px] font-bold cursor-pointer text-black shadow-sm mt-4 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={submitForm}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? t('login.logging') : t('login.login')}
          </button>
  
          {/* Switch to Register */}
          <div className='text-sm text-center mt-5 mr-0 ml-4'>
            <p>
              {t('login.noAccount')}{' '}
              <span className='text-white font-semibold hover:underline cursor-pointer' onClick={switchToRegister}>
                {t('login.register')}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Login;
