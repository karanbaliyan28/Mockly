// server/routes/interviewRoutes.js
const express = require("express");
const router = express.Router();
const {
  startInterview,
  processInterviewTurn,
  saveInterviewSession,
  getInterviewHistory,
  getInterviewById,
  downloadReportAsPDF,
} = require("../controllers/interviewController.js");
const { protect } = require("../middlewares/authMiddleware.js");

// All interview routes should be protected
router.use(protect);

router.post("/start", startInterview);
router.post("/turn", processInterviewTurn);
router.post("/save", saveInterviewSession);
router.get("/history", getInterviewHistory);

// Must be placed BEFORE the '/:id' route to avoid conflict
router.get("/history/:id/download", protect, downloadReportAsPDF);
router.get("/history/:id", protect, getInterviewById);

module.exports = router;
