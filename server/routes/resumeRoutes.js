// server/routes/resumeRoutes.js
const express = require("express");
const router = express.Router();
const { uploadResume , analyzeResume } = require("../controllers/resumeController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // Our multer config

// Route for uploading. It's protected and uses the upload middleware.
router.post("/upload", protect, upload, uploadResume);
router.route("/analyze").post(protect, analyzeResume);
module.exports = router;
