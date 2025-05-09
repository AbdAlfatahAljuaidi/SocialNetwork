import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { UserContext } from './Form';
import {useNavigate } from "react-router-dom";

import { useTranslation } from 'react-i18next';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Opinion = ({changeLanguage}) => {   
  const [Allopinions, setAllOpinions] = useState([]);
  const opinion = useContext(UserContext);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [isRtl, setIsRtl] = useState(i18n.language === 'ar');

  const navigate = useNavigate()

  useEffect(() => {
    async function sendReq() {
      try {
        const { data } = await axios.get(`${apiUrl}/User/Show`);
        setAllOpinions(data.Opinions);
        console.log("test", {opinion});
       
   

      } catch (error) {
        console.log("Error fetching Opinions", error);
      }
    }
    sendReq();
  }, []);

  useEffect(() => {
    if (opinion) {
      setAllOpinions((prevOpinions) => [opinion, ...prevOpinions]);
    }
  }, [opinion]);

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 via-white to-blue-50" id="Opinion">
      {/* العنوان الرئيسي */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-blue-600 uppercase ">
          {t("client_reviews")}
        </h1>
        <h1 className="text-5xl font-extrabold text-gray-800 mt-4">
          <span className="text-blue-600">{t("what_students")} </span>
          {t("think_about_us")}
        </h1>
      </div>

      {/* الخط مع الدائرة المتحركة */}
      <div className="flex justify-center items-center mt-2">
        <div className="w-32 h-1 bg-blue-300 relative">
          <div className="absolute top-[-5px] left-0 w-3 h-3 bg-blue-600 rounded-full animate-moving-circle"></div>
        </div>
      </div>

      {/* الوصف النصي */}
      <p className="text-gray-600 text-center mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
        {t("reviews_description")}
      </p>

      {/* سلايدر المراجعات */}
      <Swiper
        className="w-full max-w-6xl mx-auto mt-16 pb-44"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        dir={isRtl ? 'rtl' : 'ltr'}
        navigation
        pagination={{ clickable: false }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        grabCursor
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {Allopinions.map((Opinion, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl shadow-md">
                  {Opinion.Name[0]}
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-gray-800">{Opinion.Name}</h1>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed italic">
                "{Opinion.Comment}"
              </p>
              <div className="mt-4 text-yellow-500 flex justify-center">
                {Array.from({ length: Opinion.Rating || 5 }, (_, i) => (
                  <span key={i} className="text-2xl">★</span>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Opinion;
