import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Navbar = ({changeLanguage}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // تبديل حالة القائمة
  };

  
  const { t ,i18n } = useTranslation();
  return (
    <div className="sticky top-0 z-50 flex justify-around items-center py-8 px-4 bg-white shadow-md">
      {/* الشعار */}
      <div>
        <h1 className="text-main text-2xl font-bold cursor-pointer">
          {t('ask_aau')} <span className="text-black"></span>
        </h1>
      </div>

      {/* شريط التنقل للـ Desktop */}
      <nav className="hidden lg:flex">
        <ul className="flex text-lg">
          <li className="ml-7 hover:text-blue-700 transition-all duration-300">
            <a href="#Home">{t('navbar.home')}</a>
          </li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300">
            <a href="#About">{t('navbar.about')}</a>
          </li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300">
            <a href="#Service">{t('navbar.service')}</a>
          </li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300">
            <a href="#Approach">{t('navbar.approach')}</a>
          </li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300">
            <a href="#Opinion">{t('navbar.opinion')}</a>
          </li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300">
            <a href="#Contact">{t('navbar.contact')}</a>
          </li>
        </ul>
      </nav>

      {/* زر الـ Register للـ Desktop */}
      <div className="hidden lg:flex">
        <Link to="/Home/Registration">
          <button className="bg-main rounded-lg text-white px-8 py-2 hover:bg-main hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
            {t('navbar.register')}
          </button>
        </Link>
      </div>

      {/* زر الـ Hamburger للـ Mobile */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-main text-3xl">
          {isMenuOpen ? "X" : "☰"}
        </button>
      </div>

      {/* القائمة المنبثقة للـ Mobile */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-40 transition-all duration-500 ease-in-out"
          onClick={toggleMenu}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-72"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="text-center text-lg">
              <li className="py-2 hover:text-blue-700">
                <a href="#Home" onClick={toggleMenu}>{t('navbar.home')}</a>
              </li>
              <li className="py-2 hover:text-blue-700">
                <a href="#About" onClick={toggleMenu}>{t('navbar.about')}</a>
              </li>
              <li className="py-2 hover:text-blue-700">
                <a href="#Service" onClick={toggleMenu}>{t('navbar.service')}</a>
              </li>
              <li className="py-2 hover:text-blue-700">
                <a href="#Approach" onClick={toggleMenu}>{t('navbar.approach')}</a>
              </li>
              <li className="py-2 hover:text-blue-700">
                <a href="#Opinion" onClick={toggleMenu}>{t('navbar.opinion')}</a>
              </li>
              <li className="py-2 hover:text-blue-700">
                <a href="#Contact" onClick={toggleMenu}>{t('navbar.contact')}</a>
              </li>
              <li className="py-2 hover:text-blue-700">
                <Link to="/Home/Registration">
                  <span onClick={toggleMenu}>{t('navbar.register')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
