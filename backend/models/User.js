const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // Check if user is verified
  otp: { type: String }, // OTP for email verification
  otpExpires: { type: Date }, // OTP expiration time
  profileImage: { type: String, default: "" }, // Stores profile image URL
  age: { type: Number },
  yearOfGraduation: { type: Number },
  isProfileComplete: { type: Boolean, default: false }, // Ensures profile is complete before payment
});

module.exports = mongoose.model("User", UserSchema);
