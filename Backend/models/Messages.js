// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username: String,
  profileImage: String,
  major: String,
  message: String,
  time: String,
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
