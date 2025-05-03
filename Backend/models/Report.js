// models/Report.js
const mongoose = require ("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reporter: {
        type: String,
      required: true,
    },
    reportedUser: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model('Report', reportSchema);

