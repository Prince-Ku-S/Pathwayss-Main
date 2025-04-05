const User = require("../models/User");

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Extract user ID from JWT token
    const { age, yearOfGraduation, profileImage } = req.body;

    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.age = age || user.age;
    user.yearOfGraduation = yearOfGraduation || user.yearOfGraduation;
    user.profileImage = profileImage || user.profileImage;

    // If all required fields are filled, mark profile as complete
    if (user.age && user.yearOfGraduation && user.profileImage) {
      user.isProfileComplete = true;
    }

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
