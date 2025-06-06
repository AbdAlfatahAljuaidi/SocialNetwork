import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const EditUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [admin, setAdmin] = useState();
  const [active, setActive] = useState();
  const { id } = useParams(); // استخراج ID المستخدم من الرابط
  const navigate = useNavigate(); // استخراج ID المستخدم من الرابط
  
  const color = localStorage.getItem("mainColor") || "#1D4ED8";

  // دالة لجلب بيانات المستخدم
  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/showUser/${id}`);
      
      if (!data.error) { // التأكد من عدم وجود خطأ
        setName(data.user.Name || ''); // ضبط الاسم
        setEmail(data.user.Email || ''); // ضبط البريد الإلكتروني
        setAdmin(data.user.admin || ''); 
        setActive(data.user.active || ''); 
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // استدعاء البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchUserData();
  }, [id]); 
  
  


const Update = async () => {

  try {
    const { data } = await axios.put(`${apiUrl}/editUser/${id}`, {
      Name: name,  // ضع الاسم الجديد هنا
      Email: email, // ضع الإيميل الجديد هنا
      admin:admin, // ضع الإيميل الجديد هنا
      active:active, // ضع الإيميل الجديد هنا
    });

    console.log("User updated:", data);
    toast.success(data.message);
    navigate(`/Index/Dashboard`);
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error(error.response.data.message);
  }
};



  return (
    <div className="max-w-md mx-auto mt-40 p-6 border rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit User</h2>
      <div className="space-y-4">
        
        {/* حقل الاسم */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg mt-2"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* حقل الايميل */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg mt-2"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="flex items-center space-x-3">
  <input
    id="active"
    type="checkbox"
    checked={active}
    onChange={(e) => setActive(e.target.checked)}
    className="h-5 w-5"
  />
  <label htmlFor="admin" className="text-lg font-medium">active</label>
</div>

        <div className="flex items-center space-x-3">
  <input
    id="admin"
    type="checkbox"
    checked={admin}
    onChange={(e) => setAdmin(e.target.checked)}
    className="h-5 w-5"
  />
  <label htmlFor="admin" className="text-lg font-medium">Admin</label>
</div>

        {/* زر الحفظ */}
        <button
        onClick={Update}
          className="w-full p-3  text-white rounded-lg mt-4 transition duration-200" style={{background:color}}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditUser;
