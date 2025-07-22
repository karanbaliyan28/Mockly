// server/controllers/authController.js
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Helper function to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signupUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, graduationYear } = req.body;

  // 1. Validation
  if (!fullName || !email || !password || !graduationYear) {
    res.status(400);
    throw new Error("Please fill in all required fields.");
  }

  // 2. Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User with this email already exists.");
  }

  // 3. Create new user
  const user = await User.create({
    fullName,
    email,
    password,
    graduationYear,
  });

  // 4. Respond with user data and a token
  if (user) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      photoURL: user.photoURL, // <-- THE FIX IS HERE
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data received.");
  }
});

/**
 * @desc    Auth user & get token (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Check for user email
  const user = await User.findOne({ email });

  // 2. If user exists, check if passwords match
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      photoURL: user.photoURL, // <-- AND THE FIX IS HERE
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // 401 Unauthorized
    throw new Error("Invalid email or password");
  }
});

module.exports = { signupUser, loginUser };
