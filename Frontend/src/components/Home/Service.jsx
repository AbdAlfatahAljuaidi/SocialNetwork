import React from "react";
import cardsData from '../Data/Data';
import { useTranslation } from 'react-i18next';

const Service = ({ changeLanguage }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div
      className={`pt-24 flex flex-col items-center px-6 bg-[#EFF2F7] pb-32 ${isArabic ? "text-right" : "text-left"}`}
      id="Service"
    >
      {/* العنوان الرئيسي */}
      <div className="text-center mb-16">
        <h1 className={`text-xl font-semibold uppercase tracking-wide text-blue-600`}>
          {t("services")}
        </h1>
        <h2 className="text-4xl sm:text-5xl font-extrabold mt-4 text-gray-900 leading-snug">
          {t("enhancing_student_learning")} <br />
          <span className="text-blue-500">{t("with_ask_aau")}</span>
        </h2>
        <p className={`text-lg mt-6 text-gray-600 max-w-3xl mx-auto ${isArabic ? "text-right" : "text-left"}`}>
          {t("ask_aau_description")}
        </p>
      </div>

      {/* الخط مع الدائرة المتحركة */}
      <div className="flex justify-center items-center relative">
        <div className="w-40 h-1 bg-blue-300 relative">
          <div className="absolute top-[-5px] left-0 w-4 h-4 bg-blue-500 rounded-full animate-moving-circle"></div>
        </div>
      </div>

      {/* البطاقات */}
      <div className="w-full max-w-7xl mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="group bg-white shadow-lg rounded-lg p-8 flex flex-col items-center relative transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="bg-blue-100 rounded-full mb-6 w-20 h-20 flex justify-center items-center text-blue-700 text-3xl">
                <card.icon />
              </div>
              <div className="text-center">
                <h2 className="font-bold text-xl mb-2 text-gray-800">
                  {card.title[isArabic ? "ar" : "en"]}
                </h2>
                <p className="text-base text-gray-600">
                  {card.description[isArabic ? "ar" : "en"]}
                </p>
              </div>
              <span className="absolute bottom-0 bg-blue-700 h-1 w-[80%] group-hover:w-full rounded-b-lg transition-all duration-300"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
