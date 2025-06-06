import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "../Index/Nav";
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const SearchComponent = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const params = useParams();
    
      const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setError("");
                setPosts([]);

                if (!params.username) {
                    setError("اسم المستخدم غير متوفر في الرابط");
                    return;
                }

                console.log("البحث عن:", params.username);

                const { data } = await axios.post(`${apiUrl}/search/${params.username}`);

                console.log("النتائج:", data);
                setPosts(data);
            } catch (err) {
                setError(err.response?.data?.message || "حدث خطأ أثناء البحث");
            }
        };

        fetchPosts();
    }, [params.username]);

    return (
        <div className="  mx-auto bg-white  rounded-lg">
            <Nav  />
            <div className="max-w-3xl mx-auto">
                
            <h2 className="text-2xl font-bold text-gray-800 text-center mt-10 mb-4">Search About User Posts    </h2>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <div className="mt-6">
                {posts.length > 0 ? (
                    <div className="grid gap-4">
                        {posts.map((post) => (
                            <div key={post._id} className="border rounded-lg p-4 shadow-md bg-gray-50 hover:shadow-lg transition">
                                <h3 className="font-semibold text-lg" style={{color:color}}>{post.username}</h3>
                                <p className="text-gray-700">{post.text}</p>
                                {post.imageUrl && (
                                    <img className="w-full h-52 object-cover rounded-md mt-2" src={post.imageUrl} alt="Post" />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    !error && <p className="text-gray-500 text-center">🚀 لا توجد منشورات لعرضها</p>
                )}
            </div>
            
            </div>
        </div>
    );
};

export default SearchComponent;
