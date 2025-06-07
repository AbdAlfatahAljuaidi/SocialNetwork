import React, { useEffect, useState } from "react";
import Nav from "../Index/Nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheck, FaLocationDot } from "react-icons/fa6";
import { FaPhone, FaUserGraduate } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";

import { useTranslation } from "react-i18next";
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Introductory = () => {
  const [color, setColor] = useState(
    localStorage.getItem("mainColor") || "#1D4ED8"
  );
const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [Profile, setProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function sendReq() {
      try {
        const { data } = await axios.get(`${apiUrl}/User/GetProfile`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const profileData = data.getProfile;

        if (
          !profileData[0] ||
          !profileData[0].Age ||
          profileData[0].Age === ""
        ) {
          navigate("/Index/Profile/Update");
          return;
        }

        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile Info:", error);
        navigate("/Index/Profile/Update");
      }
    }

    sendReq();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="max-w-4xl mx-auto space-y-8">
      {/* My Profile Section */}
      <div className="bg-white p-8 rounded-2xl shadow">
        <div className="md:flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{t("profile.myProfile")}</h1>
          {Profile && Profile.length > 0 &&
            Profile.map((profile) => (
              <Link
                key={profile._id}
                to={`/Index/Profile/Edit/${profile._id}`}
                className="flex items-center text-white px-4 py-2 text-sm rounded-lg shadow mt-5 md:mt-0"
                style={{ background: color }}
              >
                <FaCheck className="mx-2 mt-1 " />
                {t("profile.edit")}
              </Link>
            ))}
        </div>
  
        {Profile && Profile.length > 0 ? (
          Profile.map((profile, index) => (
            <div key={index} className="md:flex bg-gray-50 rounded-xl shadow-inner items-center">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 p-4 md:p-6 w-full mb-4">
                <div>
                  {profile.imageUrl ? (
                    <img
                      src={profile.imageUrl}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover shadow"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
                      {t("profile.noImage")}
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-800 text-center md:text-left">
                    {profile.username}
                  </p>
                  <div className="flex items-center justify-center md:justify-start mt-2">
                    <FaUserGraduate className="" />
                    <p className="text-gray-600 ml-2 text-center mx-2">{profile.major}</p>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <FaLocationDot />
                    <p className="text-gray-500 ml-2 mx-2">{profile.Address}</p>
                  </div>
                </div>
              </div>
  
              <div className="px-6 mr-6">
                <h1 className="text-2xl font-bold text-center">{t("profile.points")}</h1>
                <h3 className="text-center text-2xl text-gray-500">{profile.point}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">{t("profile.loadingProfile")}</p>
        )}
      </div>
  
      {/* Personal Info Section */}
      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          {t("profile.personalInfo")}
        </h2>
  
        {Profile && Profile.length > 0 ? (
          Profile.map((profile, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center">
                  <FaUserGraduate />
                  <p className="text-lg ml-2 text-black mx-2">{t("profile.major")}</p>
                </div>
                <p className="text-md text-gray-400 font-medium">
                  {profile.major || t("profile.na")}
                </p>
              </div>
  
              <div>
                <div className="flex items-center">
                  <FaUserGraduate />
                  <p className="text-lg ml-2 text-black mx-2">{t("profile.gender")}</p>
                </div>
                <p className="text-md text-gray-400 font-medium ">
                  {profile.Gender || t("profile.notSpecified")}
                </p>
              </div>
  
              <div>
                <div className="flex items-center">
                  <FaPhone />
                  <p className="text-lg ml-2 text-black mx-2">{t("profile.phone")}</p>
                </div>
                <p className="text-md text-gray-400 font-medium">
                  {profile.Phone || t("profile.na")}
                </p>
              </div>
  
              <div>
                <div className="flex items-center">
                  <BsCalendar2DateFill />
                  <p className="text-lg ml-2 text-black mx-2">{t("profile.age")}</p>
                </div>
                <p className="text-md text-gray-400 font-medium">
                  {profile.Age}
                </p>
              </div>
  
              <div>
                <div className="flex items-center">
                  <BsCalendar2DateFill />
                  <p className="text-lg ml-2 text-black mx-2">{t("profile.firstYear")}</p>
                </div>
                <p className="text-md text-gray-400 font-medium">
                  {profile.year}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">{t("profile.loadingPersonalInfo")}</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default Introductory;
