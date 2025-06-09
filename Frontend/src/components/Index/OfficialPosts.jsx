import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { toast } from 'react-toastify';
import { FaTrash } from "react-icons/fa";
import Testt from "../Testt";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // مهم لستايل التحميل
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
import { io } from 'socket.io-client';

import { useTranslation } from 'react-i18next';

const socket = io(`${apiUrl}`);

const OfficialPosts = ({changeLanguage}) => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [showAllComments, setShowAllComments] = useState({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userData, setuserData] = useState(JSON.parse(localStorage.getItem("userData")));
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const [note,setNote] =useState([])
  const [fromAdmin,setFromAdmin] =useState(true)
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
    const [isLiked, setIsLiked] = useState(false);
  const [notification, setNotification] = useState([]);
  
    const [openPostOptionsId, setOpenPostOptionsId] = useState(null);
  

    const { t } = useTranslation();

    const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/posts`, { maxRedirects: 0 });
  
        // فلترة البوستات حسب fromAdmin
        const adminPosts = res.data.filter(post => post.fromAdmin === true);
  
        setPosts(adminPosts);
      } catch (error) {
        console.error("حدث خطأ أثناء جلب البوستات:", error);
      }
    };
  
    fetchPosts();
  }, []);
  
  const handleFileUpload = async () => {
    // if (!postImage) {
    //   console.error("No file selected.");
    //   toast.error("No file selected")
    //   return;
    // }
  
    // التأكد من أن المستخدم لديه صورة للبروفايل
    if (!user || !user.profileImage) {
      toast.error("You cannot publish the post before creating your own profile.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", postImage);
    formData.append("text", postText);
    formData.append("likes", 0);
    formData.append("username", user.Name);
    formData.append("fromAdmin", fromAdmin);
    formData.append("ProfileImage", user.profileImage);
  
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      // إضافة المنشور الجديد مع الصورة و التاريخ
      const newPost = {
        ...data.post,  // الحصول على المنشور من البيانات المرسلة
        createdAt: new Date(data.post.createdAt).toLocaleString(),  // تحويل التاريخ إلى تنسيق مناسب
      };
  
      setPosts((prevPosts) => [newPost, ...prevPosts]);

      setPostText(""); // إعادة تعيين النص
      setPostImage(null);
      
      const messageData = {
        username: user.Name,
        profileImage: user.profileImage,
        message: "Admin has been added a post now",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };// إعادة تعيين الصورة

      socket.emit('Send_notification',messageData);
      toast.success(data.message)
    } catch (error) {
      console.error("حدث خطأ أثناء تحميل الصورة:", error);
      toast.error(error.response.data.message);
    }
  };


  
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${apiUrl}/api/posts`);
      console.log(data);

      const adminPosts = data.filter(post => post.fromAdmin === true);

      if (user && data.likedUsers?.includes(user._id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }

      setPosts(adminPosts);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب البوستات:", error);
    } finally {
      setLoading(false);
    }
  };
  

    useEffect(() => {
      fetchPosts();
    }, []);
  

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to socket server');
    });

    socket.on('send_notification_to_all_users', (data) => {
      setNotification(prev => [...prev, data]);
      
      
    });

    
  return () => {
    socket.disconnect();
  };
}, []);



const handleCommentSubmit = async (postId) => {
  try {
    if (!user || !user.profileImage) {
      toast.error("You cannot publish the post before creating your own profile.");
      return;
    }

    setIsSubmitting(true);

    if(commentText[postId] === ""){
      setIsSubmitting(false);
      console.log("test");
      
    }

    // إرسال التعليق للسيرفر
    const { data } = await axios.post(`${apiUrl}/comment/${postId}`, {
      content: commentText[postId] || "",
      userId: user.Name,
      imageUser: user.profileImage,
    });

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [data.comment, ...post.comments] }
          : post
      )
    );

    // مسح محتوى خانة التعليق
    setCommentText((prev) => ({ ...prev, [postId]: "" }));

    
    setIsSubmitting(false);

    // data.comment يجب أن يحتوي على التعليق الجديد من السيرفر
    if (!data || !data.comment) {
      toast.error("لم يتم استلام التعليق من السيرفر.");
      return;
    }

    // تحديث حالة البوست بالتعليق الجديد
 
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};


  
const handleLike = async (postId) => {
  try {
    if (!user || !user.profileImage) {
      toast.error(
        <div>
          Please create your profile before liking posts.{" "}
          <Link to="/index/profile" className="text-blue-500 underline">
            Go to profile
          </Link>
        </div>
      );

      return;
    }

    const { data } = await axios.post(`${apiUrl}/Like/${postId}`, {
      userId: user._id,
    });
    console.log(data);

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          let updatedLikedUsers = [...(post.likedUsers || [])];
          if (data.liked) {
            // أضيف المستخدم
            if (!updatedLikedUsers.includes(user._id)) {
              updatedLikedUsers.push(user._id);
            }
          } else {
            // إحذف المستخدم
            updatedLikedUsers = updatedLikedUsers.filter(
              (id) => id !== user._id
            );
          }

          return {
            ...post,
            likes: data.likes,
            liked: data.liked,
            likedUsers: updatedLikedUsers,
          };
        }
        return post;
      })
    );
  } catch (error) {
    console.error(error);
  }
};


  const deletePost = async (postid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post(`${apiUrl}/deletePost`, {
        postid: postid,
      });

      toast.success(data.message);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postid));
    } catch (error) {
      console.log(error.response);
      toast.error("Failed to delete post");
    }
  };



  const savePost = async (postid)=> {
    try {
   
      
      const {data} = await axios.post(`${apiUrl}/savePost`,{
        postId:postid,
        userId:user._id
      })

      toast.success(data.message)
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      
      
    }
  }

  const removeComment = async (postId, commentId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!confirmDelete) return;

      const response = await axios.post(
        `${apiUrl}/deleteComment/${postId}/${commentId}`
      );

      // تحديث التعليقات بإزالة التعليق المحذوف
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment._id !== commentId
                ),
              }
            : post
        )
      );

      // مسح نص التعليق (ما إلها علاقة بالحذف، لكن بنخليها لو كان فيه input مفتوح)
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      toast.success("Comment has been deleted successfully");
    } catch (error) {
      console.error(
        "Failed to delete comment:",
        error.response?.data?.message || error.message
      );
    }
  };


  

  
  
  return (
    <div className="w-full mx-auto p-4">
     {user?.admin && (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    <textarea
      className="w-full p-2 border rounded mb-2"
      placeholder={t('whats_on_your_mind')}
      value={postText}
      onChange={(e) => setPostText(e.target.value)}
    />
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setPostImage(e.target.files[0])}
      className="mb-2"
    />
    <button
      onClick={handleFileUpload}
      className="text-white px-4 py-2 rounded"
      style={{ background: color }}
    >
       {t('post')}
    </button>
  </div>
)}
      {/* <div>
            <h1>📢 المنشورات</h1>
            {note.length === 0 && <p>لا توجد منشورات بعد...</p>}
            {note.map((post, index) => (
                <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                    <h3>{post.username}</h3>
                    <p>{post.text}</p>
                    {post.imageUrl && <img src={post.imageUrl} alt="Post" style={{ maxWidth: "100%", height: "auto" }} />}
                </div>
            ))}
        </div> */}

        

      {/* عرض البوستات */}
      <div className="space-y-4">
      {posts && posts.length > 0 ? (
  posts.map((post) => (
          <div key={post._id} className="bg-white shadow-md rounded-lg p-4">
         
            <div className="flex justify-between">
            <div className="flex items-center gap-4">
            <Link to={`/index/profile/${post.username}/${user.Name}`}>
                <img
                  src={post.ProfileImage}
                  className="w-16 h-16 rounded-full border border-black"
                  alt="User Profile"
                />
                </Link>
                <div>
                <Link to={`/index/profile/${post.username}/${user.Name}`}>
                  <h1 className="font-bold text-2xl">{post.username}</h1>
                  </Link>
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

              <div className="relative">
      {/* أيقونة القائمة */}
      <div
        onClick={() =>
          setOpenPostOptionsId(
            openPostOptionsId === post._id ? null : post._id
          )
        }
        className="cursor-pointer p-2 hover:bg-gray-200 rounded"
      >
        <SlOptionsVertical />
      </div>

      {/* قائمة الخيارات */}
      {openPostOptionsId === post._id && (
        <div
         
          className="absolute z-50 right-0 mt-2 w-40 bg-white shadow-lg rounded border p-2"
        >
          <button
         onClick={() => savePost(post._id)}
            className="block w-full text-left p-2 hover:bg-gray-100"
          >
            Save Post
          </button>
          <button
          
          className={`${user.Name === post.username ? "block" : "hidden"} w-full text-left p-2 text-red-500 hover:bg-red-100`}
onClick={()=> deletePost(post._id)}
          >
            Delete Post
          </button>
         
        </div>
        
      )}
    </div>

            </div>
           
              <p className="text-black mt-3">{post.text}</p>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="mt-2 w-full h-auto"
                />
              )}
          

           {/* زر الإعجاب */}
           <div className="flex items-center space-x-2 mt-3">
                <button
                  onClick={() => handleLike(post._id)}
                  className={`px-4 py-2 rounded-lg transition-all mx-2 duration-300 ${
                    post.liked
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {post.likedUsers.includes(user._id) ? "❤️ " : "🤍"}
                </button>

                <span className="text-lg font-semibold text-gray-700 mx-2">
                  {post.likes}
                </span>

                <span className="text-lg font-semibold text-gray-700"></span>
              </div>

            {/* إدخال التعليق */}
            <div className="mt-4">
              <input
                type="text"
                placeholder={t('write_a_comment')}
                value={commentText[post._id] || ""}
                onChange={(e) =>
                  setCommentText({ ...commentText, [post._id]: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <button
                disabled={isSubmitting}
                onClick={() => handleCommentSubmit(post._id)}
                className="mt-2  text-white px-4 py-1 rounded"
                style={{
                  background:color
                }}
              >
                 {isSubmitting ? t('commenting') : t('comment')}
              </button>
            </div>

            {/* عرض التعليقات */}
            <div className="mt-4 space-y-2">
              {(showAllComments[post._id]
                ? post.comments
                : post.comments.slice(0, 2)
              ).map((comment, cIndex) => (
                <div key={cIndex} className="p-2 border rounded bg-gray-100">

                  <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    
                  <img src={comment.imageUser} className="w-12 h-12 rounded-full" alt="" />
<div>
<h1 >{comment.user}</h1>
                  <h1 className="text-gray-500"> {new Date(comment.createdAt).toLocaleString("EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}</h1>
</div>
                  </div>



                  <div>  <div>
  {comment.user === user.Name && (
    <button
      onClick={() => removeComment(post._id, comment._id)}
      className="text-red-500 hover:text-red-700"
    >
      <FaTrash />
    </button>
  )}
</div>
</div>
                  </div>
                
                
                  <p className="mt-3 ">{comment.content}</p>
                </div>
              ))}
              {post.comments.length > 2 && (
                <button
                  onClick={() =>
                    setShowAllComments((prev) => ({
                      ...prev,
                      [post._id]: !prev[post._id],
                    }))
                  }
                >
                  {showAllComments[post._id] ? "Show Less" : "More"}
                </button>
              )}
            </div>
          </div>
        ))) : (
          <>
           {loading && (
  <div className="mt-6 space-y-6 animate-pulse">
    {/* شريط تحميل علوي */}
    <div className="h-2 w-1/4 bg-blue-300 rounded-full mx-auto"></div>

    {/* بوست وهمي رقم 1 */}
    <div className="bg-white p-5 rounded-xl shadow-md space-y-3">
      <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
      <div className="h-3 w-full bg-gray-200 rounded"></div>
      <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
    </div>

    {/* بوست وهمي رقم 2 */}
    <div className="bg-white p-5 rounded-xl shadow-md space-y-3">
      <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
      <div className="h-3 w-full bg-gray-200 rounded"></div>
      <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
    </div>
  </div>
)}
          </>
        )}
      </div>
    </div>
  );
};

export default OfficialPosts;
