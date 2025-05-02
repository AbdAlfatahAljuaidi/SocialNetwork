import React, { useEffect, useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './Menu';
import { IoIosNotifications } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import {
 
  FaSignOutAlt,
} from "react-icons/fa";

const Nav = ({setActive }) => {
  const [userName, setUserName] = useState('');
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // تغيير اللغة عند الضغط على الزر
  };


  const notifications = [
    {
      id: 1,
      name: 'Ahmad Khaled',
      time: 'منذ 5 دقائق',
      message: 'علق على منشورك.',
      image: 'https://via.placeholder.com/40', // ضع رابط صورة الشخص
    },
    {
      id: 2,
      name: 'Sara N.',
      time: 'منذ ساعة',
      message: 'أرسلت لك رسالة جديدة.',
      image: 'https://via.placeholder.com/40',
    },
  ];

  // useEffect(() => {
  //   // تغيير اتجاه الصفحة بناءً على اللغة
  //   document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  // }, [i18n.language]);


  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser);
    }
  }, []);

  const navigate = useNavigate();

  function signout() {
    localStorage.removeItem("user");
    navigate("/Home/Registration");
  }

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className='sticky top-0 z-50 ' >
      <div className="sticky top-0 z-50 flex justify-between  items-center py-4 px-8 bg-white shadow-md flex-wrap sm:flex-nowrap">
        {/* زر القائمة (يظهر فقط عند الشاشات الصغيرة) */}
        <button 
          className="text-2xl text-gray-700 sm:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>

        {/* Logo */}
        <div className="font-bold text-2xl  sm:text-3xl w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0" style={{color:color}}>
        <Link to={'/Index'}> Ask AAU </Link> 
        </div>

        {/* <div className="flex space-x-2 rtl:space-x-reverse mt-4">
  <button
    onClick={() => changeLanguage("en")}
    className={`px-4 py-2 rounded-md border transition 
      ${i18n.language === 'en' 
        ? 'bg-[#0078B8] text-white' 
        : 'bg-white text-[#0078B8] border-[#0078B8] hover:bg-[#0078B8] hover:text-white'}`}
  >
    English
  </button>
  <button
    onClick={() => changeLanguage("ar")}
    className={`px-4 py-2 rounded-md border transition 
      ${i18n.language === 'ar' 
        ? 'bg-[#0078B8] text-white' 
        : 'bg-white text-[#0078B8] border-[#0078B8] hover:bg-[#0078B8] hover:text-white'}`}
  >
    العربية
  </button>
</div> */}
        {/* Search */}
        <div className="relative w-full sm:w-auto mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search by poster's name"
            onChange={(e)=> setUsername(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 pl-12 text-gray-700 bg-gray-100 border border-gray-300 rounded-full "
          />
         <Link to={`/search/${username}`}> <FaSearch className="absolute left-4 top-2/4 transform -translate-y-2/4 text-gray-500" /></Link>
        </div>

      

        {/* User Info & Signout */}
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-center sm:justify-start">

  {/* Notification */}
  <div className="relative">
      {/* زر الإشعارات */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer relative">
        <IoIosNotifications className="text-2xl text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {notifications.length}
          </span>
        )}
      </div>

      {/* قائمة الإشعارات */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b font-bold text-gray-700">Notifications</div>
          {notifications.map((notif) => (
            <div key={notif.id} className="flex items-start gap-3 p-4 border-b hover:bg-gray-50">
              <img src={notif.image} alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-semibold">{notif.name}</div>
                <div className="text-sm text-gray-500">{notif.time}</div>
                <div className="text-sm text-gray-700">{notif.message}</div>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="p-4 text-sm text-gray-500 text-center">No Notifictions yet   </div>
          )}
        </div>
      )}
    </div>

          <button 
            onClick={signout} 
            className="text-white border flex items-center justify-center gap-2 py-2 px-6 rounded-lg  transition-all duration-200 w-full sm:w-auto mb-4 sm:mb-0 sm:px-6 sm:py-2" style={{background:color}}>
           <FaSignOutAlt />  {t('Logout')}
          </button>



          <Link to={'/Index/Profile'}> 
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center  font-bold text-xl"  style={{color:color}}>
          
          
            {userName && userName.Name ? userName.Name[0].toUpperCase() : 'U'}
          </div>
           </Link> 
        </div>
      </div>

      {/* القائمة الجانبية */}
      <div className={`fixed top-0 left-0 w-72 h-full bg-white shadow-xl z-50 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 sm:hidden`}>
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} setActiveSection={setActive}  />
      </div>

      {/* Overlay عند فتح القائمة الجانبية */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Nav;
