import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import  {toast}  from "react-toastify";
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

import { useTranslation } from 'react-i18next';


const Active = ({changeLanguage}) => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const [loadingMessages, setLoadingMessages] = useState(true);
  const navigate = useNavigate()



  const { t } = useTranslation();
  const activateAccount = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/activeAccount/${token}`
      );
      setMessage(response.data.message);
      if(message==""){
        setLoadingMessages(false);
        toast.success("Your account has been activated")
      }
      navigate("/Home/Registration")
    } catch (err) {
      setError(true);
      setMessage(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      setLoadingMessages(false);
    }
  };






  useEffect(() => {

    if (token) {
      console.log(token);
      activateAccount();
      
    }


   
  }, [token]);

  return (
    <div>
         {loadingMessages && (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    <span className="ml-4 text-blue-700 font-medium">
{t('loading_messages')}</span>
  </div>
)}
    <div className="flex items-center justify-center min-h-screen">

      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className={`text-lg font-semibold ${error ? "text-red-500" : "text-green-500"}`}>
          {message}
        </h2>
      </div>
    </div>
    </div>
  );
};

export default Active;
