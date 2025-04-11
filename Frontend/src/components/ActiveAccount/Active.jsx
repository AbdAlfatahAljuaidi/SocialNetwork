import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import  {toast}  from "react-toastify";
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;


const Active = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate()



  const activateAccount = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/activeAccount/${token}`
      );
      setMessage(response.data.message);
      if(message==""){

        toast.success("Your account has been activated")
      }
      navigate("/Home/Registration")
    } catch (err) {
      setError(true);
      setMessage(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };






  useEffect(() => {

    if (token) {
      console.log(token);
      activateAccount();
      
    }


   
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className={`text-lg font-semibold ${error ? "text-red-500" : "text-green-500"}`}>
          {message}
        </h2>
      </div>
    </div>
  );
};

export default Active;
