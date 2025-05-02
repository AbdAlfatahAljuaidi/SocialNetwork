import { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Nav from '../Index/Nav';
import ItImage from '../../assets/IT.jpeg';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
const socket = io('http://localhost:4000');

const ChatPharmacy = () => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingNotification, setLoadingNotification] = useState(false);
  const [profile, setProfile] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const inputRef = useRef();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef();
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

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await axios.get(`${apiUrl}/User/GetProfile`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfile(data.getProfile);
        const major = data.getProfile?.[0]?.major;
        if (major) {
          setRoomId(major); // نستخدم التخصص كمعرف للغرفة
          socket.emit("joinRoom", major);
        }
      } catch (error) {
        console.error("Error fetching profile Info:", error);
        navigate('/Index/Profile/Update');
      }
    }

    fetchProfile();
  }, []);

  const fetchMessages = async (initial = false) => {
    setLoading(true);
    setLoadingNotification(true);
    try {
      const { data } = await axios.get(`${apiUrl}/messages?skip=${initial ? 0 : skip}`);
      if (data.length < 10) setHasMore(false);
      setMessages(prev => initial ? data.reverse() : [...data.reverse(), ...prev]);
      setSkip(prev => prev + data.length);
    } catch (err) {
      console.error("❌ Error loading messages:", err);
    } finally {
      setLoading(false);
      setTimeout(() => setLoadingNotification(false), 1500);
    }
  };

  useEffect(() => {
    fetchMessages(true);
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    const handleScroll = () => {
      if (container.scrollTop === 0 && hasMore) {
        fetchMessages();
      }
    };
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [hasMore, skip]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleTyping = () => socket.emit('typing');
  const handleStopTyping = () => socket.emit('stop_typing');

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageText = inputRef.current.value.trim();
    if (messageText && profile && roomId) {
      const messageData = {
        roomId,
        username: profile?.[0]?.username || "Username not found",
        profileImage: profile?.[0]?.imageUrl || "Image not found",
        major: profile?.[0]?.major || "Major not found",
        message: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      socket.emit('chat message', messageData);
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      <div className="fixed md:top-[94px] top-[240px] left-1/2 transform -translate-x-1/2 w-full max-w-[970px] bg-blue-100 rounded-xl px-4 py-3 flex items-center gap-4 z-40 shadow-md">
        <img src={ItImage} alt="Group Chat" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow" />
        <div className="text-sm text-gray-700 leading-snug">
          <h2 className="text-base font-bold text-blue-700 mb-1">Welcome!</h2>
          <p>
            This group is for <span className="font-semibold text-blue-600">{profile?.[0]?.major || "your major"}</span> students.<br />
            To join another group, update your major from your profile page.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-2/3 flex flex-col relative bg-blue-50 pt-[390px] md:pt-[200px] mx-auto" style={{ height: "100vh" }}>
        <div className="flex-1 overflow-y-auto px-6 pb-28" ref={messagesContainerRef}>
          <ul className="space-y-4">
            {messages.map((msg, index) => (
              <li key={index} className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-4">
                  <img src={msg.profileImage} alt="profile" className="w-12 h-12 rounded-full object-cover border" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{msg.username}</div>
                    <div className="text-sm text-gray-500">{msg.major}</div>
                  </div>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <div className="mt-2 text-gray-700">{msg.message}</div>
              </li>
            ))}
          </ul>

          {typing && (
            <p className="text-sm text-gray-500 mt-4 transition-opacity duration-300 ease-in-out">
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

        <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-200 flex items-center gap-3">
          <textarea
            ref={inputRef}
            autoComplete="off"
            onKeyDown={handleTyping}
            onKeyUp={handleStopTyping}
            placeholder="Send Your Message"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default ChatPharmacy;
