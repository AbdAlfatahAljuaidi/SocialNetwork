import React, { useState, createContext, useEffect } from "react";
import sendMessage from '../../assets/sendMessage.jpg';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

export const UserContext = createContext();

const Form = ({changeLanguage}) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Age, setAge] = useState("");
  const [Comment, setComment] = useState("");
  const [NewOpinion, setNewOpinion] = useState(null);
  const { t } = useTranslation();

  const navigate = useNavigate()

  const submitForm = async () => {
    try {
      const { data } = await axios.post(`${apiUrl}/User/Home`, {
        Name,
        Email,
        Phone,
        Age,
        Comment,
      });

      if (data.message === "User data uploaded") {
        setNewOpinion(data.NewOpinion);
        console.log("New opinion received:", data.NewOpinion);
        window.location.reload();
         toast.success(data.message);
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  // تتبع تغيير قيمة NewOpinion
  useEffect(() => {
    if (NewOpinion !== null) {
      console.log("Updated NewOpinion:", NewOpinion);
    }
  }, [NewOpinion]);

  return (
    <UserContext.Provider value={NewOpinion}>
    <div className="max-w-6xl pt-32 pb-16 mx-auto">
      <div className="flex flex-col lg:flex-row justify-center items-center bg-white rounded-lg shadow-xl">
        {/* الصورة الكبيرة */}
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <img
            src={sendMessage}
            alt={t('send_opinion_title')} // استخدام الترجمة هنا
            className="w-full h-full object-cover rounded-t-lg lg:rounded-l-lg"
          />
        </div>
  
        {/* النموذج */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
            {t('send_opinion_title')}
          </h1>
  
          {/* الحقول */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <input
              type="text"
              name="Name"
              placeholder={t('name_placeholder')}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="Email"
              placeholder={t('email_placeholder')}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <input
              type="text"
              name="Phone"
              placeholder={t('phone_placeholder')}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="Age"
              placeholder={t('age_placeholder')}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* حقل الرسالة */}
          <div className="mb-8">
            <textarea
              name="Comment"
              placeholder={t('comment_placeholder')}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
            />
          </div>
  
          {/* زر الإرسال */}
          <div className="flex justify-center">
            <button
              onClick={submitForm}
              className="w-full py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {t('send_button')}
            </button>
          </div>
        </div>
      </div>
    </div>
  </UserContext.Provider>
  );
};

export default Form;
