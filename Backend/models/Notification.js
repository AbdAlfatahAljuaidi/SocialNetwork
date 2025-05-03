// models/Notification.js
const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    username: {
      type: String,  ref: "User",
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
 
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
