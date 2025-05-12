import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import callAction from "../../assets/call-action-img.jpg";
import callActionbg from "../../assets/call-action-bg.jpg";
import { LuMessagesSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Info = ({ changeLanguage }) => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <div
    className={`pt-20 my-20 pb-16 flex flex-col lg:flex-row justify-between items-center gap-12 bg-cover bg-center px-5 max-w-screen-xl mx-auto ${
      isArabic ? "rtl" : ""
    }`}
    style={{
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${callActionbg})`,
    }}
  >
    {/* Left Section */}
    <div ref={ref} className={`text-white ${isArabic ? "text-right" : "text-left"} w-full lg:w-1/2`}>
      <img
        src={callAction}
        alt="Ask AAU"
        className={`${isArabic ? "ml-auto" : "mr-auto"} rounded-lg shadow-lg`}
      />
      <div className="flex flex-wrap justify-around items-center mt-8 gap-y-8 gap-x-16">
        {/* Counters */}
        {/* ... نفس الكود السابق */}
      </div>
    </div>
  
    {/* Right Section */}
    <div className={`max-w-lg ${isArabic ? "text-right" : "text-left"} w-full lg:w-1/2`}>
      <div className={`flex justify-center items-center w-24 h-24 rounded-full bg-main mx-auto lg:mx-0`}>
        <LuMessagesSquare className="text-white text-4xl animate-bounce" />
      </div>
      <a href="tel:+962782407533" className="text-3xl text-white font-extrabold mt-6 block">
      +962782407533
      </a>
      <p className="text-white text-lg mt-4 leading-relaxed">
        {t("call_to_action_paragraph")}
      </p>
      <Link to="/Home/Registration">
        <button className="bg-white px-6 py-3 mt-6 text-main font-bold rounded-lg shadow-md hover:bg-blue-700 hover:text-white transition-all duration-300">
          {t("join_now")}
        </button>
      </Link>
      <div className="mt-9 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-extrabold">{t("need_help")}</h1>
        <p className="text-gray-700 mt-3 leading-relaxed">
          {t("need_help_paragraph")}
        </p>
      </div>
    </div>
  </div>
  );
};

export default Info;
