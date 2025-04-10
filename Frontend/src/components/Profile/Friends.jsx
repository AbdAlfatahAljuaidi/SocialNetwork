import axios from 'axios';
import React, { useEffect, useState } from 'react';





const Friends = () => {
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");
  const user = JSON.parse(localStorage.getItem("user"));
  const [friends, setFriends] = useState([]);
  const [Profile, setProfile] = useState({});



  

useEffect(() => {
  async function sendReq() {
    try {
      const { data } = await axios.get(`http://localhost:4000/getUserInfo/${user.Name}`);
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
                <div
                  key={friend.id}
                  className="flex items-center gap-4 bg-gray-50 p-5 rounded-xl shadow-inner"
                >
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
                    <p className="text-lg font-semibold text-gray-800">{friend.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You don't have any friends yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
