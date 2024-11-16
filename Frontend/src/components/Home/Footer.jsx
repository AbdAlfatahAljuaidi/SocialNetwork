import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-main text-white py-12'>
      <div className='max-w-7xl mx-auto px-6'>
        
        {/* القسم العلوي: روابط الشركة */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          {/* روابط حول الشركة */}
          <div>
            <h2 className='text-xl font-semibold mb-4'>About Us</h2>
            <ul className='space-y-2'>
              <li><a href="#" className='hover:text-blue-400'>Our Story</a></li>
              <li><a href="#" className='hover:text-blue-400'>Mission & Vision</a></li>
              <li><a href="#" className='hover:text-blue-400'>Careers</a></li>
            </ul>
          </div>

          {/* خدمات */}
          <div>
            <h2 className='text-xl font-semibold mb-4'>Services</h2>
            <ul className='space-y-2'>
              <li><a href="#" className='hover:text-blue-400'>Web Development</a></li>
              <li><a href="#" className='hover:text-blue-400'>Mobile Apps</a></li>
              <li><a href="#" className='hover:text-blue-400'>Consulting</a></li>
            </ul>
          </div>

          {/* روابط التواصل */}
          <div>
            <h2 className='text-xl font-semibold mb-4'>Connect</h2>
            <ul className='space-y-2'>
              <li><a href="#" className='hover:text-blue-400'>Contact Us</a></li>
              <li><a href="#" className='hover:text-blue-400'>Support</a></li>
              <li><a href="#" className='hover:text-blue-400'>FAQs</a></li>
            </ul>
          </div>

          {/* التواصل الاجتماعي */}
          <div>
            <h2 className='text-xl font-semibold mb-4'>Follow Us</h2>
            <div className='flex space-x-4'>
              <a href="#" className='text-2xl hover:text-blue-400'>
                <FaFacebook />
              </a>
              <a href="#" className='text-2xl hover:text-blue-400'>
                <FaTwitter />
              </a>
              <a href="#" className='text-2xl hover:text-blue-400'>
                <FaInstagram />
              </a>
              <a href="#" className='text-2xl hover:text-blue-400'>
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* القسم السفلي: حقوق الطبع والنشر */}
        <div className='border-t border-white pt-8'>
          <p className='text-center text-sm text-white'>
            © 2024 MrError. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
