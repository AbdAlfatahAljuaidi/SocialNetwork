import { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Nav from '../Index/Nav';
import ItImage from '../../assets/IT.jpeg';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
const socket = io(`${apiUrl}`);

const Chat = () => {
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

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to socket server');
    });

    socket.on('send_messages_to_all_users', (data) => {
      setMessages(prev => [...prev, data]);
    });

    socket.on('show_typing_status', () => setTyping(true));

    socket.on('clear_typing_status', () => {
      setTimeout(() => setTyping(false), 2000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleTyping = () => socket.emit('typing');
  const handleStopTyping = () => socket.emit('stop_typing');

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageText = inputRef.current.value.trim();
    if (messageText && profile) {
      const roomId = profile[0].major;
      const messageData = {
        roomId,
        username: profile[0].username,
        profileImage: profile[0].imageUrl,
        major: roomId,
        message: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      socket.emit('chat message', messageData);
      inputRef.current.value = '';
  
      // التمرير دائمًا للأسفل بعد الإرسال
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // التأخير البسيط يساعد في التأكد من أن الرسالة أُضيفت فعليًا قبل التمرير
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

  const fetchMessages = async (initial = false) => {
    setLoading(true); // بدء التحميل
    setLoadingNotification(true); // تفعيل إشعار التحميل
    try {
      const { data } = await axios.get(`${apiUrl}/messages?skip=${initial ? 0 : skip}`);
      if (data.length < 10) setHasMore(false);
      setMessages(prev => initial ? data.reverse() : [...data.reverse(), ...prev]);
      setSkip(prev => prev + data.length);
    } catch (err) {
      console.error("❌ Error loading messages:", err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setLoadingNotification(false);
      }, 3000); // الإشعار سيبقى ظاهرًا لمدة 1.5 ثانية
    }
  };

  useEffect(() => {
    fetchMessages(true);
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    let isUserAtTop = false;

    const handleScroll = () => {
      if (container.scrollTop === 0 && hasMore) {
        isUserAtTop = true; // المستخدم عند أول الصفحة
        fetchMessages().then(() => {
          // إذا كان المستخدم في أعلى الصفحة، لا نقوم بتغيير الموضع
          if (isUserAtTop) {
            container.scrollTop = 0; // إبقاء المستخدم في نفس المكان بعد التحميل
          }
        });
      }
    };

    if (container) container.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [hasMore, skip]);

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
  

  return (
    <div className="flex flex-col h-screen bg-gray-100">
    {/* Navbar */}
    <div className="fixed top-0 left-0 w-full z-50">
      <Nav />
    </div>
  
    {/* Welcome Header */}
    <div className="fixed md:top-[94px] top-[240px] left-1/2 transform -translate-x-1/2 w-full max-w-[970px] bg-white border border-blue-200 rounded-xl px-4 py-4 flex items-center gap-4 z-40 shadow">
      <img src={ItImage} alt="Group Chat" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow" />
      <div className="text-sm text-gray-700 leading-snug">
        <h2 className="text-lg font-bold text-blue-700 mb-1">Welcome to the Chat Room!</h2>
        <p>
          A place for students to connect, share knowledge, and support each other.
          Stay respectful, be kind, and enjoy the chat!
        </p>
      </div>
    </div>
  
    {/* Chat Content */}
    <div className="w-full lg:w-2/3 flex flex-col relative pt-[390px] md:pt-[200px] mx-auto" style={{ height: "100vh" }}>
      <div className="flex-1 overflow-y-auto px-4 pb-32" ref={messagesContainerRef}>
      <ul className="space-y-4">
  {messages.map((msg, index) => {
    const isMe = msg.username === user.Name; // تحقق مما إذا كانت الرسالة تخص المستخدم الحالي
    return (
      <li key={index} className={`flex ${isMe ? 'justify-start' : 'justify-end'}`}>
        <div className={`max-w-[75%] flex ${isMe ? 'flex-row' : 'flex-row-reverse'} items-start gap-3`}>
          <img
            src={msg.profileImage}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div
            className={`rounded-xl p-4 shadow min-w-44 ${
              isMe
                ? 'bg-blue-500 text-white'  // رسائلك على اليسار مع خلفية زرقاء
                : 'bg-white text-gray-800 border border-gray-200'  // رسائل الآخرين على اليمين مع خلفية بيضاء
            }`}
          >
            <div className="flex justify-between">
              <div>
              <div className="font-semibold">{msg.username}</div>
              <div className="text-xs text-gray-300">{msg.major}</div>
              </div>
            <div className="text-[10px] text-gray-300 mt-1 text-right">{msg.time}</div>
            </div>
          
            <div className="mt-1 text-sm">{msg.message}</div>
          
          </div>
        </div>
        <div>
      
        </div>
        

      </li>
      
    );
    
  })}
</ul>

{typing && (
          <p  className="text-sm text-gray-500 mt-4 transition-opacity duration-300 ease-in-out">
            📝 Someone is typing...
          </p>
        )}

      
  
        {loadingNotification && (
          <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 z-50">
            <span>Loading more messages...</span>
          </div>
        )}
  
        <div ref={messagesEndRef} />
      </div>
  
      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-200 flex items-center gap-3"
      >
        <textarea
          ref={inputRef}
          autoComplete="off"
          onKeyDown={handleTyping}
          onKeyUp={handleStopTyping}
          placeholder="Send your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  </div>
  );
};

export default Chat;
