import React, { useState } from "react";
import {
  FaUsers,
  FaCommentDots,
  FaPenFancy,
  FaUserCircle,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  { id: "Users", label: "Users", icon: <FaUsers /> },
  { id: "Opinion", label: "Opinion", icon: <FaCommentDots /> },
  { id: "Posts", label: "Posts", icon: <FaPenFancy /> },
  { id: "Profile", label: "Profile", icon: <FaUserCircle /> },
  { id: "SuggestionTable", label: "Suggestion", icon: <FaChartBar /> },
];




const SideMenu = ({ setSelectedComponent }) => {
  const [active, setActive] = useState("Users");


  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  
  return (
    <div className="ml-2 md:w-64 bg-white h-[80vh] my-9 rounded-2xl shadow-2xl flex flex-col justify-between p-6">
      {/* البروفايل */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={user.profileImage} // صورة افتراضية
          alt="Profile"
          className="w-20 h-20 rounded-full mb-2 shadow-md"
        />
        <h2 className="text-lg font-semibold text-main">Welcome, {user.Name}</h2>
      </div>

      {/* عناصر القائمة */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setSelectedComponent(item.id);
                setActive(item.id);
              }}
              className={`relative flex items-center gap-4 text-lg font-medium px-5 py-3 rounded-xl cursor-pointer transition-all duration-300
                ${
                  active === item.id
                    ? "bg-main text-white shadow-md scale-105"
                    : "text-gray-700 hover:bg-main "
                }`}
            >
              {/* مؤشر جانبي للعنصر النشط */}
              {active === item.id && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-main rounded-full"></span>
              )}
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

    

      {/* الفوتر */}
      <footer className="text-center text-sm text-gray-400  pt-4 border-t border-gray-100 mt-4">
        <p>© 2025 Ask AAU</p>
      </footer>
    </div>
  );
};

export default SideMenu;
