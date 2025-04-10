import React, { useEffect, useState } from 'react';
import { 
  FaLocationDot, FaStar, FaMessage, FaCheck, 
  FaPhone, FaEnvelope, FaGlobe, FaTransgender, FaUserPlus
} from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Nav from '../Index/Nav';

const UsersProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");
  const [Profile, setProfile] = useState({});
  const [friends, setFriends] = useState([]);
  const params = useParams();

  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    async function sendReq() {
      try {
        const { data } = await axios.get(`http://localhost:4000/getUserInfo/${params.username}`);
        setProfile(data.personalInfo);
        setFriends(data.personalInfo.friends || []);
      } catch (error) {
        console.error("Error fetching profile Info:", error);
      }
    }
    sendReq();

    if (params.username === user.Name) {
      setIsOwnProfile(true);
    } else {
      setIsOwnProfile(false);
    }
  }, [params.username, user.Name]);

  const addFriend = async () => {
    try {
      const { data } = await axios.post(`http://localhost:4000/follow/${params.username}`, {
        Name: user.Name
      });

      setMessage(data.message);
      setError(null);

      const alreadyFriend = friends.some(friend => friend.name === user.Name);

      if (!alreadyFriend) {
        setFriends([...friends, { name: user.Name, image: user.profileImage }]);
        toast.success(data.message);
      } else {
        setFriends(friends.filter(friend => friend.name !== user.Name));
        toast.info("Friend removed");
      }

    } catch (error) {
      console.log(error);
    
      toast.error(error.response.data.message);
    }
  };

  const isFriend = friends.some(friend => friend.name === user.Name);

  return (
    <div className="bg-white rounded-lg mx-auto">
      <Nav />

      <div className='p-8 shadow-lg w-[85%] mt-10 mx-auto'>
        <h1 className="text-4xl font-bold text-gray-800">Profile</h1>

        {Profile ? (
          <div className="flex flex-wrap items-center justify-between pb-8 mt-9 shadow-md p-6 rounded-lg bg-gray-50">
            <div className="flex items-center space-x-8">
              <img 
                src={Profile.imageUrl || "https://via.placeholder.com/150"} 
                alt="Person" 
                className="w-36 h-36 rounded-full border-4 border-blue-500 shadow-xl" 
              />
              <div>
                <h1 className="text-4xl font-extrabold text-gray-800">{Profile.username || "Unknown"}</h1>
                <p className="flex items-center text-lg text-gray-600 mt-2">
                  <FaLocationDot className="mr-2 text-blue-500" /> {Profile.Address || "Not specified"}
                </p>
                <h2 className="font-medium text-lg mt-2" style={{ color: color }}>
                  {Profile.major || "Software Engineer"}
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No profile available.</p>
        )}

        {Profile ? (
          <div className="mt-8 shadow-md p-6 rounded-lg bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-700 border-b pb-4">Personal Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 mt-6 text-lg">
              <div className="flex items-center">
                <FaPhone className="mr-3 text-blue-500" size={24} />
                <span className="text-gray-700 w-24 font-medium">Phone:</span>
                <span className="text-gray-600">{Profile.Phone}</span>
              </div>
          
              <div className="flex items-center">
                <FaLocationDot className="mr-3 text-blue-500" size={24} />
                <span className="font-medium text-gray-700 w-24">Address:</span>
                <span className="text-gray-600">{Profile.Address}</span>
              </div>
              <div className="flex items-center">
                <BsCalendar2DateFill className="mr-3 text-blue-500" size={24} />
                <span className="font-medium text-gray-700 w-24">Age:</span>
                <span className="text-gray-600">{Profile.Age}</span>
              </div>
              <div className="flex items-center">
                <FaTransgender className="mr-3 text-blue-500" size={24} />
                <span className="font-medium text-gray-700 w-24">Gender:</span>
                <span className="text-gray-600">{Profile.Gender}</span>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {!isOwnProfile && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={()=>addFriend()} 
              className="flex items-center text-white px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-green-600 transition"
              style={{ background: color }}
            >
              <FaUserPlus className="mr-3" />
              {isFriend ? 'Unfriend' : 'Add Friend'}
            </button>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-4">Friends</h2>
          {friends.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {friends.map((friend, index) => (
                <div key={index} className="bg-gray-100 flex items-center gap-4 p-4 rounded-lg shadow-md hover:bg-gray-200 transition">
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src={friend.image}
                    alt={friend.name}
                  />
                  <li className="text-gray-700 font-medium">{friend.name}</li>
                </div>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-gray-500">No friends yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersProfile;
