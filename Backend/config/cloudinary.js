const cloudinary = require('cloudinary').v2;  // استيراد مكتبة Cloudinary

// إعدادات Cloudinary باستخدام البيانات التي حصلت عليها من لوحة التحكم
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,  // اسم السحابة الخاصة بك
  api_key: process.env.API_KEY,  // مفتاح API
  api_secret: process.env.API_SECRET,  // السر الخاص بـ API
});

module.exports = cloudinary;  // تصدير إعدادات Cloudinary لاستخدامها في الملفات الأخرى
