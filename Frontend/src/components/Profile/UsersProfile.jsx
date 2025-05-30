import React, { useEffect, useState } from "react";
import {
  FaLocationDot,
  FaStar,
  FaMessage,
  FaCheck,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaTransgender,
  FaUserPlus,
} from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../Index/Nav";
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

import { useTranslation } from 'react-i18next';

const UsersProfile = ({changeLanguage}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [color, setColor] = useState(
    localStorage.getItem("mainColor") || "#1D4ED8"
  );
  const { t } = useTranslation();
  const [Profile, setProfile] = useState({});
  const [friends, setFriends] = useState([]);
  const params = useParams();

  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    async function sendReq() {
      try {
        const { data } = await axios.get(
          `${apiUrl}/getUserInfo/${params.username}`
        );
        setProfile(data.personalInfo);
        setFriends(data.personalInfo.friends || []);
      } catch (error) {
        console.error("Error fetching profile Info:", error);
      }
    }
    sendReq();

    if (params.username === user.Name) {
      setIsOwnProfile(true);
    } else {
      setIsOwnProfile(false);
    }
  }, [params.username, user.Name]);

  const addFriend = async () => {
    try {
      if (!user || !user.profileImage) {
        toast.error("You cannot follow users before creating your own profile");
        return;
      }

      const { data } = await axios.post(`${apiUrl}/follow/${params.username}`, {
        Name: user.Name,
      });

      setMessage(data.message);
      setError(null);

      const alreadyFriend = friends.some((friend) => friend.name === user.Name);

      if (!alreadyFriend) {
        setFriends([...friends, { name: user.Name, image: user.profileImage }]);
        toast.success(data.message);
      } else {
        setFriends(friends.filter((friend) => friend.name !== user.Name));
        toast.info("Friend removed");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };

  const isFriend = friends.some((friend) => friend.name === user.Name);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white rounded-lg mx-auto">
      <Nav />

      <div className="p-8 shadow-lg w-[85%] mt-10 mx-auto">
        <h1 className="text-4xl font-bold text-gray-800  ">{t('Profile')}</h1>

        {Profile ? (
          <div className="flex flex-wrap  justify-between pb-8 mt-9 shadow-md p-6 rounded-lg bg-gray-50">
            <div className="flex flex-col md:flex-row items-center space-x-8 mx-auto md:mx-0">
              <img
                src={Profile.imageUrl || "https://via.placeholder.com/150"}
                alt="Person"
                className="w-36 h-36 rounded-full border-4 shadow-xl"
                style={{
                  border: `1px solid ${color}`,
                }}
              />
              <div>
                <h1 className="text-4xl font-extrabold text-gray-800 text-center md:text-start ">
                  {Profile.username || "Unknown"}
                </h1>
                <p className="flex items-center justify-center text-lg text-gray-600 mt-2 w-fit mx-auto md:mx-0">
                  <FaLocationDot className="mr-2 " style={{ color: color }} />
                  {Profile.Address || "Not specified"}
                </p>

                <h2
                  className="font-medium text-lg mt-2 text-center "
                  style={{ color: color }}
                >
                  {Profile.major || "Software Engineer"}
                </h2>
              </div>
            </div>
            <div className="mx-auto md:mx-0 mt-7 md:mt-0">

            <Link to={`/ChatFriend/${params.username}`} className="mx-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
  {t('privteChat')}
</button>
</Link>

              <Link to={`/Report/${params.username}`}>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">
  {t('Report')}
</button>
</Link>



            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No profile available.</p>
        )}

        {Profile ? (
          <div className="mt-8 shadow-md p-6 rounded-lg bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-700 border-b pb-4">
             {t('Personal_Info')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 mt-6 text-lg">
              <div className="flex items-center">
                <FaPhone className="mx-3 " style={{ color: color }} size={24} />
                <span className="text-gray-700 w-24 font-medium">{t('contact_phone_label')}:</span>
                <span className="text-gray-600">{Profile.Phone}</span>
              </div>

              <div className="flex items-center">
                <FaLocationDot
                  className="mx-3"
                  style={{ color: color }}
                  size={24}
                />
                <span className="font-medium text-gray-700"> {t('Address')} :</span>
                <span className="text-gray-600 ">{Profile.Address}</span>
              </div>
              <div className="flex items-center">
                <BsCalendar2DateFill
                  className="mx-3"
                  style={{ color: color }}
                  size={24}
                />
                <span className="font-medium text-gray-700"> {t('age_placeholder')} :</span>
                <span className="text-gray-600 mx-1">{Profile.Age}</span>
              </div>
              <div className="flex items-center">
                <BsCalendar2DateFill
                  className="mx-3"
                  style={{ color: color }}
                  size={24}
                />
                <span className="font-medium text-gray-700">
                  First Year:
                </span>
                <span className="text-gray-600 mx-1">{Profile.year}</span>
              </div>
              <div className="flex items-center">
                <FaTransgender
                  className="mx-3"
                  style={{ color: color }}
                  size={24}
                />
                <span className="font-medium text-gray-700 ">{t('profile.gender')}:</span>
                <span className="text-gray-600 text-start w-full  mx-1">{Profile.Gender}</span>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {!isOwnProfile && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => addFriend()}
              className="flex items-center text-white px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-green-600 transition"
              style={{ background: color }}
            >
              <FaUserPlus className="mx-3" />
              {isFriend ? "Unfollow" : "Follow"}
            </button>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-3">
            {t('friends')}
          </h2>

          {friends.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {friends.map((friend, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={friend.image}
                    alt={friend.name}
                    className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-200 dark:border-gray-600"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {friend.name}
                  </h3>
                  <Link to={`/index/profile/${friend.name}/${user.Name}`}>
                    <button
                      className="mt-4 px-6 text-lg py-1 bg-blue-600 text-white rounded-md text-sm transition"
                      style={{ background: color }}
                    >
                       {t('View_Profile')}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 mt-4">
             {t('no_friends_yet')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersProfile;
