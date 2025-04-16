import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Update = () => {
  const [Age, setAge] = useState();
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState();
  const [Gender, setGender] = useState("");
  const [major, setMajor] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [year, setYear] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ حالة جديدة

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

  const AddInfo = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true); // ✅ بداية الإرسال


    const ageNumber = parseInt(Age);
    if (isNaN(ageNumber) || ageNumber < 10 || ageNumber > 99) {
      toast.error("Age must be between 10 and 99");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userID", user._id);
      formData.append("Age", Age);
      formData.append("Address", Address);
      formData.append("Phone", Phone);
      formData.append("Gender", Gender);
      formData.append("major", major);
      formData.append("username", user.Name);
      formData.append("year", year);
      formData.append("file", postImage);

      const { data } = await axios.post(`${apiUrl}/User/Profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });



      if (data.error === false) {
        let userData = JSON.parse(localStorage.getItem('user')) || {};
        userData.profileImage = data.profileImage;
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success("The data added successfully");
        navigate('/Index/Profile');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false); // ✅ نهاية الإرسال
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Update Profile</h2>
        <div className="space-y-6">

          <div>
            <label htmlFor="type" className="block text-lg font-medium">Major</label>
            <select
              id="major"
              name="major"
              onChange={(e) => setMajor(e.target.value)}
              className="w-full p-3 border rounded"
              required
            >
              <option value="">Select Major</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Law">Law</option>
            </select>
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
            <input
              type="number"
              onChange={(e) => setAge(e.target.value)}
              name="Age"
              placeholder='25'
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              name="Address"
              placeholder='New York'
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              name="Phone"
              placeholder='+123 344 676'
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Year</label>
            <input
              type="number"
              onChange={(e) => setYear(e.target.value)}
              name="Year"
              placeholder='2025'
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-lg font-medium">Gender</label>
            <select
              id="type"
              name="type"
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setPostImage(file);
              }}
              className="mb-2"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={AddInfo}
              disabled={isSubmitting}
              className="px-6 py-2 text-white rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: color }}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Update;
