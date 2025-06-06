// backend/models/Post.js
const { required } = require('joi');
const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type:String, required: true },
  imageUser:{type:String},
  correct:{type:Boolean, default:false},
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
    text: { type: String },
    imageUrl: { type: String },
    comments: [commentSchema],
    likes: { type: Number, default: 0 }, // عدد اللايكات
    likedUsers: { type: [String] },
   username:{type:String},
   ProfileImage:{type:String},
   questionType:{type:String},
   fromAdmin:{type:Boolean,default: 0},
  }, { timestamps: true });

module.exports = mongoose.model('Post', postSchema );
