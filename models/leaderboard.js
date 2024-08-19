// models/leaderboard.js
const mongoose = require('mongoose');

const leaderBoardSchema = new mongoose.Schema({
  examId: String,
  score: Number,
  email: String
});

const LeaderBoard = mongoose.model('LeaderBoard', leaderBoardSchema);

module.exports = LeaderBoard;
