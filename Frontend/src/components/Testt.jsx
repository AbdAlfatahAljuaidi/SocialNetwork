import { useEffect, useState } from "react";
import './CSS/Socket.css';

function Testt() {
    // const [posts, setPosts] = useState([]);
    // let socket;

    // useEffect(() => {
    //     console.log("🔗 محاولة الاتصال بـ WebSocket...");
    //     socket = new WebSocket("ws://localhost:6000");

    //     socket.onopen = () => {
    //         console.log("✅ WebSocket متصل بنجاح!");
    //     };

    //     socket.onmessage = (event) => {
    //         console.log("📩 رسالة مستقبلة عبر WebSocket:", event.data);

    //         try {
    //             const data = JSON.parse(event.data);
    //             if (data.type === "NEW_POST") {
    //                 alert("🆕 تم نشر بوست جديد!");
    //                 setPosts((prevPosts) => [data.post, ...prevPosts]);
    //             }
    //         } catch (error) {
    //             console.error("❌ خطأ في استقبال البيانات:", error);
    //         }
    //     };

    //     socket.onclose = (event) => {
    //         console.log("❌ تم قطع الاتصال بـ WebSocket، السبب:", event.reason);
    //         setTimeout(() => {
    //             console.log("🔄 إعادة محاولة الاتصال بـ WebSocket...");
    //             Testt(); // إعادة الاتصال تلقائيًا
    //         }, 3000);
    //     };

    //     socket.onerror = (error) => {
    //         console.error("⚠️ خطأ في WebSocket:", error);
    //     };

    //     return () => {
    //         console.log("⛔ إغلاق WebSocket قبل إزالة المكون");
    //         socket.close();
    //     };
    // }, []);



    return (
        <div>
           {/* <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form> */}
        </div>

    );
}

export default Testt;
