import React from 'react';
import { FaCheckCircle, FaCloud, FaHeadset, FaInfinity, FaShareAlt } from 'react-icons/fa';
import { useTranslation } from "react-i18next";

const Pricing = ({changeLanguage}) => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
  return (
    <div className="pt-24 pb-16 px-5 bg-[#EFF2F7]">
    <div className="text-center mb-9">
      <h1 className="text-2xl font-semibold text-blue-500 uppercase tracking-wider">{t("why_choose")}</h1>
      <h1 className="text-5xl font-extrabold text-gray-800 mt-4">
        <span className="text-blue-500">{t("enhancing")}</span> {t("your_learning_experience")}
      </h1>
      <p className="text-gray-600 mt-4 max-w-xl mx-auto text-lg">
        {t("why_choose_desc")}
      </p>
    </div>

    <div className="flex justify-center items-center mt-1 relative">
      <div className="w-32 h-1 bg-blue-300 relative">
        <div className="absolute top-[-5px] left-0 w-3 h-3 bg-main rounded-full animate-moving-circle"></div>
      </div>
    </div>

    <div className="w-[90%] m-auto mt-12 text-center text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 to-white border hover:shadow-2xl transition-shadow duration-300 relative">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">{t("card1_title")}</h1>
          <p className="text-gray-600 mt-4">{t("card1_desc")}</p>
        </div>

        <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 to-white border hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">{t("card2_title")}</h1>
          <p className="text-gray-600 mt-4">{t("card2_desc")}</p>
        </div>

        <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 to-white border hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">{t("card3_title")}</h1>
          <p className="text-gray-600 mt-4">{t("card3_desc")}</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Pricing;
