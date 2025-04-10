import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const sampleNotifications = [
  {
    id: 1,
    username: "Ahmed",
    title: "How to learn React?",
    postId: "123",
    createdAt: "2025-04-09T10:30:00Z"
  },
  {
    id: 2,
    username: "Lina",
    title: "What is Node.js?",
    postId: "124",
    createdAt: "2025-04-09T12:15:00Z"
  },
  {
    id: 3,
    username: "Omar",
    title: "Best resources for learning programming",
    postId: "125",
    createdAt: "2025-04-08T16:45:00Z"
  }
];

const Notifications = () => {
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // محاكاة لجلب البيانات من API
    setNotifications(sampleNotifications);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow">
          <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">Notifications</h1>

          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notif) => (
                <Link
                  to={`/Index/Post/${notif.postId}`}
                  key={notif.id}
                  className="block bg-gray-50 p-5 rounded-xl shadow-inner transition hover:bg-gray-100"
                >
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">{notif.username}</span> posted a new question:
                    <span className="text-blue-600 ml-1">"{notif.title}"</span>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No new notifications yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
