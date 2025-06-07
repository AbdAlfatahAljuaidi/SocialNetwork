import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaCompass,
  FaBell,
  FaEnvelope,
  FaBookmark,
  FaChartBar,
  FaPalette,
  FaBars,
  FaTimes,
  FaHandsHelping,
} from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { BsChat, BsFillSignpostSplitFill } from "react-icons/bs";
import { IoChatbubbleEllipses } from "react-icons/io5";
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

import { useTranslation } from 'react-i18next';

const Menu = ({ menuOpen, setMenuOpen, setActiveSection, isSticky ,changeLanguage   }) => {
  const [userName, setUserName] = useState("");
  const [Profile, setProfile] = useState();
  const navigate = useNavigate();
  const [color, setColor] = useState(
    localStorage.getItem("mainColor") || "#1D4ED8"
  );
  const [isHovered, setIsHovered] = useState(false);

  
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser);
    }
  }, []);

  useEffect(() => {
    async function sendReq() {
      if (!userName?.token) return; // تأكد أن `userName.token` موجود
      try {
        const { data } = await axios.get(`${apiUrl}/User/GetProfile`, {
          headers: { Authorization: `Bearer ${userName.token}` },
        });

        if (!data.getProfile.length || !data.getProfile[0]?.Age) {
          return;
        }
        setProfile(data.getProfile[0]); // تخزين أول عنصر فقط لأنه ليس مصفوفة
      } catch (error) {
        console.error("Error fetching profile Info:", error);
        // navigate("/Index/Profile/Update");
      }
    }

    sendReq();
  }, [userName.token]);

  // التحقق من البريد الإلكتروني عند بدء المكون
  const isDashboardVisible = user?.admin === true;

  return (
    <div
    className={`bg-white sticky top-36  mt-5 mx-5 py-4 rounded-xl shadow-lg h-full  sm:flex flex-col justify-between relative
      ${menuOpen ? "block" : "hidden"}
      ${i18n.language === 'en' ? "pr-14 pl-5" : "pr-5 pl-14"}`}
    
    >
      {/* زر الإغلاق (X) */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-200 text-2xl flex  md:hidden"
        onClick={() => setMenuOpen(false)}
      >
        <FaTimes />
      </button>

      {/* معلومات المستخدم */}
      <Link to={"/Index/Profile"}>
      <div className="md:flex   items-center mb-3">
    
        <div
          className="w-14 h-14 bg-blue-50 rounded-full flex justify-center items-center mx-auto md:mx-0  font-bold text-2xl"
          style={{ color: color }}
        >
          {Profile && Profile.imageUrl ? (
            <img
              src={Profile.imageUrl}
              alt=""
              className="w-full h-full rounded-full object-cover  "
            />
          ) : (
            userName?.Name?.charAt(0)?.toUpperCase() || "U"
          )}
        </div>

        <div className="md:ml-3 mx-3">
          <h1 className="font-semibold text-lg text-center ">
          {userName.Name || "Username"}
          </h1>
          <span className="text-gray-400 block w-fit mx-auto md:mx-0">
            {userName.Email || "username"}
          </span>
        </div>
      </div>
        </Link>

      {/* القائمة */}
      <nav>
        <ul className="space-y-2">
          <Link to="/home">
            <li className="flex items-center space-x-3 text-gray-700  py-2 rounded-lg cursor-pointer transition duration-200">
              <div className="text-xl">
                <FaHome className="mx-1" />
              </div>
              <span className="">{t('Home')}</span>
            </li>
          </Link>
<Link to={"/index"}>
          <li
            className="flex items-center space-x-3 text-gray-700  py-2 rounded-lg cursor-pointer transition duration-200"
          >
            <div className="text-xl">
              <BsFillSignpostSplitFill className="mx-1" />
            </div>
            <span>{t('posts')}</span>
          </li>
          </Link>

<Link to={"/OfficialPosts"}>
          <li
         
            className="flex items-center space-x-3 text-gray-700  py-2 rounded-lg cursor-pointer transition duration-200"
          >
            <div className="text-xl">
              <BsFillSignpostSplitFill className="mx-1" />
            </div>
            <span>{t('official_posts')}</span>
          </li>
          </Link>
          {/* <Link to="/Bookmarks">
            <li className='flex items-center space-x-3 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition duration-200'>
              <div className='text-xl'><FaBell /></div>
              <span>Notification</span>
            </li>
          </Link>

          <Link to="/Bookmarks">
            <li className='flex items-center space-x-3 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition duration-200'>
              <div className='text-xl'><FaEnvelope /></div>
              <span>Message</span>
            </li>
          </Link> */}

          {user.profileImage && (
 <Link to="/Chat">
 <li className="flex items-center space-x-3 text-gray-700  py-2 rounded-lg cursor-pointer transition duration-200">
   <div className="text-xl">
   <IoChatbubbleEllipses className="mx-1" />
   </div>
   <span>{t('chat')}</span>
 </li>
</Link>
          )}



          <Link to="/Bookmarks">
            <li className="flex items-center space-x-3 text-gray-700  py-2 rounded-lg cursor-pointer transition duration-200">
              <div className="text-xl">
                <FaBookmark className="mx-1" />
              </div>
              <span>{t('bookmarks')}</span>
            </li>
          </Link>

          <Link to="/analytics">
            <li className="flex items-center space-x-3 text-gray-700  py-2 rounded-lg cursor-pointer transition duration-200">
              <div className="text-xl">
                <FaChartBar className="mx-1" />
              </div>
              <span>{t('my_posts')}</span>
            </li>
          </Link>

         

          <Link to="/Theme">
            <li className="flex items-center space-x-3 text-gray-700  py-2 rounded-lg cursor-pointer transition duration-200">
              <div className="text-xl">
                <FaPalette className="mx-1" />
              </div>
              <span>{t('theme')}</span>
            </li>
          </Link>

          <Link to="/Help">
            <li className="flex items-center space-x-3 text-gray-700  py-2 rounded-lg cursor-pointer transition duration-200">
              <div className="text-xl">
                <FaHandsHelping className="mx-1" />
              </div>
              <span>{t('help_feedback')}</span>
            </li>
          </Link>

          {isDashboardVisible && (
            <Link to="/index/dashboard">
              <li className="flex items-center space-x-3 text-gray-700 py-2 rounded-lg cursor-pointer transition duration-200">
                <div className="text-xl">
                  <CiViewTable className="mx-1" />
                </div>
                <span>{t('dashboard')}</span>
              </li>
            </Link>
          )}
        </ul>
      </nav>

     
    </div>
  );
};

export default Menu;
