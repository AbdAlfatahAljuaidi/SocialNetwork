import React, { useState } from 'react'
import Nav from '../Index/Nav'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

const Report = () => {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false); // ✅ حالة التحميل
  
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!reason.trim()) {
      toast.error("Please provide a reason for reporting."); // ✅ تنبيه إذا كانت فارغة
      return;
    }
  
    setLoading(true); // ✅ تشغيل حالة التحميل
  
    try {
      const response = await axios.post(`${apiUrl}/createReport`, {
        reporter: user.Name,
        reportedUser: params.reportedPerson,
        reason,
      });
  
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/Index");
      } else {
        toast.error(response.data.message || "Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("An error occurred while submitting the report.");
    } finally {
      setLoading(false); // ✅ إيقاف حالة التحميل
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 pb-9">
      <Nav />
      <div className="max-w-md mx-auto bg-white p-6 mt-9 md:mt-20 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Report User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              value={user.Name}
              disabled
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Reported Person</label>
            <input
              type="text"
              value={params.reportedPerson}
              disabled
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded h-28"
              placeholder="Explain the reason for reporting"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading} // ✅ تعطيل الزر أثناء التحميل
            className={`w-full py-2 rounded transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {loading ? "Submitting..." : "Submit Report"} {/* ✅ تغيير النص */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;
