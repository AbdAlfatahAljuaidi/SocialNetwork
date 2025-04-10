import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // تبديل حالة القائمة
  };

  return (
    <div className="sticky top-0 z-50 flex justify-around items-center py-8 px-4 bg-white shadow-md">
      {/* الشعار */}
      <div>
        <h1 className="text-main text-2xl font-bold cursor-pointer">
        ASK <span className="text-black">AAU</span>
        </h1>
      </div>

      {/* شريط التنقل للـ Desktop */}
      <nav className="hidden lg:flex">
        <ul className="flex text-lg">
          <li className="ml-7 hover:text-blue-700 transition-all duration-300">
            <a href="#Home">Home</a>
          </li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300">
            <a href="#About">About</a>
          </li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300">
            <a href="#Service">Service</a>
          </li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300">
            <a href="#Approach">Approach</a>
          </li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300">
            <a href="#Opinion">Opinion</a>
          </li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300">
            <a href="#Contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* زر الـ Register للـ Desktop */}
      <div className="hidden lg:flex">
        <button className="bg-main rounded-lg text-white px-8 py-2 hover:bg-main hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
          <Link to="/Home/Registration">Register</Link>
        </button>
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
          onClick={toggleMenu} // يغلق القائمة عند النقر خارجها
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-72"
            onClick={(e) => e.stopPropagation()} // يمنع إغلاق القائمة عند النقر داخلها
          >
            <ul className="text-center text-lg">
              <li className="py-2 hover:text-blue-700">
                <a href="#Home" onClick={toggleMenu}>Home</a>
              </li>
              <li className="py-2 hover:text-blue-700">
                <a href="#About" onClick={toggleMenu}>About</a>
              </li>
              <li className="py-2 hover:text-blue-700">
                <a href="#Service" onClick={toggleMenu}>Service</a>
              </li>
              <li className="py-2 hover:text-blue-700">
                <a href="#Approach" onClick={toggleMenu}>Approach</a>
              </li>
              <li className="py-2 hover:text-blue-700">
                <a href="#Opinion" onClick={toggleMenu}>Opinion</a>
              </li>
              <li className="py-2 hover:text-blue-700">
                <a href="#Contact" onClick={toggleMenu}>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
