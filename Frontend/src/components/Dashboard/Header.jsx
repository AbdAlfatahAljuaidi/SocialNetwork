

// Header.js
import React from 'react';
import { IoMdNotifications } from "react-icons/io";
import { FaSearch, FaBars } from "react-icons/fa";
import Person from '../../assets/person.jpg';

const Header = ({ toggleMenu, isMenuOpen }) => {
  const iconColor = isMenuOpen ? 'text-white' : 'text-black';

  return (
    <div className={`w-full ${isMenuOpen ? 'md:ml-56' : ''}`}> 
      <div className='flex justify-between items-center px-4 md:px-9 pt-5'>
        <div className='flex items-center'>
          <FaBars size={24} className={`md:hidden cursor-pointer mr-3 ${iconColor} z-50`} onClick={toggleMenu} />
          <div>
            <h1 className='text-2xl font-bold'>Show</h1>
            <h4 className='text-gray-400'>28 Orders Found</h4>
          </div>
        </div>

        <div className='flex items-center'>
          <IoMdNotifications size={24} className={`cursor-pointer `} />
          <FaSearch size={22} className={`ml-3 cursor-pointer `} />
          <img src={Person} alt="User" className='w-9 h-9 rounded-full ml-4 cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default Header;
