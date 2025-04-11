// Login.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;



const Login = ({ switchToRegister, setUser }) => {

    const [Email,setEmail]=useState("")
    const [Password,setPassword]=useState("")

    


    const navigate = useNavigate()
 
    const submitForm = async ()=> {
     try{
        console.log("start");
        
        const {data} = await axios.post(`${apiUrl}/User/Login`,{
            Email,
            Password,
        })



console.log("hello");

        if (data.message == "login success" ){
            console.log(data);
            
          localStorage.setItem("user" , JSON.stringify(data.user))
          setUser(data.user)
          
          toast.success(`Welcome ${data.user.Name}`);

          navigate("/Index")
            
           // localStorage.setItem("user",)
        }
     }
catch(error){
 console.log(error);
 toast.error(error.response.data.message)
    
}
    }


    useEffect(() => {
        // التحقق من وجود قيمة المستخدم في localStorage
        const user = localStorage.getItem('user');
    
        if (user) {
          // إذا كانت هناك قيمة للمستخدم، يتم التوجيه إلى الصفحة الرئيسية أو الصفحة المطلوبة
          navigate('/index'); // توجيه المستخدم إلى الصفحة الرئيسية
        }
      }, [navigate]);
    


    return (
        <div className='w-full p-10 login'>
            <div>
                <h1 className='text-4xl text-center font-extrabold'>Login</h1>
                <div className='relative w-full my-8 mx-0 h-12'>
                    <input
                        className='w-full h-full bg-transparent placeholder:text-white border-none outline-none custom-bg rounded-[40px] text-lg text-white py-5 pr-11 pl-5'
                        name="Email"
                        type='text'
                        onChange={(e) =>setEmail(e.target.value)}
                        placeholder='Email'
                    />
                    <FaUser className='absolute right-[20px] top-1/3 text-lg' />
                </div>

                <div className='relative w-full my-8 mx-0 h-12'>
                    <input
                        className='w-full h-full bg-transparent border-none outline-none custom-bg placeholder:text-white rounded-[40px] text-lg text-white py-5 pr-11 pl-5'
                        name="Password"
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        
                        placeholder='Password'
                    />
                    <FaLock className='absolute right-[20px] top-1/3 text-lg' />
                </div>

                <div className='flex justify-between text-sm mt-5 mr-0 ml-4'>
                    <label><input className='mr-1' type='checkbox' />Remember me</label>
                  <Link to={"/ForgetPassword"}>  <a className='text-white hover:underline'>Forgot Password?</a></Link>
                </div>

                <button className='w-full h-11 bg-white border-none outline-none rounded-[40px] font-bold cursor-pointer text-black shadow-sm mt-4' onClick={submitForm}>Login</button>

                <div className='text-sm text-center mt-5 mr-0 ml-4'>
                    <p>Don't have an account? <a className='text-white font-semibold hover:underline' href='#' onClick={switchToRegister}>Register</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
