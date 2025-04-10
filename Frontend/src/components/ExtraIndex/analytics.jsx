import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../Index/Nav';

const Analytics = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // استبدال الـ userId بالـ ID الحقيقي للمستخدم
        const response = await axios.post('http://localhost:4000/getUserPosts', { userId: user._id });

        if (response.data.error) {
          setError(response.data.message);
        } else {
          setPosts(response.data.posts);
        }
      } catch (err) {
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user._id]);

  return (
    <div className="min-h-screen bg-gray-50">
        <Nav />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Posts</h1>

        {loading ? (
          <div className="text-center text-gray-600 text-lg font-semibold mt-10">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg font-semibold mt-10">{error}</div>
        ) : posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                
                 <img src={post.ProfileImage || 'https://via.placeholder.com/50'} alt={post.author} className="w-12 h-12 rounded-full mr-3" />
                  <h2 className="text-lg font-semibold text-gray-700">{post.author}</h2>
                </div>
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover rounded-lg mb-4 shadow-sm" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">{post.likes}</span> Likes
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-500">{post.comments.length}</span> Comments
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg font-semibold mt-10">You have not posted anything yet.</div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
