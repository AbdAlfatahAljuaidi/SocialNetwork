import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Edit = () => {
  const [Age, setAge] = useState("");
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState("");
  const [Gender, setGender] = useState("");
  const [postImage, setPostImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [major, setMajor] = useState("");
  const [username, setUsername] = useState("");
  const [year, setYear] = useState();

  const navigate = useNavigate();
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

  useEffect(() => {
    async function sendReq() {
      const { data } = await axios.get(`${apiUrl}/GetDataProfile/${params.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setAge(data.personalInfo.Age);
      setAddress(data.personalInfo.Address);
      setPhone(data.personalInfo.Phone);
      setGender(data.personalInfo.Gender);
      setMajor(data.personalInfo.major);
      setUsername(user.Name);
      setYear(data.personalInfo.year);
      setPreviewImage(user.profileImage || "");
    }

    sendReq();
  }, []);

  async function submitForm() {
    try {
      const formData = new FormData();
      formData.append("userID", user._id);
      formData.append("Age", Age);
      formData.append("Address", Address);
      formData.append("Phone", Phone);
      formData.append("Gender", Gender);
      formData.append("username", username);
      formData.append("major", major);
      formData.append("year", year);
      formData.append("file", postImage);

      const { data } = await axios.put(
        `${apiUrl}/SetDataProfile/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (data.message === "Update Data Successfully") {
        let userData = user || {};
        userData.profileImage = data.updateProfile.imageUrl;
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success(data.message);
        navigate(`/Index/Profile`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ غير متوقع");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Edit Your Profile</h2>

        <div className="flex flex-col items-center mb-8">
          {previewImage && (
            <img
              src={previewImage}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 shadow-lg mb-4"
              style={{ borderColor: color }}
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setPostImage(file);
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
            className="text-sm text-gray-700 dark:text-gray-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              disabled
              value={username}
              className="w-full mt-1 px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border focus:ring-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Major</label>
            <select
              onChange={(e) => setMajor(e.target.value)}
              value={major}
              className="w-full mt-1 px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border"
            >
              <option value="">Select major</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Law">Law</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
            <input
              type="number"
              onChange={(e) => setAge(e.target.value)}
              value={Age}
              className="w-full mt-1 px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={Phone}
              className="w-full mt-1 px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={Address}
              className="w-full mt-1 px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Year</label>
            <input
              type="number"
              onChange={(e) => setYear(e.target.value)}
              value={year}
              className="w-full mt-1 px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
            <select
              onChange={(e) => setGender(e.target.value)}
              value={Gender}
              className="w-full mt-1 px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={submitForm}
            style={{ backgroundColor: color }}
            className="px-8 py-3 text-white text-lg font-semibold rounded-xl shadow-md hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
