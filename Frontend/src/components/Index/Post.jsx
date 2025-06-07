import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import Testt from "../Testt";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // مهم لستايل التحميل
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
import { MdOutlineSportsScore } from "react-icons/md";

import { useTranslation } from 'react-i18next';

const Post = ({changeLanguage}) => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [showAllComments, setShowAllComments] = useState({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [openPostOptionsId, setOpenPostOptionsId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [color, setColor] = useState(
    localStorage.getItem("mainColor") || "#1D4ED8"
  );
  const [top, setTop] = useState();
  const [topComment, setTopComment] = useState();
  const [topPoints, setTopPoints] = useState();
  const [questionType, setQuestionType] = useState("");
  const [filterType, setFilterType] = useState("");
  const [topFriend, setTopFriend] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loadingMessages, setLoadingMessages] = useState(true);


  const { t } = useTranslation();
  useEffect(() => {

    
    const fetchTopUser = async () => {
      try {
        const res = await axios.get("/api/profile/top-user-friends"); // تأكد من المسار الصحيح
        setTop(res.data);
      } catch (error) {
        console.error("Error fetching top user:", error);
      }
    };

    fetchTopUser();
  }, []);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const { data } = await axios.get(`${apiUrl}/api/posts?page=${page}`);
      console.log(data);

      // Check if the user liked any of the new posts (optional logic)
      if (user && data.some(post => post.likedUsers?.includes(user._id))) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }

      setPosts(prev => [...prev, ...data]);

      // إذا عدد النتائج أقل من 5، معناها ما في بوستات أكثر
      if (data.length < 5) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
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
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading
      ) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);


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
        const adminPosts = res.data.filter((post) => post.fromAdmin === false);

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

    setIsSubmittingPost(true);

    // التأكد من أن المستخدم لديه صورة للبروفايل
    if (!user || !user.profileImage) {
     
      toast.error(
        <div>
          You cannot publish a post before creating your own profile.{" "}
          <Link to="/index/profile" className="text-blue-500 underline">
            Go to profile
          </Link>
        </div>
      );
      return;
    }

    if (questionType == "") {
      setIsSubmittingPost(false);
      toast.error("You must select question type");
      return;
    }

    const formData = new FormData();
    formData.append("file", postImage);
    formData.append("text", postText);
    formData.append("likes", 0);
    formData.append("username", user.Name);
    formData.append("questionType", questionType);
    formData.append("ProfileImage", user.profileImage);

    try {
      const { data } = await axios.post(`${apiUrl}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // إضافة المنشور الجديد مع الصورة و التاريخ
      const newPost = {
        ...data.post, // الحصول على المنشور من البيانات المرسلة
        createdAt: new Date(data.post.createdAt).toLocaleString(), // تحويل التاريخ إلى تنسيق مناسب
      };

      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setQuestionType("");
      setPostText(""); // إعادة تعيين النص
      setPostImage(null); // إعادة تعيين الصورة
      setIsSubmittingPost(false);
      toast.success("Post added successfully");
    } catch (error) {
      setIsSubmittingPost(false);
      console.error("حدث خطأ أثناء تحميل الصورة:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      setIsSubmitting(true);

      if (!commentText[postId]) {
        toast.error("Comment cannot be empty");
        setIsSubmitting(false);
        return;
      }

      if (!user || !user.profileImage) {
        toast.error(
          <div>
            You cannot comment before creating your own profile.{" "}
            <Link to="/index/profile" className="text-blue-500 underline">
              Go to profile
            </Link>
          </div>
        );
        setIsSubmitting(false);
        return;
      }

      const { data } = await axios.post(`${apiUrl}/comment/${postId}`, {
        content: commentText[postId] || "",
        userId: user.Name,
        imageUser: user.profileImage,
      });

      console.log(data);

      // تأكد من أن البيانات التي تستقبلها تحتوي على user و content

      // تحديث الـ posts بالـ comment الجديد
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [data.comment, ...post.comments],
              }
            : post
        )
      );

      // مسح محتوى التعليق بعد الإرسال
      setCommentText((prev) => ({ ...prev, [postId]: "" }));

      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
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

  const savePost = async (postid) => {
    try {
      const { data } = await axios.post(`${apiUrl}/savePost`, {
        postId: postid,
        userId: user._id,
      });

      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

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

  useEffect(() => {
    const fetchTopPost = async () => {
      try {
        const res = await axios.get(`${apiUrl}/getTopLikedPost`); // غيّر الرابط إذا API مختلف
        setTop(res.data);
        console.log("tiop",res.data);
        
        console.log("res.comment", res.data);
      } catch (err) {
        console.error("Error fetching top post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPost();
  }, []);

  useEffect(() => {
    const fetchTopCommentedPost = async () => {
      try {
        const res = await axios.get(`${apiUrl}/getTopCommentedPost`); // استدعاء الـ API الجديد
        setTopComment(res.data);
      } catch (err) {
        console.error("Error fetching top commented post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCommentedPost();
  }, []);


  useEffect(() => {
    const fetchTopPoints = async () => {
      try {
        const res = await axios.get(`${apiUrl}/mostPoints`); // استدعاء الـ API الجديد
        setTopPoints(res.data);
      } catch (err) {
        console.error("Error fetching top Points post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPoints();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (!filterType) return true; // إذا لم يتم تحديد فلتر، يتم عرض جميع البوستات
    return post.questionType === filterType; // تصفية البوستات حسب النوع
  });

  useEffect(() => {
    const fetchTopUser = async () => {
      try {
        const res = await axios.post(`${apiUrl}/topUserFriends`); // تأكد من المسار الصحيح
        setTopFriend(res.data);
        console.log("datafriend=", res.data);
      } catch (error) {
        console.error("Error fetching top user:", error);
      }
    };

    fetchTopUser();
  }, []);

  if (!top) return null;




  const handleSelectCorrectAnswer = async (postID, commentID) => {
    try {
      const res = await fetch(`${apiUrl}/selectCorrectAnswer`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postID, commentID }),
      });
  
      const data = await res.json();
  
      if (!data.error) {
        // تحديث الحالة في الواجهة الأمامية بدون reload
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id !== postID) return post;
  
            return {
              ...post,
              comments: post.comments.map((comment) => ({
                ...comment,
                correct:
                  comment._id === commentID
                    ? !comment.correct
                    : false, // تأكد إن الباقي يكون false
              })),
            };
          })
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("خطأ في الاتصال بالسيرفر");
    }
  };
  
  const handleCopyLink = (postId) => {
    const postLink =`http://localhost:5173/SharePost/${postId}`;
    navigator.clipboard.writeText(postLink)
      .then(() => {
        alert('تم نسخ الرابط بنجاح!');
      })
      .catch(err => {
        console.error('فشل النسخ: ', err);
      });
  };

  return (

    
   <div className="w-full mx-auto p-4 mt-5">
  {loading && (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div
        className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent"
        style={{
          borderColor: color,
          borderTopColor: "transparent",
        }}
      ></div>
    </div>
  )}

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder={t('whats_on_your_mind')}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />

        {/* فلتر نوع السؤال */}
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="">{t('select_question_type')}</option>
          <option value="Educational and Psychological Sciences">
          {t('educational_psychological_sciences')}
          </option>
          <option value="Business">{t('business')}</option>
          <option value="Law">{t('law')}</option>
          <option value="Information Technology">{t('information_technology')}</option>
          <option value="Medicine">{t("major.medicine")}</option>
          <option value="Arts and Sciences">{t('arts_sciences')}</option>
          <option value="Arts and Sciences">{t('aviation_sciences')}</option>
          <option value="Pharmacy">{t('pharmacy')}</option>
          <option value="Engineering">{t('engineering')}</option>
          <option value="Applied Medical Sciences">
          {t('applied_medical_sciences')}
          </option>
          <option value="Sharia">{t('sharia')}</option>
          <option value="Other">{t('other')}</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPostImage(e.target.files[0])}
          className="mb-2 w-56"
        />

        <button
          onClick={handleFileUpload}
          className="text-white px-4 py-2 rounded"
          style={{ background: color }}
          disabled={isSubmittingPost}
        >
        
          {isSubmittingPost ? t('posting') : t('post')}
        </button>
      </div>

   
      {top  && topFriend ? (
  <>
    <h1 className="font-bold text-xl text-center my-6">{t('most_numbers')}</h1>

    <div className="flex flex-col md:flex-row justify-center items-center gap-6 pb-5">
      
      {/* Top liked post */}
      {top && (
        <Link to="/top" className="w-full md:max-w-xs">
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={top.ProfileImage || "https://via.placeholder.com/50"}
                alt={top.username}
                className="w-12 h-12 rounded-full object-cover mx-2"
              />
              <h3 className="text-lg font-semibold">{top.username}</h3>
            </div>
            {top.questionType && (
              <p className="text-sm text-gray-600 mb-2">{top.questionType}</p>
            )}
            {top.ProfileImage && (
              <img
                src={top.ProfileImage}
                alt="Post"
                className="w-full h-32 object-cover rounded mb-4"
              />
            )}
            <div className="text-center text-gray-700">
              ❤️ <span className="font-medium">{top.likes}</span> {t('likes')}
            </div>
          </div>
        </Link>
      )}

      {/* Top topPoints */}
      {topPoints && (
        <div className="w-full md:max-w-xs">
          <Link to={`/index/profile/${topPoints.username}/${user.Name}`}>
            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={topPoints.imageUrl || "https://via.placeholder.com/50"}
                  alt={topPoints.username}
                  className="w-12 h-12 rounded-full object-cover mx-2"
                />
                <h3 className="text-lg font-semibold">{topPoints.username}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{topFriend.major}</p>
              {topPoints.text && (
                <p className="text-sm text-gray-600 mb-2">{topPoints.text}</p>
              )}
              {topPoints.imageUrl && (
                <img
                  src={topPoints.imageUrl}
                  alt="Post"
                  className="w-full h-32 object-cover rounded mb-4"
                />
              )}
              <div className="text-center w-fit mx-auto flex items-center text-gray-700 mt-1">
              <MdOutlineSportsScore className="mx-2" />
              <span className="font-medium">{topPoints.point}</span> {t('profile.points')}
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Top friend */}
      {topFriend && (
        <div className="w-full md:max-w-xs">
          <Link to={`/index/profile/${topFriend.username}/${user.Name}`}>
            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
              <div className="flex items-center mx-5 mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={topFriend.imageUrl || "https://via.placeholder.com/50"}
                    alt={topFriend.username}
                    className="w-12 h-12 rounded-full object-cover mx-2"
                  />
                  <h3 className="text-lg font-semibold mx-2">{topFriend.username}</h3>
                </div>
              </div>
              {topFriend.major && (
                <p className="text-sm text-gray-600 mb-2">{topFriend.major}</p>
              )}
              {topFriend.imageUrl && (
                <img
                  src={topFriend.imageUrl}
                  alt="Post"
                  className="w-full h-32 object-cover rounded mb-4"
                />
              )}
              <div className="text-center text-gray-700">
                👥 <span className="font-medium">{topFriend.friendsCount}</span> {t('friends')}
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  </>
) : (
  <div className="text-center mt-10">
    {t('nothing_to_show')}
  </div>
)}

      <div className="mb-4 w-72">
        <label
          htmlFor="filterType"
          className="block text-gray-700 font-semibold mb-2"
        >
        {t('choose_question_type')}
        </label>
        <select
          id="filterType"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full p-3 border rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value=""> {t('all')}</option>
          <option value="Educational and Psychological Sciences">
          {t('educational_psychological_sciences')}
          </option>
          <option value="Business">{t('business')}</option>
          <option value="Law">{t('law')}</option>
          <option value="Information Technology">{t('information_technology')}</option>
          <option value="Arts and Sciences">{t('arts_sciences')}</option>
          <option value="Aviation Sciences">{t('aviation_sciences')}</option>
          <option value="Pharmacy">{t('pharmacy')}</option>
          <option value="Engineering">{t('engineering')}</option>
          <option value="Applied Medical Sciences">
          {t('applied_medical_sciences')}
          </option>
          <option value="Sharia">{t('sharia')}</option>
          <option value="Other">{t('other')}</option>
        </select>
      </div>

      {/* عرض البوستات */}
      <div className="space-y-4">
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
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
                    <div className="absolute right-0 z-50 mt-2 w-40 bg-white shadow-lg rounded border p-2">
                      <button
                        onClick={() => savePost(post._id)}
                        className="block w-full text-left p-2 hover:bg-gray-100"
                      >
                        Save Post
                      </button>
                      <Link to={`/UpdatePost/${post._id}`}>
                        <button
                          className={`${
                            user.Name === post.username ? "block" : "hidden"
                          } w-full text-left p-2 text-green-500 hover:bg-green-100`}
                        >
                          Update Post
                        </button>
                      </Link>
                      <button
                        className={"w-full text-left p-2 text-blue-500 hover:bg-blue-100"}
                        onClick={() => handleCopyLink(post._id)}
                      >
                        Share Post
                      </button>
                      <button
                        className={`${
                          user.Name === post.username ? "block" : "hidden"
                        } w-full text-left p-2 text-red-500 hover:bg-red-100`}
                        onClick={() => deletePost(post._id)}
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
                <textarea
                  placeholder={t('write_a_comment')}
                  value={commentText[post._id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [post._id]: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
                <button
                  disabled={isSubmitting}
                  onClick={() => handleCommentSubmit(post._id)}
                  className="mt-2  text-white px-4 py-1 rounded"
                  style={{
                    background: color,
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
    <div
    key={cIndex}
    className={`p-4 border rounded ${
      comment.correct
        ? "bg-green-100 border-green-500"
        : "bg-gray-100 border-gray-300"
    }`}
  >
    <div className="flex justify-between items-center mb-2">
      {/* بيانات المستخدم */}
      <Link to={`/index/profile/${comment.user}/${user.Name}`}>
        <div className="flex gap-4 items-center">
          <img
            src={comment.imageUser}
            className="w-12 h-12 rounded-full"
            alt=""
          />
          <div>
            <h1 className="font-semibold">{comment.user}</h1>
            <h1 className="text-gray-500 text-sm">
              {new Date(comment.createdAt).toLocaleString("EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </h1>
          </div>
        </div>
      </Link>
  
      {/* أيقونة الحذف والcheckbox */}
      <div className="flex items-center gap-3">
        {post.username === user.Name && (
          <input
            type="checkbox"
            checked={comment.correct}
            onChange={() => handleSelectCorrectAnswer(post._id, comment._id)}
            className="w-5 h-5 accent-green-600"
            title="Mark as Correct Answer"
          />
        )}
  
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
  
    {/* إذا كان صحيح يظهر علامة ✓ */}
    {comment.correct && (
      <div className="mb-2">
        <span className="text-green-600 font-semibold text-sm">
          ✓ {t('correct_answer')}
        </span>
      </div>
    )}
  
    {/* نص التعليق */}
    <p className="text-gray-800">{comment.content}</p>
  </div>
  
  ))}

  {/* زر إظهار المزيد */}
  {post.comments.length > 2 && (
    <button
      onClick={() =>
        setShowAllComments((prev) => ({
          ...prev,
          [post._id]: !prev[post._id],
        }))
      }
      className=" hover:underline mt-2"
      style={{color:color}}
    >
     
      {showAllComments[post._id] ? "Show Less" : "More"}
    </button>
  )}
</div>
      </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Post;
