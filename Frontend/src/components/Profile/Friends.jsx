import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;





const Friends = () => {
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");
  const user = JSON.parse(localStorage.getItem("user"));
  const [friends, setFriends] = useState([]);
  const [Profile, setProfile] = useState({});



  

useEffect(() => {
  async function sendReq() {
    try {
      const { data } = await axios.get(`${apiUrl}/getUserInfo/${user.Name}`);
      console.log(data);
      
      setProfile(data.personalInfo);
      setFriends(data.personalInfo.friends || []);
    } catch (error) {
      console.error("Error fetching profile Info:", error);
    }
  }
  sendReq();

}, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow">
          <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">Friends</h1>

          {friends.length > 0 ? (
  <div className="space-y-4">
    {friends.map((friend) => (
      <Link
        key={friend._id || friend.id}
        to={`/index/profile/${friend.name}/${user.Name}`}
        className="block"
      >
        <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-5 rounded-xl shadow-inner hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          {friend.image ? (
            <img
              src={friend.image}
              alt={friend.name}
              className="w-16 h-16 rounded-full object-cover shadow"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              No Image
            </div>
          )}
          <div>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">{friend.name}</p>

          </div>
        </div>
      </Link>
    ))}
  </div>
) : (
  <p className="text-gray-500 dark:text-gray-400">You don't have any friends yet.</p>
)}

        </div>
      </div>
    </div>
  );
};

export default Friends;
