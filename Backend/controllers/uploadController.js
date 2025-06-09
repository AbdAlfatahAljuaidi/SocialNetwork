const express = require("express");
const app = express();
const cloudinary = require('../config/cloudinary');
const Post = require('../models/Posts');
const { Profile, ProfileValidation } = require("../models/Profile.js");


const fs = require('fs');
const path = require('path');
app.use(express.json());



// تحميل قائمة الكلمات غير اللائقة
const badWordsJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../utils/listEng.json'), 'utf8'));
const badWordsList = badWordsJson.words;


const badWordsArabJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../utils/listArab.json'), 'utf8'));
const badWordsListArab = badWordsArabJson.words;



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
      

          // التحقق من الكلمات البذيئة
const containsBadWord = badWordsList.some(badWord =>
    req.body.text.toLowerCase().includes(badWord.toLowerCase())
);

if (containsBadWord) {
    return res.status(400).json({ message: 'المنشور يحتوي على كلمات غير لائقة' });
}

const containsBadWordArab = badWordsListArab.some(badWord =>
    req.body.text.toLowerCase().includes(badWord.toLowerCase())
);

if (containsBadWordArab) {
    return res.status(400).json({ message: 'المنشور يحتوي على كلمات غير لائقة' });
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
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء جلب البوستات' });
    }
};


// تصدير الوظائف
module.exports = { uploadImage, getPost };
