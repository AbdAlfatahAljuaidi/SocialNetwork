import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const Settings = () => {
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");
  const [Profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      // تنفيذ حذف الحساب من السيرفر
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("mainColor", newColor); // حفظ اللون في localStorage
  };

  const deleteUser = async ()=> {
   try{
    const {data} = await axios.post("http://localhost:4000/deleteAccount",{
      userId:user._id
    })

    if(data.error == false){
      localStorage.clear();
      toast.success(data.message)
      navigate("/Home/Registration");
    }
   }
   catch(error){
    console.log(error);
    toast.error(error.response.data.message)
    
   }
  }

  useEffect(() => {
    async function sendReq() {
      try {
        const { data } = await axios.get("http://localhost:4000/User/GetProfile", {
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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {Profile && Profile.length > 0 ? (
          Profile.map((profile) => (
            <div key={profile._id} className="bg-white p-8 rounded-2xl shadow">
              <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">Settings</h1>

              <div className="space-y-6">
                {/* تعديل البيانات */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-700">Edit Profile Info</p>
                  <button
                    onClick={() => navigate(`/Index/Profile/Edit/${profile._id}`)}
                    className="px-4 py-2 rounded-lg text-white text-sm shadow"
                    style={{ backgroundColor: color }}
                  >
                    Edit
                  </button>
                </div>

                {/* تغيير كلمة السر */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-700">Change Password</p>
                  <button
                    onClick={() => navigate(`/Index/Profile/ResetPassword/${profile._id}`)}
                    className="px-4 py-2 rounded-lg text-white text-sm shadow"
                    style={{ backgroundColor: color }}
                  >
                    Reset Password
                  </button>
                </div>

                {/* تغيير اللون */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-700">Change Main Color</p>
                  <input
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                    className="w-10 h-10 p-0 border-2 border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>

                {/* حذف الحساب */}
                <div className="flex items-center justify-between border-t pt-4 mt-6">
                  <p className="text-lg font-medium text-red-600">Delete Account</p>
                  <button
                    onClick={()=>deleteUser()}
                    className="px-4 py-2 rounded-lg text-white text-sm shadow bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Settings;
