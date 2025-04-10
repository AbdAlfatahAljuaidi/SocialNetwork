// Profile.js
import React, { useState } from 'react';
import Nav from '../Index/Nav';

import Information from './Information';
import Introductory from './Introductory';
import Menu from './Menu';
import Notifications from './Notifications';
import Friends from './Friends';
import Settings from './Settings';

const Profile = () => {
  const [activePage, setActivePage] = useState("");
  const color = localStorage.getItem("mainColor") || "#1D4ED8";

  const renderPage = () => {
    switch (activePage) {
      case "Introductory":
        return <Introductory />;
      case "Notifications":
        return <Notifications />;
        case "Friends":
          return <Friends />;
        case "Settings":
          return <Settings />;
      // أضف المزيد حسب الحاجة
      default:
        return <Introductory />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <Nav />
      <div className="max-w-7xl mx-auto p-5 md:flex">
        <Menu activePage={activePage} setActivePage={setActivePage} color={color} />
        <main className="flex-1 bg-white p-6 rounded-2xl shadow-md mt-10 md:mt-0">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Profile;
