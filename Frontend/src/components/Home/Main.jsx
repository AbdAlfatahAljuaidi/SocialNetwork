import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper';

import Main1 from '../../assets/Main1.jpg';
import Main2 from '../../assets/Main2.jpg';
import Main3 from '../../assets/Main3.jpg';
import { useTranslation } from 'react-i18next';

const Main = ({changeLanguage }) => {

    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar'; // تحقق من اللغة الحالية
    const [isRtl, setIsRtl] = useState(i18n.language === 'ar');
    return (
        <Swiper
        className="w-full"
        dir={isRtl ? 'rtl' : 'ltr'}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        effect="fade"
        grabCursor={true}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: true, pauseOnHover: true }}
      >
        {[1, 2, 3].map((i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full min-h-[87vh] md:h-[87vh]">
              <img
                className="object-cover w-full h-full"
                src={i === 1 ? Main1 : i === 2 ? Main2 : Main3}
                alt={t(`slide${i}.title`)}
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60">
                <div className={isRtl ? 'text-right' : 'text-center'}>
                  <h1 className="text-white text-xl">{t(`slide${i}.title`)}</h1>
                  <h2 className="text-white text-4xl md:text-5xl font-bold mt-3">
                    {t(`slide${i}.heading`)}
                  </h2>
                  <h1 className="text-white text-xl mt-6">{t(`slide${i}.subtitle`)}</h1>
                  <a href="#About">
                    <button
                      aria-label={t(`slide${i}.button`)}
                      className="mt-4 bg-main text-white rounded-lg px-9 py-3 hover:bg-blue-600 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    >
                      {t(`slide${i}.button`)}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
};

export default Main;
