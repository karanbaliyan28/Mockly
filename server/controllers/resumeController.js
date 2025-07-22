// server/controllers/resumeController.js
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const fs = require("fs");
const pdf = require("pdf-parse");

/**
 * @desc    Upload a resume and link it to the user
 * @route   POST /api/resume/upload
 * @access  Protected
 */
const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded. Please select a file.");
  }
  const user = await User.findById(req.user._id);
  if (user) {
    user.resumePath = req.file.path;
    const updatedUser = await user.save();
    res.status(200).json({
      message: "Resume uploaded successfully.",
      resumePath: updatedUser.resumePath,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

/**
 * @desc    Analyze the user's uploaded resume
 * @route   POST /api/resume/analyze
 * @access  Protected
 */
const analyzeResume = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user || !user.resumePath) {
    res.status(400);
    throw new Error("No resume found for this user. Please upload one first.");
  }

  try {
    const dataBuffer = fs.readFileSync(user.resumePath);
    const pdfData = await pdf(dataBuffer);

    // --- THIS IS THE KEY CHANGE ---
    // Instead of simulating, we now call our AI service with the resume text
    const analysisResult = await analyzeResumeWithAI(pdfData.text);

    // The result from Gemini is already in the correct JSON format
    res.json(analysisResult);
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500);
    throw new Error("Failed to parse or analyze the resume.");
  }
});

async function getAIFeedbackAndNextQuestion(role, history) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings,
    });

    // Start a chat session with the full interview history
    const chat = model.startChat({ history: history });

    const prompt = `
      You are an expert interviewer conducting an interview for a "${role}" position.
      Your previous conversation is in the history.
      Based on the user's last answer, do two things:
      1. Provide brief, constructive "feedback" on their last answer.
      2. Ask the very next, relevant interview "nextQuestion". The question should be challenging but fair.

      Your response MUST be a valid JSON object with this exact structure:
      {
        "feedback": "Your feedback on the previous answer.",
        "nextQuestion": "Your next interview question."
      }
    `;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const jsonText = response.text();

    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error with Gemini API chat:", error);
    throw new Error("Failed to get next question from AI service.");
  }
}

module.exports = { uploadResume, analyzeResume, getAIFeedbackAndNextQuestion };
