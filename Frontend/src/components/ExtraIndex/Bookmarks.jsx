import React, { useState, useEffect } from 'react';
import Nav from '../Index/Nav';
import { FaHeart, FaComment } from 'react-icons/fa';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import Menu from '../Index/Menu';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
       // استبدلها بـ userId الحقيقي
        const response = await axios.post(`${apiUrl}/showBookmarks`, { userId:user._id });

        if (response.data.error) {
          setError(response.data.message);
        } else {
          setBookmarks(response.data.posts);
        }
      } catch (err) {
        setError("No bookmarks saved yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);



  const removeBookmark = async (postId) => {
    try {
      // إرسال طلب حذف البوست إلى السيرفر
      const response = await axios.post(`${apiUrl}/removeBookmark`, {
       userId: user._id, postId
      });

      toast.success(response.data.message)
  
      if (response.data.error) {
        setError(response.data.message);
      } else {
        // إذا تم الحذف بنجاح، قم بتحديث الـ bookmarks بحيث لا يحتوي على البوست المحذوف
        const updatedBookmarks = bookmarks.filter((post) => post._id !== postId);
        setBookmarks(updatedBookmarks);
      }
    } catch (err) {
      setError("Failed to remove bookmark.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Saved Bookmarks</h1>

        {loading ? (
          <div className="text-center text-gray-600 text-lg font-semibold mt-10">Loading...</div>
        ) : error ? (
          <div className="text-center  text-lg font-semibold mt-10">{error}</div>
        ) : bookmarks.length > 0 ? (
          <div className="space-y-6">
         
            {bookmarks.map((post, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className='flex justify-between'>
                  
                <div className="flex items-center mb-4">
                  <img src={post.ProfileImage || 'https://via.placeholder.com/50'} alt={post.author} className="w-12 h-12 rounded-full mr-3" />
                  <h2 className="text-lg font-semibold text-gray-700">{post.username}</h2>
                </div>
                <button onClick={() => removeBookmark(post._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
               
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover rounded-lg mb-4 shadow-sm" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center space-x-2">
                    <FaHeart className="text-red-500 text-lg" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaComment className="text-blue-500 text-lg" />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg font-semibold mt-10">No bookmarks saved yet.</div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
