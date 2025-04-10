import { useEffect, useState } from "react";

function Testt() {
    const [posts, setPosts] = useState([]);
    let socket;

    useEffect(() => {
        console.log("🔗 محاولة الاتصال بـ WebSocket...");
        socket = new WebSocket("ws://localhost:60002");

        socket.onopen = () => {
            console.log("✅ WebSocket متصل بنجاح!");
        };

        socket.onmessage = (event) => {
            console.log("📩 رسالة مستقبلة عبر WebSocket:", event.data);

            try {
                const data = JSON.parse(event.data);
                if (data.type === "NEW_POST") {
                    alert("🆕 تم نشر بوست جديد!");
                    setPosts((prevPosts) => [data.post, ...prevPosts]);
                }
            } catch (error) {
                console.error("❌ خطأ في استقبال البيانات:", error);
            }
        };

        socket.onclose = (event) => {
            console.log("❌ تم قطع الاتصال بـ WebSocket، السبب:", event.reason);
            setTimeout(() => {
                console.log("🔄 إعادة محاولة الاتصال بـ WebSocket...");
                Testt(); // إعادة الاتصال تلقائيًا
            }, 3000);
        };

        socket.onerror = (error) => {
            console.error("⚠️ خطأ في WebSocket:", error);
        };

        return () => {
            console.log("⛔ إغلاق WebSocket قبل إزالة المكون");
            socket.close();
        };
    }, []);

    return (
        <div>
            <h1>📢 المنشورات</h1>
            {posts.length === 0 && <p>لا توجد منشورات بعد...</p>}
            {posts.map((post, index) => (
                <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                    <h3>{post.username}</h3>
                    <p>{post.text}</p>
                    {post.imageUrl && <img src={post.imageUrl} alt="Post" style={{ maxWidth: "100%", height: "auto" }} />}
                </div>
            ))}
        </div>
    );
}

export default Testt;
