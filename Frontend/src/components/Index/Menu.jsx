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

  
  const { t } = useTranslation();
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
        navigate("/Index/Profile/Update");
      }
    }

    sendReq();
  }, [userName.token]);

  // التحقق من البريد الإلكتروني عند بدء المكون
  const isDashboardVisible = user?.admin === true;

  return (
    <div
      className={`bg-white sticky top-24 mt-5 ml-5 py-4 pr-14 pl-5 rounded-xl shadow-lg h-full sm:h-[80vh] sm:flex flex-col justify-between ${
        menuOpen ? "block" : "hidden"
      } relative`}
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
              className="w-full h-full rounded-full object-cover "
            />
          ) : (
            userName?.Name?.charAt(0)?.toUpperCase() || "U"
          )}
        </div>

        <div className="md:ml-3">
          <h1 className="font-semibold text-lg text-center md:text-left">
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
            <li className="flex items-center space-x-3 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition duration-200">
              <div className="text-xl">
                <FaHome />
              </div>
              <span>{t('Home')}</span>
            </li>
          </Link>
<Link to={"/index"}>
          <li
            className="flex items-center space-x-3 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition duration-200"
          >
            <div className="text-xl">
              <BsFillSignpostSplitFill />
            </div>
            <span>Posts</span>
          </li>
          </Link>

<Link to={"/OfficialPosts"}>
          <li
         
            className="flex items-center space-x-3 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition duration-200"
          >
            <div className="text-xl">
              <BsFillSignpostSplitFill />
            </div>
            <span>Official Posts</span>
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
 <li className="flex items-center space-x-3 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition duration-200">
   <div className="text-xl">
   <IoChatbubbleEllipses />
   </div>
   <span>Chat</span>
 </li>
</Link>
          )}



          <Link to="/Bookmarks">
            <li className="flex items-center space-x-3 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition duration-200">
              <div className="text-xl">
                <FaBookmark />
              </div>
              <span>Bookmarks</span>
            </li>
          </Link>

          <Link to="/analytics">
            <li className="flex items-center space-x-3 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition duration-200">
              <div className="text-xl">
                <FaChartBar />
              </div>
              <span>My Posts</span>
            </li>
          </Link>

         

          <Link to="/Theme">
            <li className="flex items-center space-x-3 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition duration-200">
              <div className="text-xl">
                <FaPalette />
              </div>
              <span>Theme</span>
            </li>
          </Link>

          <Link to="/Help">
            <li className="flex items-center space-x-3 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition duration-200">
              <div className="text-xl">
                <FaHandsHelping />
              </div>
              <span>Help & Feedback</span>
            </li>
          </Link>

          {isDashboardVisible && (
            <Link to="/index/dashboard">
              <li className="flex items-center space-x-3 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition duration-200">
                <div className="text-xl">
                  <CiViewTable />
                </div>
                <span>Dashboard</span>
              </li>
            </Link>
          )}
        </ul>
      </nav>

      {/* زر القائمة */}
      <div
        className="flex items-center space-x-2 text-white hover:text-white px-4 py-2 rounded-lg  transition duration-200"
        style={{
          background: color, // تغيير اللون فقط للعنصر
        }}
        onMouseEnter={() => setIsHovered(true)} // تفعيل الـ hover
        onMouseLeave={() => setIsHovered(false)} // إلغاء التفعيل عند الخروج
      >
        <FaBars className="text-xl" />
        <span>Menu</span>
      </div>
    </div>
  );
};

export default Menu;
