// server/middleware/imageUploadMiddleware.js
const multer = require("multer");
const path = require("path");

// Set up storage engine for profile images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/"); // The directory where images will be saved
  },
  filename: function (req, file, cb) {
    // Create a unique filename for the user's profile picture
    cb(
      null,
      `profile-${req.user._id}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Function to check that the file is an image
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: You can only upload image files!");
  }
}

// Initialize the upload variable
const uploadImage = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("profileImage"); // This must match the form field name on the frontend

module.exports = uploadImage;
