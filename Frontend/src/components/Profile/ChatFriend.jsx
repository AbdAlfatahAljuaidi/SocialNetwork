import { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';

import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../Index/Nav';
import ItImage from '../../assets/IT.jpeg';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
const socket = io(`${apiUrl}`);

import { useTranslation } from 'react-i18next';

const ChatFriend = ({changeLanguage}) => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false); // حالة تحميل الرسائل
  const [loadingNotification, setLoadingNotification] = useState(false); // إشعار التحميل
  const inputRef = useRef();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef();
  const [profile, setProfile] = useState(null);
  const [loadingOldMessages, setLoadingOldMessages] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  
    const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");
    const params=useParams()

  const { t } = useTranslation();

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    socket.on('receive_private_message', (data) => {
      setMessages(prev => [...prev, data]);
    });
  
    socket.on('show_typing_status', () => setTyping(true));
  
    socket.on('clear_typing_status', () => {
      setTimeout(() => setTyping(false), 2000);
    });
  
    return () => {
      socket.off('receive_private_message');
      socket.off('show_typing_status');
      socket.off('clear_typing_status');
    };
  }, []);
  

  const handleTyping = () => socket.emit('typing');
  const handleStopTyping = () => socket.emit('stop_typing');


  function generateRoomId(userId1, userId2) {
    return [userId1, userId2].sort().join("-");
  }
  const roomId = generateRoomId(user.Name, params.username);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const messageText = inputRef.current.value.trim();
  
    if (messageText && profile) {
      const newMessage = {
        senderName: user.Name,
        receiverName: params.username,
        roomId,
        profileImage: profile[0].imageUrl,
        major: roomId,
        message: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
  
      // إرسال الرسالة عبر السوكيت
      socket.emit('private_message', { messageData: newMessage, roomId });
  
      // مسح الحقل
      inputRef.current.value = '';
  
    
  
      // التمرير للأسفل بعد الإضافة
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  
  

  useEffect(() => {
    async function sendReq() {
      try {
        const { data } = await axios.get(`${apiUrl}/User/GetProfile`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfile(data.getProfile);
      } catch (error) {
        console.error("Error fetching profile Info:", error);
        navigate('/Index/Profile/Update');
      }
    }

    sendReq();
  }, []);

  const sender = user.Name
  const receiver= params.username

  const fetchMessages = async (initial = false) => {
    setLoading(true); // بدء التحميل
    setLoadingNotification(true); // تفعيل إشعار التحميل
  
    try {
      const { data } = await axios.get(
        `${apiUrl}/getPrivateMessage/${receiver}?skip=${initial ? 0 : skip}&sender=${sender}`
      );
  
      if (data.length < 10) setHasMore(false);
  
      if (initial) {
        setMessages(data.reverse());
        setSkip(data.length);
      } else {
        setMessages(prev => [...data.reverse(), ...prev]);  // نضيف الرسائل الجديدة في البداية
      }
      
      
  
      setSkip(prev => prev + data.length);
    } catch (err) {
      console.error("❌ Error loading messages:", err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setLoadingNotification(false);
      }, 3000);
    }
  };
  
  useEffect(() => {
    const container = messagesContainerRef.current;
  
    const handleScroll = async () => {
      if (container.scrollTop === 0 && hasMore && !loadingOldMessages) {
        setLoadingOldMessages(true);
  
        // حفظ ارتفاع المحتوى قبل تحميل الرسائل
        const oldScrollHeight = container.scrollHeight;
  
        await fetchMessages(false);  // جلب المزيد من الرسائل
  
        // الفرق بين ارتفاع المحتوى قبل وبعد التحميل
        const newScrollHeight = container.scrollHeight;
        const heightDiff = newScrollHeight - oldScrollHeight;
  
        // تعديل scrollTop ليبقى المستخدم في نفس المكان
        container.scrollTop = heightDiff;
  
        setLoadingOldMessages(false);
      }
    };
  
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasMore, skip, loadingOldMessages]);
  
  useEffect(() => {
    if (roomId) {
      socket.emit('join_room', roomId);
    }
  }, [roomId]);
  

  useEffect(() => {
    const container = messagesContainerRef.current;
  
    if (!container || !messagesEndRef.current) return;
  
    const isUserNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 300;
  
    if (isUserNearBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
   // تفعيل التمرير عند تغيير الرسائل
   const currentUser = JSON.parse(localStorage.getItem("user")) || { id: "1", username: "Guest" };

useEffect(() => {
  fetchMessages().then(() => {
    setLoadingMessages(false);
  });
}, []);




  

  return (
    <div className="flex flex-col h-screen bg-gray-100">

    {/* Navbar */}
    <div className="fixed top-0 left-0 w-full z-50">
      <Nav />
    </div>

    {loadingMessages && (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    <span className="ml-4 text-blue-700 font-medium">
{t('loading_messages')}</span>
  </div>
)}

  
    {/* Welcome Header */}
    <div className="fixed md:top-[94px] top-[240px] left-1/2 transform -translate-x-1/2 w-full max-w-[970px] bg-white border border-blue-200 rounded-xl px-4 py-4 flex items-center gap-4 z-40 shadow">
      <img src={ItImage} alt="Group Chat" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow" />
      <div className="text-sm text-gray-700 leading-snug">
        <h2 className="text-lg font-bold mb-1" style={{color:color}}>
          
{t('chat_welcome')}</h2>
        <p>
        {t('chat_description')}
        </p>
      </div>
    </div>
  
    {/* Chat Content */}
    <div className="w-full lg:w-2/3 flex flex-col relative pt-[390px] md:pt-[200px] mx-auto" style={{ height: "100vh" }}>
      <div className="flex-1 overflow-y-auto px-4 pb-32" ref={messagesContainerRef}>
      <ul className="space-y-4">
  {messages.map((msg, index) => {
    const isMe = msg.senderName === user.Name;
    // تحقق مما إذا كانت الرسالة تخص المستخدم الحالي
    return (
      <li key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[75%] flex ${isMe ? 'flex-row' : 'flex-row-reverse'} items-start gap-3`}>
       
        <div
  className={`rounded-xl p-4 shadow min-w-44 ${
    isMe
      ? 'text-white'
      : 'bg-white text-gray-800 border border-gray-200'
  }`}
  style={isMe ? { backgroundColor: color } : {}}
>
            <div className="flex justify-between">
              <div>
              <div className="font-semibold">{msg.senderName}</div>
              <div className="text-xs text-gray-300">{msg.major}</div>
              </div>
            <div className="text-[10px] text-gray-300 mt-1 text-right">{msg.time}</div>
            </div>
          
            <div className="mt-1 text-sm">{msg.message}</div>
          
          </div>
        </div>
        <img
            src={msg.profileImage}
            alt="profile"
            className="w-10 mx-2 h-10 rounded-full object-cover border"
          />
        <div>
      
        </div>
        

      </li>
      
    );
    
  })}
</ul>

{typing && (
          <p  className="text-sm text-gray-500 mt-4 transition-opacity duration-300 ease-in-out">
            📝    {t('friend_is_typing')} 
          </p>
        )}

      
  
        {loadingNotification && (
          <div className="absolute top-7 left-0 right-0  text-white text-center py-2 z-50" style={{background:color}}>
            <span> {t('loading_more_messages')}
         </span>
          </div>
        )}
  
        <div ref={messagesEndRef} />
      </div>
  
      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-[-30px]  left-0 right-0 px-6 py-4 bg-white border-t border-gray-200 flex items-center gap-3"
      >
        <textarea
          ref={inputRef}
          autoComplete="off"
          onKeyDown={handleTyping}
          onKeyUp={handleStopTyping}
          placeholder={t('send_your_message')}
         
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          type="submit"
          className=" text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          style={{background:color}}
        >
          {t('send')}
         
        </button>
      </form>
    </div>
  </div>
  );
};

export default ChatFriend;
