import React, { useEffect, useState } from 'react';
import Nav from '../Index/Nav';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa6';

const Introductory = () => {
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");
  const user = JSON.parse(localStorage.getItem("user"));
  const [Profile, setProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function sendReq() {
      try {
        const { data } = await axios.get("http://localhost:4000/User/GetProfile", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const profileData = data.getProfile;

        if (!profileData[0] || !profileData[0].Age || profileData[0].Age === "") {
          navigate('/Index/Profile/Update');
          return;
        }

        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile Info:", error);
        navigate('/Index/Profile/Update');
      }
    }

    sendReq();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* My Profile Section */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <Link
              to={`/Index/Profile/Edit/${Profile._id}`}
              className="flex items-center text-white px-4 py-2 text-sm rounded-lg shadow"
              style={{ background: color }}
            >
              <FaCheck className="mr-2" />
              Edit
            </Link>
          </div>

          {Profile && Profile.length > 0 ? (
            Profile.map((profile, index) => (
              <div
                key={index}
                className="flex items-center gap-6 bg-gray-50 p-6 rounded-xl shadow-inner"
              >
                <div>
                  {profile.imageUrl ? (
                    <img
                      src={profile.imageUrl}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover shadow"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
                      No Image
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-800">{profile.username}</p>
                  <p className="text-gray-600">{profile.major}</p>
                  <p className="text-gray-500">{profile.Address}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </div>

        {/* Personal Info Section */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Personal Info</h2>

          {Profile && Profile.length > 0 ? (
            Profile.map((profile, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Major</p>
                  <p className="text-lg text-gray-800 font-medium">{profile.major || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Gender</p>
                  <p className="text-lg text-gray-800 font-medium">{profile.Gender || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-lg text-gray-800 font-medium">{profile.Phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Age</p>
                  <p className="text-lg text-gray-800 font-medium">{profile.Age}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading personal information...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Introductory;
