import React, { useState, useEffect } from 'react';
import Nav from '../Index/Nav';
import { FaHeart, FaComment } from 'react-icons/fa';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import Menu from '../Index/Menu';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
import { useTranslation } from "react-i18next"; // ✅ إضافة i18n

const Bookmarks = ({changeLanguage}) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
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
    <div className='flex gap-4 py-10 mx-auto'>
      <div>
        <Menu className="w-2 " />
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {t("saved_bookmarks")}
        </h1>

        {loading ? (
          <div className="text-center text-gray-600 text-lg font-semibold mt-10">
            {t("loading")}
          </div>
        ) : error ? (
          <div className="text-center text-lg font-semibold mt-10">
            {error}
          </div>
        ) : bookmarks.length > 0 ? (
          <div className="space-y-6 md:w-[900px] mx-2">
            {bookmarks.map((post, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex justify-between">
                  <div className="flex items-center mb-4">
                    <img
                      src={post.ProfileImage || 'https://via.placeholder.com/50'}
                      alt={post.author}
                      className="w-12 h-12 rounded-full mx-3"
                    />
                    <div>
                      <h2 className="text-lg font-bold text-gray-700">{post.username}</h2>
                      <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleString("EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => removeBookmark(post._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
                <p className=" mx-3 pb-2">{post.text}</p>
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-lg mb-4 shadow-sm"
                />
               
                <div className="flex mx-3 items-center justify-between text-gray-600">
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
          <div className="text-center text-gray-600 text-lg font-semibold mt-10">
            {t("no_bookmarks")}
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default Bookmarks;
