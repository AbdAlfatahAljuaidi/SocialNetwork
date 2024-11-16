import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // toggle menu visibility
  };

  return (
    <div className="sticky top-0 z-50 flex justify-around items-center py-8 px-4 bg-white shadow-md">
      {/* الشعار */}
      <div>
        <h1 className="text-main text-2xl font-bold cursor-pointer">
          MR <span className="text-black">ERROR</span>
        </h1>
      </div>

      {/* شريط التنقل للـ Desktop */}
      <nav className="hidden lg:flex">
        <ul className="flex text-lg">
          <li className="ml-7 hover:text-blue-700 transition-all duration-300"><a href="#home">Home</a></li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300"><a href="#about">About</a></li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300"><a href="#service">Service</a></li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300"><a href="#features">Features</a></li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300"><a href="#articles">Articles</a></li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300"><a href="#pricing">Pricing</a></li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300"><a href="#reviews">Reviews</a></li>
          <li className="ml-7 hover:text-blue-700 transition-all duration-300"><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* أزرار الـ Register و Log in للـ Desktop */}
      <div className="hidden lg:flex">
        <button className="bg-main rounded-lg text-white px-5 py-1 hover:bg-main hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
          Register
        </button>
        <button className="bg-main rounded-lg ml-2 text-white px-5 py-1 hover:bg-main hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
          Log in
        </button>
      </div>

      {/* زر الـ Hamburger للـ Mobile */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-main text-3xl">
          {isMenuOpen ? 'X' : '☰'}
        </button>
      </div>

      {/* القائمة المنبثقة للـ Mobile */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-40 transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        }`}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-72">
          <ul className="text-center text-lg">
            <li className="py-2 hover:text-blue-700"><a href="#home">Home</a></li>
            <li className="py-2 hover:text-blue-700"><a href="#about">About</a></li>
            <li className="py-2 hover:text-blue-700"><a href="#service">Service</a></li>
            <li className="py-2 hover:text-blue-700"><a href="#features">Features</a></li>
            <li className="py-2 hover:text-blue-700"><a href="#articles">Articles</a></li>
            <li className="py-2 hover:text-blue-700"><a href="#pricing">Pricing</a></li>
            <li className="py-2 hover:text-blue-700"><a href="#reviews">Reviews</a></li>
            <li className="py-2 hover:text-blue-700"><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
