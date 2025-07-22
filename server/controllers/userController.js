// server/controllers/userController.js
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/**
 * @desc    Get user profile
 * @route   GET /api/user/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      graduationYear: user.graduationYear,
      photoURL: user.photoURL,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Update user profile
 * @route   PUT /api/user/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    user.graduationYear = req.body.graduationYear || user.graduationYear;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      graduationYear: updatedUser.graduationYear,
      photoURL: updatedUser.photoURL,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Update user profile picture
 * @route   POST /api/user/profile/picture
 * @access  Private
 */
const updateUserProfilePicture = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No image file uploaded.");
  }

  const user = await User.findById(req.user._id);

  if (user) {
    // --- 2. ADD THIS CLEANUP LOGIC ---
    // Check if an old photo exists and delete it from the server
    if (user.photoURL && fs.existsSync(user.photoURL)) {
      fs.unlinkSync(user.photoURL);
    }
    // --- End of new logic ---

    user.photoURL = req.file.path; // Save the path of the new file
    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile picture updated successfully.",
      photoURL: updatedUser.photoURL,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
module.exports = {
  getUserProfile,
  updateUserProfile,
  updateUserProfilePicture,
};
