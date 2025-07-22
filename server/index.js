// server/server.js

// Load environment variables FIRST!
require("dotenv").config();

// IMPORT THE DATABASE CONNECTION FUNCTION
const connectDB = require("./config/db");

const express = require("express");
const path = require("path"); // Ensure path is required
const interviewRoute = require("./routes/interviewRoute");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const userRoutes = require("./routes/userRoutes");

// ESTABLISH THE DATABASE CONNECTION
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(
  require("cors")({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Parse incoming JSON and urlencoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Basic Route ---
app.get("/", (req, res) => {
  res.send("IntellectHire API is running...");
});

// --- API Routes ---
app.use("/api/interview", interviewRoute);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/user", userRoutes);

// --- THIS IS THE FIX ---
// This line tells Express that any request starting with '/uploads'
// should be served directly from the 'uploads' folder in your server directory.
// This is a more direct way to define the static path.
app.use("/uploads", express.static("uploads"));

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
