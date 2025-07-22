// server/middleware/uploadMiddleware.js
const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure 'uploads/' directory exists
  },
  filename: function (req, file, cb) {
    // Create a unique filename: fieldname-timestamp.extension
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  // Optional: Add file filter for PDF/DOCX here
}).single("resume"); // 'resume' is the name of the form field

module.exports = upload;
