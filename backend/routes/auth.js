const express = require("express");
const { registerUser, verifyOTP, loginUser } = require("../controllers/authController");

const router = express.Router();

// ✅ Route to Register & Send OTP
router.post("/register", registerUser);

// ✅ Route to Verify OTP
router.post("/verify-otp", verifyOTP);

// ✅ Route to Log In
router.post("/login", loginUser);

module.exports = router;
