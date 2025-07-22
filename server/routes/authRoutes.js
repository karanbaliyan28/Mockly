// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { signupUser  , loginUser } = require("../controllers/authController.js");

router.post("/signup", signupUser);
router.post("/login", loginUser);
// We will add the /login route here later

module.exports = router;
