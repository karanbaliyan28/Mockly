// server/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for the token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (it's in the format "Bearer <token>")
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's ID and attach it to the request object
      // We exclude the password from being attached
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Move on to the next function in the chain
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
