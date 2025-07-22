const asyncHandler = require("express-async-handler");
const Interview = require("../models/interviewModel");
const {
  getAIFeedbackAndNextQuestion,
  getFirstInterviewQuestion,
} = require("../services/aiService"); // AI service

// ------------------------ MOCK QUESTION SET ------------------------
const mockQuestions = {
  "frontend developer": [
    "What is the difference between `let`, `const`, and `var` in JavaScript?",
    "Can you explain the concept of the Virtual DOM in React?",
    "Describe your process for making a web page responsive.",
    "What are React Hooks, and which ones have you used most frequently?",
    "How would you optimize a web application for performance?",
  ],
  "backend developer": [
    "Explain the difference between SQL and NoSQL databases.",
    "What is middleware in the context of Express.js?",
    "Describe the principles of RESTful API design.",
    "How do you handle authentication and authorization in a Node.js application?",
    "Tell me about a time you had to scale a backend service.",
  ],
  fresher: [
    "Tell me about yourself and your final year project.",
    "What are your biggest strengths and weaknesses?",
    "Why are you interested in a career in software development?",
    "Where do you see yourself in 5 years?",
    "Do you have any questions for us?",
  ],
};
const puppeteer = require("puppeteer");
const User = require("../models/userModel"); // We need the User model

// ------------------------ MOCK INTERVIEW (Optional) ------------------------
const startMockInterview = (req, res) => {
  const { role = "fresher" } = req.body;
  const normalizedRole = role.toLowerCase();
  const questions = mockQuestions[normalizedRole];

  if (!questions) {
    return res.status(200).json({
      message: `Role '${role}' not found. Defaulting to fresher questions.`,
      questions: mockQuestions["fresher"],
    });
  }

  res.status(200).json({
    message: `Successfully fetched questions for ${normalizedRole}`,
    questions: questions,
  });
};

// ------------------------ AI INTERVIEW ------------------------

/**
 * @desc    Start a new AI-powered interview and get first question
 * @route   POST /api/interview/start
 * @access  Protected
 */
const startInterview = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!role) {
    res.status(400);
    throw new Error("Role is required to start an AI interview.");
  }

  // No 'history' variable needed here.
  // We just get the first question and send it.
  const firstQuestion = await getFirstInterviewQuestion(role);

  res.json({ firstQuestion: firstQuestion });
});

/**
 * @desc    Process user's answer and return feedback + next question
 * @route   POST /api/interview/turn
 * @access  Protected
 */
const processInterviewTurn = asyncHandler(async (req, res) => {
  const { role, history } = req.body;

  if (!role || !history) {
    res.status(400);
    throw new Error("Role and conversation history are required.");
  }

  const result = await getAIFeedbackAndNextQuestion(role, history);
  res.json(result);
});

// ------------------------ SAVE / HISTORY ------------------------

/**
 * @desc    Save completed interview session
 * @route   POST /api/interview/save
 * @access  Protected
 */
const saveInterviewSession = asyncHandler(async (req, res) => {
  const { role, overallScore, questions } = req.body;

  if (!role || !questions || questions.length === 0) {
    res.status(400);
    throw new Error("Missing required interview data.");
  }

  const interview = new Interview({
    user: req.user._id,
    role,
    overallScore,
    questions,
  });

  const createdInterview = await interview.save();
  res.status(201).json(createdInterview);
});

/**
 * @desc    Get interview history for logged-in user
 * @route   GET /api/interview/history
 * @access  Protected
 */
const getInterviewHistory = asyncHandler(async (req, res) => {
  const history = await Interview.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json(history);
});

/**
 * @desc    Get a single interview by its ID
 * @route   GET /api/interview/history/:id
 * @access  Protected
 */
const getInterviewById = asyncHandler(async (req, res) => {
  const interview = await Interview.findById(req.params.id);

  // Security check: Ensure the interview belongs to the logged-in user
  if (interview && interview.user.toString() === req.user._id.toString()) {
    res.json(interview);
  } else {
    res.status(404);
    throw new Error("Interview not found");
  }
});

/**
 * @desc    Download a single interview report as a PDF
 * @route   GET /api/interview/history/:id/download
 * @access  Protected
 */
const downloadReportAsPDF = asyncHandler(async (req, res) => {
  const interview = await Interview.findById(req.params.id);
  const user = await User.findById(req.user._id);

  // Security check
  if (
    !interview ||
    !user ||
    interview.user.toString() !== req.user._id.toString()
  ) {
    res.status(404);
    throw new Error("Interview not found");
  }

  // --- Generate HTML for the PDF ---
  const reportHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Interview Report</title>
        <style>
            body { font-family: sans-serif; margin: 40px; }
            h1, h2, h3 { color: #333; }
            h1 { font-size: 24px; text-align: center; margin-bottom: 0; }
            .header { text-align: center; margin-bottom: 40px; }
            .header img { max-width: 80px; border-radius: 50%; margin-top: 10px;}
            .header p { color: #555; }
            .turn { margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
            .question { font-weight: bold; color: #4a4a4a; }
            .answer { margin-top: 8px; padding-left: 15px; border-left: 3px solid #ccc; color: #555;}
            .feedback { margin-top: 8px; background-color: #f0f8ff; padding: 10px; border-radius: 5px; color: #31708f; font-style: italic;}
        </style>
    </head>
    <body>
        <div class="header">
            ${
              user.photoURL
                ? `<img src="http://localhost:5000/${user.photoURL}" alt="Profile Photo">`
                : ""
            }
            <h1>Interview Report</h1>
            <p><strong>Candidate:</strong> ${user.fullName}</p>
            <p><strong>Role:</strong> ${interview.role}</p>
            <p><strong>Date:</strong> ${new Date(
              interview.createdAt
            ).toLocaleDateString()}</p>
        </div>
        ${interview.questions
          .map(
            (turn, index) => `
            <div class="turn">
                <h3>Question ${index + 1}</h3>
                <p class="question">${turn.questionText}</p>
                <p class="answer">${turn.userAnswer}</p>
                <p class="feedback"><strong>AI Feedback:</strong> ${
                  turn.aiFeedback
                }</p>
            </div>
        `
          )
          .join("")}
    </body>
    </html>
  `;

  // --- Generate PDF using Puppeteer ---
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(reportHTML, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();

  // --- Send PDF to the client ---
  res.set({
    "Content-Type": "application/pdf",
    "Content-Length": pdfBuffer.length,
    "Content-Disposition": `attachment; filename="Interview-Report-${interview._id}.pdf"`,
  });
  res.send(pdfBuffer);
});

// ------------------------ EXPORTS ------------------------

module.exports = {
  startMockInterview, // use /api/interview/mock
  startInterview, // AI-based
  processInterviewTurn, // AI-based
  saveInterviewSession,
  getInterviewHistory,
  getInterviewById, // <-- Add this
  downloadReportAsPDF, // <-- And this
};
