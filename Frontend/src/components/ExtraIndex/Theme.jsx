import { useState, useEffect } from "react";
import Nav from "../Index/Nav";
import { Link } from "react-router-dom";
import Menu from "../Index/Menu";

import { useTranslation } from 'react-i18next';


export default function Theme({changeLanguage}) {
  
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

  useEffect(() => {
    document.documentElement.style.setProperty("--main-color", color);
    localStorage.setItem("mainColor", color); // حفظ اللون عند التحديث
  }, [color]);

  const handleChange = (e) => {
    setColor(e.target.value);
    location.reload()
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav className="w-full" />

      <div className='flex py-10 mx-auto w-full '>
        <div>
          <Menu className="w-1/5 min-h-screen border-r border-gray-200" />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color }}>
              {t('customize_theme')}
            </h2>

            <div className="flex justify-center">
              <input
                type="color"
                value={color}
                onChange={handleChange}
                className="w-20 h-20 border-4 border-gray-300 rounded-full cursor-pointer"
              />
            </div>

            <p className="mt-3 text-lg font-medium text-center" style={{ color }}>
              {t('color_preview_text')}
            </p>

            <Link to="/index">
              <div className="flex justify-center mt-3">
                <button
                  style={{ backgroundColor: color }}
                  className="px-6 py-3 rounded-lg text-white text-lg font-semibold shadow-md hover:opacity-80 transition"
                >
                  {t('go_back_with_style')}
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
