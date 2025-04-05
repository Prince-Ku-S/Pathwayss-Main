const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/authController");
const { upload } = require("../config/cloudinary");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Get user profile (Protected)
router.get("/profile", authMiddleware, getUserProfile);

// ✅ Update user profile (Protected)
router.put("/update-profile", authMiddleware, updateUserProfile);

// ✅ Upload profile image (Protected)
router.post("/upload-profile-image", authMiddleware, upload.single("profileImage"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const imageUrl = req.file.path; // ✅ Cloudinary image URL
    res.json({ imageUrl });
  } catch (error) {
    console.error("❌ Image Upload Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
