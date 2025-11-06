const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const User = require("./models/User");

const app = express();
app.use(cors(
  {
    origin:"*"
  }
));
app.use(express.json());
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vinodexter001:Xys9drUYXTQK9gD9@vinojan007.crpoyxo.mongodb.net/?retryWrites=true&w=majority&appName=vinojan007");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};



// app.use(express.bodyParser());
app.use(express.urlencoded({ extended: true }));


connectDB()

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });


app.post("/api/register", async (req, res) => {
  const { firstName, lastName, dob, username, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ username:username });
  if (existingUser) {
    return res.status(400).json({ error: "Username already taken" });
  }

  // Create new user
  const newUser = new User({
    firstName,
    lastName,
    dob,
    username,
    password,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

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