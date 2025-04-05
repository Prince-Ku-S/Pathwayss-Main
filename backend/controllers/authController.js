const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// ✅ Function to generate a secure random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Register User & Send OTP for Email Verification
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists. Please log in." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    user = new User({ name, email, password: hashedPassword, otp, otpExpires, isVerified: false });
    await user.save();

    // ✅ Send OTP email
    await sendEmail(email, "Pathwayss OTP Verification", `Your OTP is: ${otp}`);
    console.log(`✅ OTP sent to ${email}: ${otp}`);

    res.status(201).json({ message: "OTP sent to your email. Verify to complete registration." });
  } catch (err) {
    console.error("❌ Error in registerUser:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Verify OTP and Complete Registration
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    if (user.isVerified) return res.status(400).json({ error: "User is already verified. Please log in." });

    if (user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null; // ✅ Clear OTP after verification
    user.otpExpires = null;
    await user.save();

    // ✅ Send Welcome Email
    await sendEmail(email, "Welcome to Pathwayss!", `Hi ${user.name}, welcome to Pathwayss!`);
    console.log(`✅ OTP verified for ${email}. Registration completed.`);

    res.json({ message: "OTP verified successfully. You can now log in with your email and password." });
  } catch (err) {
    console.error("❌ Error in verifyOTP:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Login User After OTP Verification
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid Credentials" });

    if (!user.isVerified) return res.status(400).json({ error: "Please verify your email before logging in." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing in .env file.");
      return res.status(500).json({ error: "Server Error: Missing JWT_SECRET" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    if (!token) {
      console.error("❌ Token generation failed.");
      return res.status(500).json({ error: "Server Error: Token Generation Failed" });
    }

    console.log("✅ Generated token:", token);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage ? user.profileImage : "",  // ✅ Ensure it always returns a string
      },
    });
  } catch (err) {
    console.error("❌ Error in loginUser:", err);
    res.status(500).json({ error: "Server Error" });
  }
};







// ✅ Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password -otp -otpExpires");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, age, yearOfGraduation, profileImage } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = name || user.name;
    user.age = age || user.age;
    user.yearOfGraduation = yearOfGraduation || user.yearOfGraduation;
    user.profileImage = profileImage || user.profileImage;

    await user.save();

    res.json({
      message: "Profile updated successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage, // ✅ Return profileImage in the response
      },
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

