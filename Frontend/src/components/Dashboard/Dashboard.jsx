// Dashboard.js
import React, { useState } from 'react';
import SideMenu from './SideMenu';
import Header from './Header';
import Table from './Table';
import OpinionTable from "./OpinionTable";
import PostsTable from "./PostsTable";
import ProfileTable from "./ProfileTable";
import SuggestionTable from './SuggestionTable';
import Nav from '../Index/Nav';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Users"); // المكون الافتراضي

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // دالة لتغيير المكون المعروض
  const renderComponent = () => {
    switch (selectedComponent) {
      case "Users":
        return <Table />;
      case "Opinion":
        return <OpinionTable />;
      case "Posts":
        return <PostsTable />;
      case "Profile":
        return <ProfileTable />;
      case "SuggestionTable":
        return <SuggestionTable />;
      default:
        return <Table />;
    }
  };

  return (
    <div className="relative">
      <Nav />
      <div className="md:flex">
        {/* إضافة خاصية يتم تغييرها بناءً على whether the menu is open */}
        <SideMenu isOpen={isMenuOpen} setSelectedComponent={setSelectedComponent} />
        
        {/* المحتوى الأساسي */}
        <div className={`flex-1 p-4 transition-all duration-300 ${isMenuOpen ? "ml-64" : ""}`}>
          {/* عرض المكون هنا */}
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
