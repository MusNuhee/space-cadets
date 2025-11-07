// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationModal from "../components/NotificationModal";
import AccountModal from "../components/AccountModal";
import SearchBar from "../components/SearchBar";
import SpaceBackground from "../components/SpaceBackground"; 


const data = [
  { name: "Sun", img: "/src/assets/logo.png", description: "Explore the Sun" },
  { name: "Earth", img: "/src/assets/logo.png", description: "Explore the Earth" },
  { name: "Moon", img: "/src/assets/logo.png", description: "Explore the Moon" },
  { name: "Other Planets", img: "/src/assets/logo.png", description: "Explore Other Planets" },
  { name: "Universe", img: "/src/assets/logo.png", description: "Explore the Universe" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [inactive, setInactive] = useState(false);

  // Check last visit time and show notifications if inactive for 5 days
  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    localStorage.setItem("lastVisit", now);

    if(!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn") !== "true"){
      navigate("/login");
    }

    if (lastVisit) {
      const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;
      if (now - lastVisit > FIVE_DAYS) {
        setInactive(true);
        setShowNotifications(true);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen  text-white relative">
      <SpaceBackground />
      <Header
        onNotificationClick={() => setShowNotifications(true)}
        onAccountClick={() => setShowAccount(true)}
      />
      <main className="flex-grow flex flex-col justify-center items-center gap-6 ">
        {/* background video section */}
        <div className="relative w-full h-150 overflow-hidden rounded-xl mb-6">
          
          <video
            src="https://www.solarsystemscope.com/video/sss3_intro_720p_2-5b.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          /> <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4">
      <SearchBar data={data} />
    </div>
          <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-4xl font-bold mb-2">Welcome to Space Cadets 🚀</h1>
            <p className="text-lg max-w-xl">Explore the cosmos — one planet at a time.</p>
          </div>
        </div>

        {/* pages cards */}
        {(() => {
          const pages = [
            { label: "☀️ Sun", path: "/sun", img: "/src/assets/sun.jpg" },
            { label: "🌍 Earth", path: "/earth", img: "/src/assets/earth.jpg" },
            { label: "🪐 Other Planets", path: "/otherplanets", img: "/src/assets/planets.jpg" },
            { label: "🌌 Universe", path: "/universe", img: "/src/assets/universe.jpg" },
            { label: "🌙 Moon", path: "/moon", img: "/src/assets/moon.jpg" },
            { label: "✨ Star Constellation", path: "/starconstellation", img: "/src/assets/constellation.jpg" },
            { label: "🚀 New Technologies", path: "/newtechnologies", img: "/src/assets/technology.jpg" },
            { label: "🌀 Known Galaxies", path: "/knowngalaxies", img: "/src/assets/galaxy.jpg" },
          ];

          return pages.map(({ label, path, img }) => (
            <div
              key={path}
              className="relative w-full h-100 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/55"></div>
              <div className="relative z-10 flex flex-col items-center justify-between h-full p-6 text-white">
                <span className="text-3xl mb-2">{label}</span>
                <button
                  onClick={() => navigate(path)}
                  className="bg-blue-500 px-4 py-2 rounded font-bold text-white hover:bg-blue-600"
                >
                  Explore
                </button>
              </div>
            </div>
          ));
        })()}
        {/* Game Console Card */}
        <div className="w-full max-w-2xl mt-10 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center border-4 border-blue-500">
          <span className="text-5xl mb-4">🎮</span>
          <h2 className="text-3xl font-bold mb-2 text-blue-300">Space Cadets Game Console</h2>
          <p className="text-lg mb-6 text-blue-200 text-center">
            Ready for fun? Play space-themed games and challenge your friends!
          </p>
          <button
            className="bg-green-500 px-8 py-3 rounded-xl font-bold text-white text-xl hover:bg-green-600 transition-colors"
            onClick={() => navigate("/games")}
          >
            Let's Play!
          </button>
        </div>
      </main>

      <Footer />

      {/* Notifications Modal */}
      {showNotifications && (
        <NotificationModal onClose={() => setShowNotifications(false)} inactive={inactive} />
      )}

      {/* Account Modal */}
      {showAccount && <AccountModal onClose={() => setShowAccount(false)} />}
    </div>
  );
}
