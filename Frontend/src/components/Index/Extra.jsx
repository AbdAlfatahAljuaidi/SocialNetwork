import React, { useEffect, useState } from 'react';
import { FiMessageCircle, FiSearch } from "react-icons/fi";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Extra = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [search, setSearch] = useState(""); // ✅ حالة البحث

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.post(`${apiUrl}/show_active`, {
          userID: user._id
        });

        if (!data.error) {
          setProfile(data.profile);
          setError("");
        } else {
          setError(data.message);
          setProfile(null);
        }
      } catch (err) {
        console.error(err);
        setError("فشل الاتصال بالسيرفر");
        setProfile(null);
      }
    };

    if (user?._id) {
      fetchProfile();
    }
  }, [user?._id]);

  // ✅ فلترة الأصدقاء بناءً على خانة البحث
  const filteredFriends = profile?.friends?.filter(friend =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className='bg-white sticky top-24 w-96 h-full mt-5 mr-5 p-5 rounded-xl shadow-lg hidden sm:flex flex-col'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold text-gray-800'>Friends</h1>
        <FaUserFriends  className='text-2xl text-gray-600 hover:text-gray-800 cursor-pointer' />
      </div>

      <div className='relative mb-4'>
        <input 
          className='w-full p-2 pl-10 bg-gray-100 rounded-full outline-none border border-gray-300 focus:border-blue-500'
          type='text' 
          placeholder='Search friend' 
          value={search} // ✅ ربط المدخل بالحالة
          onChange={(e) => setSearch(e.target.value)} // ✅ تحديث حالة البحث
        />
        <FiSearch className='absolute left-3 top-2.5 text-gray-500' />
      </div>

      <div className='flex gap-3 items-center mt-4 border-b border-gray-300 pb-2'>
        <h1 className='text-gray-600 cursor-pointer  font-bold'>Friends</h1>
        {/* <h1 className='text-gray-600 cursor-pointer  font-bold'>Online</h1> */}
        
      </div>

      <div className='mt-4 space-y-3 max-h-64 overflow-y-auto pr-2'>
      {filteredFriends.length > 0 ? (
  filteredFriends.map((friend, index) => (
    <Link
      key={friend._id || index}
      to={`/index/profile/${friend.name}/${user.Name}`}
      className="block"
    >
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
        <img
          src={friend.image}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h1 className="font-semibold text-gray-800 dark:text-white">{friend.name}</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">In your circle</span>
        </div>
      </div>
    </Link>
  ))
) : (
  <p className="text-sm text-gray-500 dark:text-gray-400">No friends yet</p>
)}

</div>  </div>
  );
};

export default Extra;
