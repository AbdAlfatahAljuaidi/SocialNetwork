const express = require("express");
const app = express();
const cloudinary = require('../config/cloudinary');
const Post = require('../models/Posts');
const { Profile, ProfileValidation } = require("../models/Profile.js");

app.use(express.json());


// const WebSocket = require("ws");
// const http = require("http");
// const server = http.createServer(app);

// // إنشاء WebSocket Server وربطه مع HTTP Server
// const wss = new WebSocket.Server({ server });

// // تخزين جميع العملاء المتصلين
// const clients = new Set();

// wss.on("connection", (ws) => {
//     console.log("🔗 عميل جديد متصل عبر WebSocket");

//     // إضافة العميل إلى القائمة
//     clients.add(ws);

//     // عند استقبال رسالة من العميل
//     ws.on("message", (message) => {
//         console.log("📩 رسالة من العميل:", message.toString());
//     });

//     // عند انقطاع الاتصال
//     ws.on("close", () => {
//         console.log("❌ عميل قطع الاتصال");
//         clients.delete(ws);
//     });
// });

// // وظيفة لإرسال إشعار للجميع عند نشر بوست
// function broadcastNewPost(post) {
//     const message = JSON.stringify({ type: "NEW_POST", post });
//     console.log("🚀 إرسال إشعار للعميل:", message); // ✅ تحقق من الإرسال
    
//     clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(message);
//         }
//     });
// }

// // تشغيل السيرفر
// const PORT = 60002;
// server.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// ✅ API لتحميل صورة ونشر بوست
const uploadImage = async (req, res) => {
    try {
        let imageUrl = null 
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
          }

          if(!req.body.text){
           return  res.status(500).json({ message: 'A question must be added' });
          }
      
        // رفع الصورة إلى Cloudinary

        // إنشاء وحفظ المنشور في قاعدة البيانات
        let newPost = new Post({
            text: req.body.text || 'بدون نص', // نص المنشور (اختياري)
            imageUrl: imageUrl, // رابط الصورة من Cloudinary
            likes: 0,
            username:req.body.username,
            fromAdmin:req.body.fromAdmin,
            questionType:req.body.questionType,
            ProfileImage: req.body.ProfileImage, // معرف المستخدم
        });

        await newPost.save();

    
        const profile = await Profile.findOne({username:req.body.username})
    
        if (profile) {
          profile.point += 5;
          await profile.save();
        }

        // console.log("📢 تم نشر بوست جديد، سيتم إرسال الإشعار الآن...");
        // broadcastNewPost(newPost); // ✅ إرسال الإشعار عبر WebSocket

        res.status(201).json({
            message: ' Post saved successfully!',
            post: newPost,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء تحميل الصورة', error });
    }
};


// ✅ API لجلب كل المنشورات
const getPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء جلب البوستات' });
    }
};



  
  




// تصدير الوظائف
module.exports = { uploadImage, getPost };
