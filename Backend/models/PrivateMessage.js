// models/Message.js
const mongoose = require('mongoose');

const PrivatemessageSchema = new mongoose.Schema({
    senderName: String,
    receiverName: String,
    roomId:String,
  profileImage: String,
  major: String,
  message: String,
  time: String,
}, { timestamps: true });

module.exports = mongoose.model('PrivateMessage', PrivatemessageSchema);

