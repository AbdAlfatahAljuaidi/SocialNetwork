import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Notifications = () => {
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const { data } = await axios.post(`${apiUrl}/getSuggestionsForUser`,{
          name:user.Name,
        })
        
        
        console.log(data);
        setSuggestions(data);
      } catch (error) {
        console.error("خطأ أثناء جلب الاقتراحات:", error);
      }
    };

    fetchSuggestions();
  }, []);

  const getStatusStyle = (state) => {
    switch (state) {
      case 'Pending':
        return 'bg-blue-100 text-white';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
        case 'Rejected':
        return 'bg-red-100 text-white-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow">
          <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">
            Suggestions and Complaints
          </h1>

          {suggestions.length > 0 ? (
            <div className="space-y-4">
              {suggestions.map((suggest) => (
                <div
                  key={suggest._id}
                  className="block bg-gray-50 p-5 rounded-xl shadow-inner transition hover:bg-gray-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {suggest.type}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(suggest.state)}`}>
                      {suggest.state || 'Pending'}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-1">
                    {suggest.details}
                  </p>

                  <p className="text-sm text-gray-400">
                    {new Date(suggest.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No suggestions or complaints yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
