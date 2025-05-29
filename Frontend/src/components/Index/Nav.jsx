import React, { useEffect, useState } from 'react';
import { FaSearch, FaBars, FaChevronDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './Menu';
import { IoIosNotifications } from "react-icons/io";
import { useTranslation } from 'react-i18next';



const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
import {
 
  FaSignOutAlt,
} from "react-icons/fa";
import axios from 'axios';

const Nav = ({setActive }) => {
  const [userName, setUserName] = useState('');
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsToShow, setNotificationsToShow] = useState(5); 
  const [open, setOpen] = useState(false);
  
  const [notifications, setNotification] = useState([]);

   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // تغيير اللغة عند الضغط على الزر
  };

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

  const handleOpen = async () => {
    setIsOpen(!isOpen);
  
    if (!isOpen) {
      console.log("الاسم المستخدم لإرسال الطلب:", user.Name);

      try {
        await axios.put(`${apiUrl}/readNoti`, {
          username: user.Name,
        });
        const { data } = await axios.post(`${apiUrl}/notifications`,{
          username: user.Name,
        });
        setNotification(data.notifications);
        console.log("data.notifications",data.notifications);
        
      } catch (err) {
        console.error("خطأ أثناء تحديث الإشعارات:", err);
      }
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.post(`${apiUrl}/notifications`,{
          username:user.Name,
        });
        setNotification(data.notifications);
      } catch (err) {
        console.error("خطأ في جلب الإشعارات:", err);
      }
    };
  
    fetchNotifications();
  }, []);




  
  const unreadCount = notifications.filter(n => !n.isRead).length;

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
        <Link to={'/Index'}> {t('ask_aau')} </Link> 
        </div>

       
        {/* Search */}
        <div className="relative w-full sm:w-auto mb-4 sm:mb-0">
          <input
            type="text"
            placeholder={t('search_by_poster_name')}
            onChange={(e)=> setUsername(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 pl-12 text-gray-700 bg-gray-100 border border-gray-300 rounded-full "
          />
         <Link to={`/search/${username}`}> <FaSearch className="absolute left-4 top-2/4 transform -translate-y-2/4 text-gray-500" /></Link>
        </div>

      

        {/* User Info & Signout */}
        <div dir="ltr"  className="flex md:flex-row flex-row-reverse items-center space-x-4  w-full sm:w-auto justify-center sm:justify-start">
        <div className="hidden md:inline-block  relative text-left ">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center px-4 py-2  rounded-md  bg-white  transition" style={{color:color}}
      >
        {t('language')} <FaChevronDown className="ml-2" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg">
          <button
            onClick={() => {
              changeLanguage('en');
              setOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 text-sm ${
              i18n.language === 'en' ? 'bg-black text-white' : 'hover:bg-gray-100'
            }`}
          >
            English
          </button>
          <button
            onClick={() => {
              changeLanguage('ar');
              setOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 text-sm ${
              i18n.language === 'ar' ? 'bg-black text-white' : 'hover:bg-gray-100'
            }`}
          >
            العربية
          </button>
        </div>
      )}
    </div>
        <div className="relative  ">
  {/* زر الإشعارات */}
  <div onClick={handleOpen} className="cursor-pointer relative">
    <IoIosNotifications className="text-2xl text-gray-700 ml-4" />
    {unreadCount > 0 && (
      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
        {unreadCount}
      </span>
    )}
  </div>

  

  {/* قائمة الإشعارات */}
  {isOpen && (
    <div  className="  absolute mt-2 w-80 max-w-xs bg-white shadow-lg rounded-lg z-50 max-h-96 overflow-y-auto sm:left-0 sm:left-auto right-0">
      <div className="p-4 border-b  font-bold text-gray-700">{t('notifications')}</div>
      {notifications.slice(0, notificationsToShow).map((notif) => (
        <div
          key={notif._id}
          className={`flex items-start gap-3 p-4 border-b hover:bg-gray-50 ${
            notif.isRead ? "bg-white" : "bg-blue-50"
          }`}
        >
          <img src={notif.profileImage} alt="User" className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-semibold">{notif.username}</div>
            <div className="text-sm text-gray-500">
            {new Date(notif.createdAt).toLocaleString('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
 
})}
            </div>
            <div className="text-sm text-gray-700">{notif.message}</div>
          </div>
        </div>
      ))}
      {notifications.length === 0 && (
        <div className="p-4 text-sm text-gray-500 text-center">{t('no_notifications_yet')}</div>
      )}
      {notifications.length > notificationsToShow && (
        <button
          onClick={() => setNotificationsToShow(notificationsToShow + 5)}
          className="w-full py-2 bg-blue-500 text-white rounded-b-lg"
        >
          {t('show_more')}
        </button>
      )}
    </div>
  )}
</div>

          <button 
            onClick={signout} 
            className="text-white border md:mt-0 mt-4 mr-5 flex items-center justify-center gap-2  py-2 px-3 rounded-lg  transition-all duration-200 w-52 md:w-full mx-auto mb-4 sm:mb-0 sm:px-6 sm:py-2" style={{background:color}}>
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
