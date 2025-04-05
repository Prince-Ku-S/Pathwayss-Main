require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import Routes
const authRoutes = require("./routes/auth");

const app = express();

// ✅ Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for frontend access

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", require("./routes/user"));


app.get("/", (req, res) => {
  res.send("Welcome to Pathwayss API");
});

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// ✅ Start the Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ Handle Uncaught Errors
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});
