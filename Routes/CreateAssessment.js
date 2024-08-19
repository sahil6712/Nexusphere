const express = require('express');
const router = express.Router();
const ExamSchema = require('../models/Assessment');

router.post('/createexam', async (req, res) => {
  const { examid, questions } = req.body;

  try {
    console.log('Received examid:', examid);
    console.log('Received questions:', JSON.stringify(questions, null, 2));

    const newExam = new ExamSchema({
      examid: examid,
      questions: questions.map((question) => ({
        question: question.question,
        options: question.options.map((option) => ({
          text: option.text,
          isCorrect: option.isCorrect,
        })),
      })),
    });

    const savedExam = await newExam.save();
    res.status(201).json({ success: true, message: 'Exam created successfully', exam: savedExam });
  } catch (error) {
    console.error('Error saving exam:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
