import React from 'react';
import { FaLightbulb } from "react-icons/fa";
import ProcessImg from '../../assets/Process.png';
import { useTranslation } from "react-i18next";

const Process = ({changeLanguage}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <div className="pt-32 pb-16 px-5 bg-gray-50" id="Approach">
    <div className="text-center mb-16">
      <h1 className="text-2xl font-semibold text-blue-500 uppercase tracking-wider">
        {t("our_approach")}
      </h1>
      <h1 className="text-5xl font-extrabold text-gray-800 mt-4">
        <span className="text-blue-500">{t("step_by_step_process").split(" ")[0]}</span>{" "}
        {t("step_by_step_process").split(" ").slice(1).join(" ")}
      </h1>
      <p className="text-gray-600 mt-4 max-w-xl mx-auto text-lg">
        {t("approach_description")}
      </p>
    </div>

    <div className="flex justify-center items-center mt-8 relative">
      <div className="w-32 h-1 bg-blue-300 relative">
        <div className="absolute top-[-5px] left-0 w-3 h-3 bg-main rounded-full animate-moving-circle"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-16">
      <div className="flex flex-col items-center text-center max-w-sm mx-auto">
        <div className="flex justify-center items-center bg-main h-24 w-24 rounded-full shadow-lg relative">
          <FaLightbulb className="text-white text-4xl" />
        </div>
        <h2 className="mt-10 font-bold text-xl text-gray-800">{t("post_question")}</h2>
        <p className="mt-4 text-gray-600">{t("post_question_description")}</p>
      </div>

      <div className="flex flex-col items-center text-center max-w-sm mx-auto">
        <img src={ProcessImg} alt="Process Step" className="w-48 h-auto mb-6" />
        <h2 className="font-bold text-xl text-gray-800">{t("collaborate_learn")}</h2>
        <p className="mt-4 text-gray-600">{t("collaborate_learn_description")}</p>
      </div>

      <div className="flex flex-col items-center text-center max-w-sm mx-auto">
        <div className="flex justify-center items-center bg-main h-24 w-24 rounded-full shadow-lg relative">
          <FaLightbulb className="text-white text-4xl" />
        </div>
        <h2 className="mt-10 font-bold text-xl text-gray-800">{t("gain_knowledge")}</h2>
        <p className="mt-4 text-gray-600">{t("gain_knowledge_description")}</p>
      </div>
    </div>
  </div>
  );
};

export default Process;
