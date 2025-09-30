const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/space-cadets", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Leaderboard API
app.get("/api/leaderboard", async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ score: -1 }) // Sort by score in descending order
      .limit(10); // Limit to top 10 players
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// Update username
app.put("/api/settings/username", async (req, res) => {
  const { userId, newUsername } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = newUsername;
    await user.save();

    res.status(200).json({ message: "Username updated successfully", username: newUsername });
  } catch (error) {
    res.status(500).json({ message: "Failed to update username", error });
  }
});


// Update password
app.put("/api/settings/password", async (req, res) => {
  const { userId, newPassword } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { password: newPassword });
    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update password" });
  }
});

// Delete account
app.delete("/api/settings/delete", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findByIdAndDelete(userId); // Delete user from the database
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "Account deleted successfully." });
  } catch (error) {
    console.error("Failed to delete account:", error);
    res.status(500).json({ message: "Failed to delete account." });
  }
});

// Update profile picture
app.put("/api/settings/profile-picture", upload.single("profilePicture"), async (req, res) => {
  const { userId } = req.body;
  const profilePictureUrl = `/uploads/${req.file.filename}`;

  try {
    await User.findByIdAndUpdate(userId, { profilePicture: profilePictureUrl });
    res.json({ message: "Profile picture updated successfully!", profilePictureUrl });
  } catch (error) {
    console.error("Failed to update profile picture:", error);
    res.status(500).json({ message: "Failed to update profile picture." });
  }
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Fetch login activity
app.get("/api/settings/login-activity/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.json(user.loginActivity || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch login activity" });
  }
});

// Update learning reminders
app.put("/api/settings/reminders", async (req, res) => {
  const { userId, reminders } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { reminders });
    res.json({ message: "Learning reminders updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update reminders" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});