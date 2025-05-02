import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Registration from "./components/Register/Registration";
import '../src/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Index from '../src/components/Index/Index';
import Profile from "./components/Profile/Profile";
import Update from "./components/Profile/Update";
import Edit from "./components/Profile/Edit";
import ResetPassword from "./components/Profile/ResetPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import EditUser from "./components/Dashboard/EditUser";
import Search from "./components/search/Search";
import UsersProfile from "./components/Profile/UsersProfile";
import Test from "./components/Test";
import Socket from "../Socket";
import Testt from "./components/Testt";
import Active from "./components/ActiveAccount/Active";
import Bookmarks from "./components/ExtraIndex/Bookmarks";
import Analytics from "./components/ExtraIndex/analytics";
import Theme from "./components/ExtraIndex/Theme";
import Help from "./components/ExtraIndex/Help";
import SuggestionTable from "./components/Dashboard/SuggestionTable";
import Notifications from './components/Profile/Notifications'
import Friends from "./components/Profile/Friends";
import Settings from "./components/Profile/Settings";
import PrivacyPolicy from "./components/Home/PrivacyPolicy";
import TermsConditions from "./components/Home/TermsConditions";
import ForgetPassword from "./components/Register/ForgetPassword";
import OfficialPosts from "./components/Index/OfficialPosts";
import IndexTwo from "./components/Index/FromAdmin"
import UpdateSuggest from "./components/Dashboard/UpdateSuggest";
import Top from "./components/Index/Top";
import TopComment from "./components/Index/TopComment";
import { useTranslation } from 'react-i18next';
import Nav from "./components/Index/Nav";
import UpdatePost from "./components/Index/UpdatePost";
import Video from "./components/Help/Video";
import TopFriend from "./components/Index/TopFriend";
import Chat from './components/Chat/Chat'
import ChatPharmacy from "./components/Chat/ChatPharmacy";


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    // تغيير اتجاه الصفحة بناءً على اللغة
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/search/:username" element={<Search />} />
        <Route path="/Home/Registration" element={<Registration setUser={setUser} />} />
        <Route path="/Home/Registration" element={<Registration setUser={setUser} />} />
        <Route 
          path="/index" 
          element={user ? <Index /> : <Navigate to="/Home/Registration" />} 
        />
        <Route path="/Index/Profile" element = {user ? <Profile /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Nav" element = {user ? <Nav  /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Index/Profile/Update" element = {user ? <Update /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Index/Profile/Edit/:id" element = {user ? <Edit /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Index/Profile/ResetPassword/:id" element = {user ? <ResetPassword /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Index/Dashboard" 
  element={user && user.admin ? <Dashboard /> : <Navigate to="/Home/Registration" />} 
/>

        <Route path="/EditUser/:id" element = {user ? <EditUser /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/index/profile/:username/:Name" element = {user ? <UsersProfile /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Test" element = {user ? <Test /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/" element = {user ? <Home /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Testt" element = {user ? <Testt /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Bookmarks" element = {user ? <Bookmarks /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Analytics" element = {user ? <Analytics /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Theme" element = {user ? <Theme /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Help" element = {user ? <Help /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/SuggestionTable" element = {user ? <SuggestionTable /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Notifications" element = {user ? <Notifications /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Friends" element = {user ? <Friends /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Settings" element = {user ? <Settings /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/OfficialPosts" element = {user ? <IndexTwo /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/UpdateSuggest/:id" element = {user ? <UpdateSuggest /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Top" element = {user ? <Top /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/TopComment" element = {user ? <TopComment /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/UpdatePost/:id" element = {user ? <UpdatePost /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/TopFriend" element = {user ? <TopFriend /> : <Navigate to="/Home/Registration" /> }/>
        <Route path="/Video" element =  {<Video />}/>
        <Route path="/Chat" element =  {<Chat />}/>
        <Route path="/ChatPharmacy" element =  {<ChatPharmacy />}/>
        
        <Route path="/activeAccount/:token" element ={<Active />}  />
        <Route path="/PrivacyPolicy" element ={<PrivacyPolicy />}  />
        <Route path="/Terms & Conditions" element ={<TermsConditions />}  />
        <Route path="/ForgetPassword" element ={<ForgetPassword />}  />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
