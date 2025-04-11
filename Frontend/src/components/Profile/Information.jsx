// Information.js
import React, { useEffect, useState } from 'react';
import { 
  FaLocationDot, FaStar, FaMessage, FaCheck, 
  FaLinkedin, FaGithub, FaTwitter, FaPhone, 
  FaEnvelope, FaGlobe ,FaTransgender
} from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
import Person from '../../assets/person.jpg';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;


const Information = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

  const [Profile,setProfile] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    async function sendReq() {
      try {
      
        const { data } = await axios.get(`${apiUrl}/User/GetProfile`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        console.log(data);
        console.log(data.getProfile[0].Age);
        

        if (!data.getProfile[0] || !data.getProfile[0].Age || data.getProfile[0].Age === "") {
          navigate('/Index/Profile/Update'); // إعادة التوجيه إلى صفحة التحديث
          return; // خروج من الدالة
        }

        setProfile(data.getProfile);
       
      } catch (error) {
        console.error("Error fetching profile Info:", error);
        navigate('/Index/Profile/Update');
       
        
      }
    }
    sendReq();
  }, []);




  return (
    <div className="bg-white p-5 shadow-md rounded-lg w-full border border-gray-300 mx-auto ">
      {/* Header Section */}
      {Profile && Profile.length > 0 ? (
  Profile.map((profile, index) => (
    <div key={index} className="flex flex-wrap items-center justify-between pb-6">
      <div className="flex items-center space-x-4">
        <img 
          src={profile.imageUrl || "https://via.placeholder.com/150"} // صورة افتراضية إذا لم تكن هناك صورة
          alt="Person" 
          className="w-28 h-28 rounded-full border-2 border-blue-500 shadow-md" 
        />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">{user.Name || "Unknown"}</h1>
          <p className="flex items-center text-sm text-gray-600 mt-1">
            <FaLocationDot className=" mr-2 bg-blue-50"  /> {profile.Address || "Not specified"}
          </p>
          <h2 className=" font-medium text-sm mt-1" style={{
                color:color
              }}>{profile.major || "Software Engineer"}</h2>
        </div>
      </div>
    
    </div>
  ))
) : (
  <p className="text-gray-500 text-center">No profiles available.</p>
)}

    
  
      {Profile ? Profile.map((Profile, index) => (
          
        <div className="mt-6"     key={index}  >
          <h2 className="text-xl font-bold text-gray-700 border-b pb-2">Personal Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 mt-4 text-sm">
            <div className="flex items-center">
              <FaPhone className=" mr-2 " style={{
                color:color
              }} size={20} />
              <span className=" text-gray-700 w-20 text-lg font-medium">Phone:</span>
              <span className="text-gray-600 text-lg">{Profile.Phone}</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className=" mr-2" style={{
                color:color
              }}  size={20} />
              <span className="font-medium text-gray-700 w-20 text-lg">E-mail:</span>
              <span className="text-gray-600 text-lg">{user.Email}</span>
            </div>
            <div className="flex items-center">
              <FaLocationDot className=" mr-2" style={{
                color:color
              }}  size={20} />
              <span className="font-medium text-gray-700 w-20 text-lg">Address:</span>
              <span className="text-gray-600 text-lg">{Profile.Address}</span>
            </div>
            <div className="flex items-center">
              <BsCalendar2DateFill className=" mr-2" style={{
                color:color
              }}  size={20} />
              <span className="font-medium text-gray-700 w-20 text-lg">Age:</span>
              <span className="text-gray-600  text-lg">{Profile.Age}</span>
            </div>
            <div className="flex items-center">
              <FaTransgender className=" mr-2" style={{
                color:color
              }}  size={20} />
              <span className="font-medium text-gray-700 w-20 text-lg">Gender:</span>
              <span className="text-gray-600 text-lg">{Profile.Gender}</span>
            </div>
        
          
          </div>
          <div className='flex items-center gap-3 mt-5'>
         <button className="flex items-center w-fit  text-white px-4 py-2 text-sm rounded-lg shadow  transition" style={{
                background:color
              }}>
            <FaCheck className="mr-2" /> <Link to={`/Index/Profile/Edit/${Profile._id}`}>Update</Link>
         
          </button>
          <button className="flex items-center w-fit  text-white px-4 py-2 text-sm rounded-lg shadow transition" style={{
                background:color
              }}>
            <FaCheck className="mr-2" /> <Link to={`/Index/Profile/ResetPassword/${Profile._id}`}>Reset Password</Link>
         
          </button>
         </div>
        </div>
    
  
)) : <p>Loading...</p>}
  
   
    </div>
  );
}  

export default Information;
