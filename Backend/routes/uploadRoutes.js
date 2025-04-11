const express = require('express');
const multer = require('multer');
const router =require("express").Router()
const { uploadImage, getPost } = require('../controllers/uploadController');  // تأكد من الاستيراد الصحيح



const upload = multer({ dest: 'uploads/' });

// مسار لتحميل صورة
router.post('/upload', upload.single('file'), uploadImage);  // تأكد أن الدالة موجودة في الملف

// مسار لجلب جميع البوستات
router.get('/posts', getPost);

module.exports = router;




