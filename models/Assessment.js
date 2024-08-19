const mongoose = require('mongoose');

// Define OptionSchema
const OptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  }
});

// Define QuestionSchema
const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [OptionSchema],
    required: true
  }
});

// Define ExamSchema
const ExamSchema = new mongoose.Schema({
  examid: {
    type: String,
    required: true,
    unique: true
  },
  questions: {
    type: [QuestionSchema],
    required: true
  }
});

// Create and export the Exam model
module.exports = mongoose.model('assessments', ExamSchema);
