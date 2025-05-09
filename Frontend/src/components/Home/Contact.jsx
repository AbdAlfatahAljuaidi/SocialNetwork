import React from 'react';
import ContactUs from '../../assets/contactUs.jpg';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Contact = ({changeLanguage}) => {
  const { t } = useTranslation();

  return (
    <div
    className="pt-20 pb-12 px-5 bg-gray-200 text-white"
    style={{
      backgroundImage: `url(${ContactUs})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="text-center mb-8">
      <h1 className="text-2xl font-semibold uppercase tracking-wider">{t('contact_section_small_title')}</h1>
      <h1 className="text-5xl font-extrabold text-white mt-4">{t('contact_section_main_title')}</h1>
    </div>
    <div className="flex justify-center items-center mt-2 relative">
      <div className="w-32 h-1 bg-blue-300 relative">
        <div className="absolute top-[-5px] left-0 w-3 h-3 bg-main rounded-full animate-moving-circle"></div>
      </div>
    </div>
    <p className="text-white mt-4 max-w-xl mx-auto text-lg text-center">
      {t('contact_description')}
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <div className="flex justify-center items-center bg-white px-6 py-6 rounded-lg shadow-lg">
        <div className="flex justify-center items-center bg-main w-12 h-12 rounded-full text-white">
          <FaLocationDot size={24} />
        </div>
        <div className="ml-4">
          <h1 className="text-black font-semibold">{t('contact_address_label')}</h1>
          <h2 className="text-gray-500">{t('contact_address_value')}</h2>
        </div>
      </div>

      <div className="flex justify-center items-center bg-white px-6 py-6 rounded-lg shadow-lg">
        <div className="flex justify-center items-center bg-main w-12 h-12 rounded-full text-white">
          <MdOutlineMailOutline size={24} />
        </div>
        <div className="ml-4">
          <h1 className="text-black font-semibold">{t('contact_email_label')}</h1>
          <h2 className="text-gray-500">{t('contact_email_value')}</h2>
        </div>
      </div>

      <div className="flex justify-center items-center bg-white px-6 py-6 rounded-lg shadow-lg">
        <div className="flex justify-center items-center bg-main w-12 h-12 rounded-full text-white">
          <FaPhoneAlt size={24} />
        </div>
        <div className="ml-4">
          <h1 className="text-black font-semibold">{t('contact_phone_label')}</h1>
          <h2 className="text-gray-500">{t('contact_phone_value')}</h2>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Contact;
