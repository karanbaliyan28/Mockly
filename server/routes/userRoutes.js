// server/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  updateUserProfilePicture,
} = require("../controllers/userController.js");
const { protect } = require("../middlewares/authMiddleware.js");
const uploadImage = require("../middlewares/imageUploadMiddleware.js");

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/profile/picture")
  .post(protect, uploadImage, updateUserProfilePicture);

module.exports = router;
