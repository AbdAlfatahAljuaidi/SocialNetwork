import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaMap } from "react-icons/fa6";
import { FaPhoneAlt ,FaFacebookF,FaInstagram ,FaTwitter ,FaTiktok   } from "react-icons/fa";
import { BsThreads } from "react-icons/bs";

const Header = () => {
  
  return (
    <div className='flex justify-around bg-main p-4 hidden md:flex ' id='Home'>
        <div className='flex justify-center'>
          
            <h6 className='flex items-center text-white text-sm'><MdEmail className='mx-1 text-base' />abdalfatah.aljuaidi@gmail.com</h6>
            <h6 className='flex items-center text-white ml-4 text-sm'><FaMap className='mx-1 text-base' />Amman Jordan</h6>
            <h6 className='flex items-center text-white ml-4 text-sm'><FaPhoneAlt className='mx-1 text-base' />+962-78-2407533</h6>
        
        </div>
        <div className='flex justify-around text-white'>
           <a target='_blank' href="https://www.instagram.com/ab00d_aljaidi?igsh=NHgyZWhtYno3ZGV0"><FaInstagram className='ml-3 cursor-pointer'  /></a> 
        

        </div>
        
    </div>
  )
}

export default Header