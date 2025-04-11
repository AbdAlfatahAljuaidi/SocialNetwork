const cloudinary = require('cloudinary').v2;  // استيراد مكتبة Cloudinary

// إعدادات Cloudinary باستخدام البيانات التي حصلت عليها من لوحة التحكم
cloudinary.config({
  cloud_name: 'danvxvhvq',  // اسم السحابة الخاصة بك
  api_key: '159292142687481',  // مفتاح API
  api_secret: 'l5sz-EDILaVTduJ8tQnyTrX_NMc',  // السر الخاص بـ API
});

module.exports = cloudinary;  // تصدير إعدادات Cloudinary لاستخدامها في الملفات الأخرى
