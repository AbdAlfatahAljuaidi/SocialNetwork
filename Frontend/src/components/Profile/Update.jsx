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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [point, setPoint] = useState(0);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

  const AddInfo = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

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
      formData.append("point", point);
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-3xl space-y-6">
        <div className="flex flex-col items-center">
          {user?.profileImage && (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4 shadow-lg"
            />
          )}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Update Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Major</label>
            <select
              onChange={(e) => setMajor(e.target.value)}
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="">Select Major</option>
              <option value="Special Education">Special Education</option>
<option value="Business Administration">Business Administration</option>
<option value="Counseling Psychology And Mental Health">Counseling Psychology and Mental Health</option>
<option value="Educational Administration And Curriculum">Educational Administration and Curriculum</option>
<option value="Accounting">Accounting</option>
<option value="Management Information Systems">Management Information Systems</option>
<option value="Digital Marketing">Digital Marketing</option>
<option value="Accounting And Business Law">Accounting and Business Law</option>
<option value="Data Science And Artificial Intelligence">Data Science and Artificial Intelligence</option>
<option value="Software Engineering">Software Engineering</option>
<option value="Cybersecurity">Cybersecurity</option>
<option value="Computer Science">Computer Science</option>
<option value="English Language And Translation">English Language and Translation</option>
<option value="Arabic Language And Literature">Arabic Language and Literature</option>
<option value="Jurisprudence And Its Principles">Jurisprudence and its Principles</option>
<option value="Aircraft Maintenance">Aircraft Maintenance</option>
<option value="Aviation Electronics Engineering">Aviation Electronics Engineering</option>
<option value="Architectural Engineering">Architectural Engineering</option>
<option value="Civil Engineering">Civil Engineering</option>
<option value="Electrical Engineering">Electrical Engineering</option>
<option value="Mechatronics Engineering">Mechatronics Engineering</option>
<option value="Biomedical Engineering">Biomedical Engineering</option>
<option value="Industrial Engineering">Industrial Engineering</option>


            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
            <input
              type="number"
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
  <select
    onChange={(e) => setAddress(e.target.value)}
    className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
  >
    <option value="">Select a region</option>
    <option value="Amman">Amman</option>
    <option value="Zarqa">Zarqa</option>
    <option value="Irbid">Irbid</option>
    <option value="Aqaba">Aqaba</option>
    <option value="Salt">Salt</option>
    <option value="Mafraq">Mafraq</option>
    <option value="Karak">Karak</option>
    <option value="Tafilah">Tafilah</option>
    <option value="Ma'an">Ma'an</option>
    <option value="Jerash">Jerash</option>
    <option value="Ajloun">Ajloun</option>
    <option value="Madaba">Madaba</option>
  </select>
</div>


          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="123 344 676"
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Year in university</label>
            <input
              type="number"
              onChange={(e) => setYear(e.target.value)}
              placeholder="2025"
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
            <select
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload New Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setPostImage(file);
              }}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={AddInfo}
            disabled={isSubmitting}
            className="px-8 py-3 font-semibold text-white rounded-lg shadow-lg hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: color }}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
