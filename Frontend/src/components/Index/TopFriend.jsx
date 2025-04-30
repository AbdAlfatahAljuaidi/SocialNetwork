import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Menu from './Menu';
import { FaUserFriends } from 'react-icons/fa';

const TopFriend = () => {
  const [topFriend, setTopFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  useEffect(() => {
    const fetchTopFriend = async () => {
      try {
        const res = await axios.post(`${apiUrl}/topUserFriends`);
        setTopFriend(res.data);
      } catch (err) {
        console.error('Error fetching top friend:', err);
        setError('Failed to load top friend');
      } finally {
        setLoading(false);
      }
    };

    fetchTopFriend();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">{error}</div>;
  if (!topFriend) return <div className="text-center mt-10">No top friend found.</div>;

  return (
    <div>
      <Nav />
      <div className='flex gap-4 px-6 py-10 mx-auto'>
        <div className=''>
          <Menu />
        </div>
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">👥 Most Friendly User</h2>

          <div className="flex items-center space-x-4 mb-4">
            <img
              src={topFriend.imageUrl || 'https://via.placeholder.com/50'}
              alt={topFriend.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{topFriend.username}</h3>
              <p className="text-sm text-gray-500">{topFriend.major}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 flex items-center py-2 gap-2 mt-2">
            <FaUserFriends className="text-blue-600 text-xl" />
            <span className="font-medium text-xl">{topFriend.friendsCount}</span> <span className='text-xl'>Friends</span>
          </div>

          {topFriend.imageUrl && (
            <img
              src={topFriend.imageUrl}
              alt="User related"
              className="w-full rounded mb-4"
            />
          )}

       
        </div>
      </div>
    </div>
  );
};

export default TopFriend;
