import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaMap } from "react-icons/fa6";
import { FaPhoneAlt ,FaFacebookF,FaInstagram ,FaTwitter ,FaTiktok   } from "react-icons/fa";
import { BsThreads } from "react-icons/bs";

const Header = () => {
  
  return (
    <div className='flex justify-around bg-main p-4 hidden md:flex ' id='Home'>
        <div className='flex justify-center'>
          
            <h6 className='flex items-center text-white text-sm'><MdEmail className='mr-1 text-base' />abdalfatah.aljuaidi@gmail.com</h6>
            <h6 className='flex items-center text-white ml-4 text-sm'><FaMap className='mr-1 text-base' />Amman Jordan</h6>
            <h6 className='flex items-center text-white ml-4 text-sm'><FaPhoneAlt className='mr-1 text-base' />+962-78-2407533</h6>
        
        </div>
        <div className='flex justify-around text-white'>
            <FaFacebookF className='cursor-pointer' />
            <FaInstagram className='ml-3 cursor-pointer'  />
            <FaTwitter className='ml-3 cursor-pointer'  />
            <FaTiktok  className='ml-3 cursor-pointer' />
            <BsThreads className='ml-3 cursor-pointer'  />

        </div>
        
    </div>
  )
}

export default Header