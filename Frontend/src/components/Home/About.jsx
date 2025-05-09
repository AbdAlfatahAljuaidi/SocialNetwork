import React from 'react';
import AboutImage from '../../assets/AboutImage.png';
import main from '../../assets/BgAbout.jpg';
import { FaCheck } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const About = ({changeLanguage}) => {
  
  const { t ,i18n } = useTranslation();
  return (
    <div
    className={`lg:flex justify-center items-center pb-20 pt-32 text-start ${
      i18n.dir() === 'rtl' ? 'space-x-reverse space-x-8' : 'space-x-8'
    }`}
    id="About"
    dir={i18n.dir()}
    style={{
      backgroundImage: `url(${main})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* صورة القسم */}
    <div className={i18n.dir() === 'rtl' ? 'lg:order-2' : ''}>
      <img src={AboutImage} alt={t('about_image_alt')} />
    </div>
  
    {/* محتوى النصوص */}
    <div className="lg:max-w-xl bg-white bg-opacity-80 p-6 rounded-lg">
      <div className="mb-9">
        <h1 className="text-main text-2xl mb-4">{t('about_ask_aau')}</h1>
        <h2 className="text-4xl font-bold leading-tight mb-6">
          {t('empowering_students')}
          <br />
          {t('knowledge_collaboration')}
        </h2>
        <p className="text-lg text-gray-700 ">
          {t('platform_description')}
        </p>
  
        <div className="w-32 h-1 bg-blue-300 relative mt-3">
          <div className="absolute top-[-5px] left-0 w-3 h-3 bg-main rounded-full animate-moving-circle"></div>
        </div>
      </div>
  
      <div className="lg:flex justify-between items-center mt-4">
        <div>
          {[ 'connect_students', 'peer_learning', 'simplify_interaction' ].map((key) => (
            <div className="flex items-center mt-2" key={key}>
              <div className="w-6 h-6 rounded-full bg-main flex justify-center items-center">
                <FaCheck className="text-white text-[13px]" />
              </div>
              <h1 className="ml-2 text-lg mx-2">{t(key)}</h1>
            </div>
          ))}
        </div>
  
        <div>
          {[ 'reliable_solutions', 'campus_communication', 'student_engagement' ].map((key) => (
            <div className="flex items-center mt-2" key={key}>
              <div className="w-6 h-6 rounded-full bg-main flex justify-center items-center">
                <FaCheck className="text-white text-[13px] " />
              </div>
              <h1 className="ml-2 text-lg mx-2">{t(key)}</h1>
            </div>
          ))}
        </div>
      </div>
  
      <a href="#Service">
        <button className="mt-8 bg-main text-white px-8 py-2 rounded-lg hover:bg-blue-600 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
          {t('learn_more')}
        </button>
      </a>
    </div>
  </div>  );
};

export default About;