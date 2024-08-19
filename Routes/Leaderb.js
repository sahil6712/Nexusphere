// routes/leaderboard.js
const express = require('express');
const router = express.Router();
const LeaderBoard = require('../models/leaderboard');

router.post('/Leader', (req, res) => {
  const { examId, score, email } = req.body;  // Updated to match the front-end payload

  if (!examId || !score || !email) {
    return res.status(400).json({ message: "Exam ID, score, and email are required." });
  }

  const newLeaderBoard = new LeaderBoard({ examId, score, email });

  newLeaderBoard.save()
    .then(() => res.status(200).json({ message: "LeaderBoard saved successfully!" }))
    .catch(error => res.status(500).json({ message: "There was a problem saving the LeaderBoard.", error }));
});


router.get('/Leader/:examId', (req, res) => {
    const { examId } = req.params;

    LeaderBoard.find({ examId })
      .then(leaderboard => {
        if (leaderboard.length === 0) {
          return res.status(404).json({ message: "No such exam" });
        }
        res.status(200).json(leaderboard);
      })
      .catch(error => res.status(500).json({ message: "There was a problem fetching the leaderboard.", error }));
});



module.exports = router;
