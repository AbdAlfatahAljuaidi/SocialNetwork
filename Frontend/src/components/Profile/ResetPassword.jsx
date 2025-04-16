import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  // استرجاع بيانات المستخدم من LocalStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.put(
        `${apiUrl}/Index/Users/Reset/${params.id}`,
        { oldPassword, newPassword: password, confirmPass: confirmPassword }, // إرسال البيانات بالشكل الصحيح
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // إرسال التوكن مع الطلب
          },
        }
      );

      if (data.success) {
        setError("");
        toast.success("Password updated successfully!")
        setTimeout(() => navigate("/Index/Profile"), 2000); // إعادة التوجيه بعد النجاح
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Old Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full  text-white p-2 rounded  transition" style={{
              background:color
            }}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
