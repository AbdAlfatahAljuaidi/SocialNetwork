import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Menu from './Menu';

const Top = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  useEffect(() => {
    const fetchTopPost = async () => {
      try {
        const res = await axios.get(`${apiUrl}/getTopLikedPost`); // غيّر الرابط إذا API مختلف
        setPost(res.data);
      } catch (err) {
        console.error('Error fetching top post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPost();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!post) return <div className="text-center mt-10">No top post found.</div>;

  return (
    <div>
        <Nav />
        <div className='flex gap-4 px-6 py-10  mx-auto '>
        <div className=''>
          <Menu className="w-2 " />
        </div>
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">🔥 Most Liked Post</h2>

      <div className="flex items-center space-x-4 mb-4">
        <img
          src={post.ProfileImage}
          alt={post.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{post.username}</h3>
          <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <p className="text-gray-800 mb-4">{post.text}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-full rounded mb-4"
        />
      )}

      <div className="text-sm text-gray-600 mb-2">❤️ {post.likes} Likes</div>

      <div className="mt-4">
        <h4 className="text-lg font-medium mb-2">💬 Comments</h4>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment._id} className="flex items-start space-x-3 mb-3">
              <img
                src={comment.imageUser}
                alt={comment.user}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{comment.user}</p>
                <p className="text-sm">{comment.content}</p>
                <p className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
    

        
        </div>
   
    </div>
  );
};

export default Top;
