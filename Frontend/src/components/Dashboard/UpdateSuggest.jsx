import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;// غيّرها للرابط المناسب

const UpdateSuggest = () => {
  const { id } = useParams();
  const [suggestion, setSuggestion] = useState({});
  const [state, setState] = useState("");
  
  const color = localStorage.getItem("mainColor") || "#1D4ED8";
  const navigate = useNavigate();
  useEffect(() => {
    const getSuggestion = async () => {
      try {
        const { data } = await axios.post(`${apiUrl}/viewSuggest/${id}`);
        console.log("Suggestion data:", data);

        setSuggestion(data.suggest);
        console.log("data.suggest.state = ",data.suggest.state);
        
        setState(data.suggest.state?.trim() || ""); // إذا كان فيه قيمة state موجودة
      } catch (err) {
        console.error("Error fetching suggestion:", err);
      }
    };
    getSuggestion();
  }, [id]);


  const handleUpdate = async (id) => {
    try {
      await axios.put(`${apiUrl}/updateSuggest/${id}`, { state });
      toast.success("Status has been changed successfully")
      
    navigate("/Index/Dashboard");
    } catch (err) {
      console.error("Error updating suggestion:", err);
    }
  };



  return (
    <div className="flex justify-center items-center mt-20 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center  mb-6" style={{color}}>Update Suggestion</h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold">Name</label>
            <input type="text" value={suggestion.name || ''} disabled className="bg-gray-100 p-2 rounded border border-gray-300" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold">Email</label>
            <input type="text" value={suggestion.email || ''} disabled className="bg-gray-100 p-2 rounded border border-gray-300" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold">Title</label>
            <input type="text" value={suggestion.title || ''} disabled className="bg-gray-100 p-2 rounded border border-gray-300" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold">Date</label>
            <input
  type="text"
  value={
    suggestion.createdAt
      ? new Date(suggestion.createdAt).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : ''
  }
  disabled
  className="bg-gray-100 p-2 rounded border border-gray-300"
/>

          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select state</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={()=>handleUpdate(suggestion._id)}
              className=" text-white px-6 py-2 rounded  transition" style={{background:color}}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSuggest;
