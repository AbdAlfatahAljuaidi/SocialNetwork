import React, { useEffect, useState } from 'react';
import { FiMessageCircle, FiSearch } from "react-icons/fi";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';

const Extra = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [search, setSearch] = useState(""); // ✅ حالة البحث

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.post("http://localhost:4000/show_active", {
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
    <div className='bg-white w-96 h-full mt-5 mr-5 p-5 rounded-xl shadow-lg hidden sm:flex flex-col'>
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
        <h1 className='text-gray-600 cursor-pointer text-black font-bold'>Friends</h1>
      </div>

      <div className='mt-4 space-y-3'>
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend, index) => (
            <div
              key={friend._id || index}
              className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-200'
            >
                 <Link to={`/index/profile/${friend.name}/${user.Name}`}>
              <img src={friend.image} alt='Profile' className='w-10 h-10 rounded-full object-cover' />
              </Link>
              <div>
                  <Link to={`/index/profile/${friend.name}/${user.Name}`}>
                <h1 className='font-medium text-gray-800'>{friend.name}</h1>
                </Link>
                <span className='text-sm text-gray-500'>In your circle</span>
              </div>
            </div>
          ))
        ) : (
          <p className='text-sm text-gray-500'>No friends yet</p>
        )}
      </div>
    </div>
  );
};

export default Extra;
