import { useState, useEffect } from "react";
import Nav from "../Index/Nav";
import { Link } from "react-router-dom";

export default function Theme() {
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

  useEffect(() => {
    document.documentElement.style.setProperty("--main-color", color);
    localStorage.setItem("mainColor", color); // حفظ اللون عند التحديث
  }, [color]);

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ شريط التنقل في الأعلى */}
      <Nav />

      {/* ✅ عرض المحتوى على كامل الشاشة */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl text-center">
          <h2 className="text-3xl font-semibold mb-6" style={{ color: color }}>
          Choose a color to change the site theme.
          </h2>
          
          {/* ✅ اختيار اللون */}
          <input
            type="color"
            value={color}
            onChange={handleChange}
            className="w-20 h-20 border-4 border-gray-300 rounded-full cursor-pointer"
          />

          {/* ✅ النص المتغير */}
          <p className="mt-6 text-lg font-medium" style={{ color: color }}>
          The text will change depending on the selected color.
          </p>

          {/* ✅ زر بلون متغير */}
          <Link to="/index">
          <button
            style={{ backgroundColor: color }}
            className="mt-8 px-6 py-3 rounded-lg text-white text-lg font-semibold shadow-md hover:opacity-80 transition"
          >
          Custom color button
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
