import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import crypto from "../../assets/crypto.jpg";
import foot from "../../assets/footer.jpg";
import { Link } from "react-router-dom";
import logo from '../../assets/Logo.png'
import { useTranslation } from 'react-i18next';

const Footer = ({changeLanguage}) => {
  const { t } = useTranslation();
  return (
    <div
    className="p-10 text-white"
    style={{
      backgroundImage: `url(${foot})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-screen-xl mx-auto" id="Contact">
      {/* Column 1: MRERROR */}
      <div>
        <h1 className="text-2xl font-bold mb-4">{t('footer.askAAU')}</h1>
        <p className="mb-6 text-gray-300">{t('footer.description')}</p>

        <h2 className="text-xl font-semibold mb-3">{t('footer.followUs')}</h2>
        <div className="flex space-x-4">
          <a target="_blank" href="https://www.facebook.com/aau.edu.jordan/"> 
            <FaFacebook className="text-xl cursor-pointer hover:text-blue-500" />
          </a>
        </div>
      </div>

      {/* Column 2: Quick Links */}
      <div>
  <h1 className="text-2xl font-bold mb-4">{t('footer.quickLinks')}</h1>
  <ul className="space-y-3">
    {[
      { name: t('navbar.home'), link: '/' },
      { name: t('navbar.about'), link: '#about' },
      { name: t('navbar.service'), link: '#service' },
      { name: t('navbar.opinion'), link: '#opinion' },
      { name: t('navbar.contact'), link: '#contact' }
    ].map(({ name, link }) => (
      <li key={link} className="flex items-center space-x-2">
        <FaArrowRight className="text-gray-400 mx-2" />
        <a href={link}>
          <h4 className="text-gray-300 hover:text-white cursor-pointer">
            {name}
          </h4>
        </a>
      </li>
    ))}
  </ul>
</div>

      {/* Column 3: Popular Post */}
      <div>
        <h1 className="text-2xl font-bold mb-4">{t('footer.popularPost')}</h1>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="Post"
              className="w-28 object-contain rounded-md mx-2"
            />
            <div>
              <h1 className="text-gray-300 text-sm">{t('footer.busTimes')}</h1>
              <p className="text-gray-400 text-xs">April 20, 2025</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 ">
            <img
              src={logo}
              alt="Post"
              className="w-28 object-contain rounded-md mx-2"
            />
            <div>
              <h1 className="text-gray-300 text-sm">{t('footer.lectureDates')}</h1>
              <p className="text-gray-400 text-xs">April 29, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Column 4: Contact Info */}
      <div>
        <h1 className="text-2xl font-bold mb-4">{t('footer.contactInfo')}</h1>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <FaLocationDot className="text-xl mx-2" />
            <div className="">
              <h1 className="text-gray-300">{t('footer.location')}</h1>
              <p className="text-gray-400 text-sm">Jordan Amman.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 ">
            <MdEmail className="text-xl mx-2" />
            <div>
              <h1 className="text-gray-300">{t('footer.email')}</h1>
              <p className="text-gray-400 text-sm">abdalfatah.aljuaidi@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="text-xl mx-2" />
            <div>
              <h1 className="text-gray-300">{t('footer.phone')}</h1>
              <p className="text-gray-400 text-sm">+962-78240-7533 </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Horizontal Line */}
    <div className="h-[1px] w-[75%] m-auto bg-main mt-7"></div>

    {/* Footer Bottom Section */}
    <div className="flex flex-col sm:flex-row items-center justify-evenly mt-6">
      <div className="text-center sm:text-left">
        <h1>{t('footer.copyright')}</h1>
      </div>
      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-5 mt-3 sm:mt-0">
        <h1 className="cursor-pointer hover:text-white"><Link to="/PrivacyPolicy">{t('footer.privacyPolicy')}</Link></h1>
        <h1 className="cursor-pointer hover:text-white"> <Link to={"/Terms & Conditions"}>{t('footer.termsAndConditions')}</Link></h1>
      </div>
    </div>
  </div>
  );
};

export default Footer;
