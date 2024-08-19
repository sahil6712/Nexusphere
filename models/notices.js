const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  notice: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add any other fields you may need
});

module.exports = mongoose.model('Notice', noticeSchema);
