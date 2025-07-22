// server/models/interviewModel.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  userAnswer: { type: String, required: true },
  // You could expand feedback into its own schema with score, clarity, etc.
  aiFeedback: { type: String, required: true },
});

const interviewSchema = new mongoose.Schema(
  {
    // Link to the user who took the interview
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    role: {
      type: String,
      required: true,
    },
    overallScore: {
      type: Number,
      default: 0,
    },
    questions: [questionSchema], // Embed the questions and answers
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;