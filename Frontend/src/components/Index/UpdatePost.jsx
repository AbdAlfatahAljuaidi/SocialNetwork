import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const UpdatePost = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    imageUrl: '',
    text: '',
    ProfileImage: '',
    username: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/getPost/${params.id}`);
        setPost({
          imageUrl: data.post.imageUrl || '',
          text: data.post.text || '',
          ProfileImage: data.post.ProfileImage || '',
          username: data.post.username || ''
        });
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    getPost();
  }, [params.id]);

  const handleTextChange = (e) => {
    setPost((prev) => ({
      ...prev,
      text: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create a temporary URL for preview
      setPost((prev) => ({
        ...prev,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('text', post.text);
      if (selectedImage) {
        formData.append('file', selectedImage);
      }

      await axios.put(`${apiUrl}/updatePost/${params.id}`, formData, {
       
      });
toast.success("Post has been updated successfully")
      navigate('/index'); 
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Post</h1>

      {/* عرض شكل البوست */}
      <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={post.ProfileImage || 'https://via.placeholder.com/50'}
            alt={post.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <h3 className="text-lg font-semibold">{post.username}</h3>
        </div>

        {/* تعديل النص */}
        <textarea
          name="text"
          value={post.text}
          onChange={handleTextChange}
          placeholder="Write your text..."
          className="w-full border border-gray-300 p-2 rounded mb-4"
          rows="3"
        />

        {/* رفع صورة جديدة */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-gray-300 p-2 rounded mb-4"
        />

        {/* عرض الصورة الجديدة أو القديمة */}
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Post"
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}
      </div>

      {/* زر الحفظ */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default UpdatePost;
