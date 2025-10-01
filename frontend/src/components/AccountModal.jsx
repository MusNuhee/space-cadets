// src/components/AccountModal.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

export default function AccountModal({ username, userId, onClose, onLogout }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);

  // Settings fields
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loginActivity, setLoginActivity] = useState([]);
  const [reminders, setReminders] = useState("");

  const [uploadedImage, setUploadedImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaderboard(data))
      .catch((err) => console.error("Failed to fetch leaderboard:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const updateUsername = async () => {
    if (!newUsername.trim()) return alert("Enter a valid username");

    try {
      const res = await fetch("http://localhost:5000/api/settings/username", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newUsername }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  };

  const updatePassword = async () => {
    if (!newPassword.trim()) return alert("Enter a valid password");
    try {
      const res = await fetch("http://localhost:5000/api/settings/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newPassword }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("Failed to update password:", error);
    }
  };

  const updateProfilePicture = async () => {
    if (!uploadedImage) return alert("Please upload a valid image.");
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("profilePicture", uploadedImage);

      const res = await fetch("http://localhost:5000/api/settings/profile-picture", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      alert(data.message);
      setProfilePicture(data.profilePictureUrl); // Update the profile picture URL
    } catch (error) {
      console.error("Failed to update profile picture:", error);
    }
  };

  const fetchLoginActivity = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/settings/login-activity/${userId}`);
      const data = await res.json();
      setLoginActivity(data);
    } catch (error) {
      console.error("Failed to fetch login activity:", error);
    }
  };

  const updateReminders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settings/reminders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, reminders }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("Failed to update reminders:", error);
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    try {
      const res = await fetch("http://localhost:5000/api/settings/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message); // Show success message
        localStorage.removeItem("user"); // Clear user data from local storage
        navigate("/landing"); // Redirect to the landing page
      } else {
        alert("Failed to delete account. Please try again.");
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("An error occurred while deleting the account.");
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result); // Preview the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

const { getRootProps, getInputProps } = useDropzone({
  accept: {
    'image/*': [],          // all images
    'application/pdf': [],  // pdfs
    'text/plain': [],       // txt files
  },
  multiple: true,
});

  return (
    <div className="fixed top-4 right-4 z-100">
      {/* Main account popup */}
      <div className="bg-gray-800 text-white rounded-xl shadow-lg p-6 w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-3">Account</h2>
        <p className="text-lg mb-4">
          Welcome, <span className="font-bold">{username}</span>!
        </p>

        <div className="space-y-3">
          <button
            className="w-full bg-indigo-500 px-4 py-2 rounded font-bold hover:bg-indigo-600"
            onClick={() => setShowLeaderboard(true)}
          >
            Leaderboard
          </button>
          <button
            className="w-full bg-green-500 px-4 py-2 rounded font-bold hover:bg-green-600"
            onClick={() => setShowSettings(true)}
          >
            Settings
          </button>
          <button
            className="w-full bg-red-500 px-4 py-2 rounded font-bold hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Leaderboard popup */}
      {showLeaderboard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-800 text-white rounded-xl shadow-lg p-6 w-80 relative">
            <button
              onClick={() => setShowLeaderboard(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-3">🏆 Leaderboard</h2>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {leaderboard.map((player, index) => (
                <li
                  key={player._id}
                  className="flex justify-between bg-gray-700 p-2 rounded"
                >
                  <span>{index + 1}. {player.username}</span>
                  <span>{player.score} pts</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Settings popup */}
      {showSettings && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6 w-[420px] relative">
            {/* Close Button */}
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✖
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              ⚙️ Settings
            </h2>

            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={profilePicture || "/src/assets/default-profile.png"} // Use a local default image
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-gray-600 object-cover"
              />
              <div>
                <p className="font-bold text-lg">{username}</p>
                <p className="text-sm text-gray-400">User ID: {userId}</p>
              </div>
            </div>

            {/* Username */}
            <div className="mb-5">
              <label className="block text-sm mb-1 font-medium">👤 Change Username</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 outline-none"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-indigo-500 px-4 py-2 rounded font-bold hover:bg-indigo-600"
                onClick={updateUsername}
              >
                Update Username
              </button>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm mb-1 font-medium">🔑 Change Password</label>
              <input
                type="password"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-blue-500 px-4 py-2 rounded font-bold hover:bg-blue-600"
                onClick={updatePassword}
              >
                Update Password
              </button>
            </div>

            {/* Profile Picture */}
            <div className="mb-5">
              <label className="block text-sm mb-1 font-medium">🖼️ Profile Picture</label>
              <div
                {...getRootProps()}
                className="w-full p-4 rounded bg-gray-800 border border-gray-700 focus:border-purple-500 outline-none text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {uploadedImage ? (
                  <img
                    src={profilePicture}
                    alt="Uploaded Preview"
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />
                ) : (
                  <p className="text-gray-400">Drag & drop an image here, or click to select</p>
                )}
              </div>
              <button
                className="mt-2 w-full bg-purple-500 px-4 py-2 rounded font-bold hover:bg-purple-600"
                onClick={updateProfilePicture}
              >
                Update Picture
              </button>
            </div>

            {/* Learning Reminders */}
            <div className="mb-5">
              <label className="block text-sm mb-1 font-medium">📅 Learning Reminders</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-green-500 outline-none"
                value={reminders}
                onChange={(e) => setReminders(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-green-500 px-4 py-2 rounded font-bold hover:bg-green-600"
                onClick={updateReminders}
              >
                Save Reminders
              </button>
            </div>

            {/* Login Activity */}
            <div className="mb-6">
              <button
                className="w-full bg-yellow-500 px-4 py-2 rounded font-bold hover:bg-yellow-600"
                onClick={fetchLoginActivity}
              >
                Show Login Activity
              </button>
              {loginActivity.length > 0 && (
                <ul className="mt-3 space-y-2 max-h-32 overflow-y-auto text-sm bg-gray-800 p-3 rounded border border-gray-700">
                  {loginActivity.map((log, index) => (
                    <li key={index} className="flex items-center gap-2">
                      🛰️ <span>{log}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Danger Zone */}
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-red-400 font-bold mb-2">⚠️ Danger Zone</h3>
              <button
                className="w-full bg-red-500 px-4 py-2 rounded font-bold hover:bg-red-600"
                onClick={deleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
