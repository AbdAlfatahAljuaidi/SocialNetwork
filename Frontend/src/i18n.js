// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "hello": "Hello",
        "welcome": "Welcome to our site",
        "Home":"Home",
        "Most Numbers":"Most Numbers",
        "Logout":"Logout",
      }
    },
    ar: {
      translation: {
        "hello": "مرحباً",
        "welcome": "مرحباً بك في موقعنا",
        "Home":"الصفحة الرئيسة",
        "Most Numbers":"اعلى الارقام",
        "Logout":"تسجيل الخروج",
      }
    }
  },
  lng: "en", // اللغة الافتراضية
  fallbackLng: "en", // في حال لم تكن اللغة موجودة
  interpolation: {
    escapeValue: false // React already safes from xss
  }
});

export default i18n;



