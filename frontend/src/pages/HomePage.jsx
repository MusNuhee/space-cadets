// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationModal from "../components/NotificationModal";
import AccountModal from "../components/AccountModal";
import SearchBar from "../components/SearchBar";
import SpaceBackground from '../components/SpaceBackground';


const data = [
  { name: "Sun", img: "/src/assets/logo.png", description: "Explore the Sun" },
  { name: "Earth", img: "/src/assets/logo.png", description: "Explore the Earth" },
  { name: "Moon", img: "/src/assets/logo.png", description: "Explore the Moon" },
  { name: "Other Planets", img: "/src/assets/logo.png", description: "Explore Other Planets" },
  { name: "Universe", img: "/src/assets/logo.png", description: "Explore the Universe" },
];

// Background images for the hero section
const heroBackgrounds = [
  "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1478&q=80", // Sun
  "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80", // Moon
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1510&q=80", // Planets
  "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",  // Technologies
];

const heroContents = [
  {
    title: "Discover Our Sun",
    description: "Explore the center of our solar system. Learn about solar flares, sunspots, and the incredible energy that powers our world.",
    buttonText: "Explore Sun"
  },
  {
    title: "Lunar Mysteries",
    description: "Journey to Earth's natural satellite. Discover craters, lunar seas, and the fascinating geology of our Moon.",
    buttonText: "Explore Moon"
  },
  {
    title: "Planetary Systems",
    description: "Visit all the planets in our solar system. From gas giants to rocky worlds, explore diverse planetary environments.",
    buttonText: "Explore Planets"
  },
  {
    title: "Space Technologies",
    description: "Discover the latest innovations in space exploration. From rockets to satellites, see how technology expands our reach.",
    buttonText: "Explore Tech"
  }
];

export default function HomePage() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(0);

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

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Manual navigation for background
  const goToBackground = (index) => {
    setCurrentBackground(index);
  };

  // Navigation function that scrolls to top
  const navigateToTop = (path) => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Then navigate after a small delay
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  const explorationCards = [
    { 
      label: "☀️ Sun", 
      path: "/sun", 
      gradient: "from-yellow-500 to-orange-600",
      bgGradient: "from-yellow-900/40 to-orange-900/40",
      borderColor: "border-yellow-500",
      icon: "☀️"
    },
    { 
      label: "🌍 Earth", 
      path: "/earth", 
      gradient: "from-blue-500 to-green-500",
      bgGradient: "from-blue-900/40 to-green-900/40",
      borderColor: "border-blue-400",
      icon: "🌍"
    },
    { 
      label: "🪐 Other Planets", 
      path: "/otherplanets", 
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-900/40 to-pink-900/40",
      borderColor: "border-purple-500",
      icon: "🪐"
    },
    { 
      label: "🌌 Universe", 
      path: "/universe", 
      gradient: "from-indigo-600 to-purple-900",
      bgGradient: "from-indigo-900/40 to-purple-900/40",
      borderColor: "border-indigo-500",
      icon: "🌌"
    },
    { 
      label: "🌙 Moon", 
      path: "/moon", 
      gradient: "from-gray-400 to-gray-700",
      bgGradient: "from-gray-800/40 to-gray-900/40",
      borderColor: "border-gray-400",
      icon: "🌙"
    },
    { 
      label: "✨ Star Constellation", 
      path: "/starconstellation", 
      gradient: "from-blue-300 to-indigo-500",
      bgGradient: "from-blue-900/40 to-indigo-900/40",
      borderColor: "border-blue-300",
      icon: "✨"
    },
    { 
      label: "🚀 New Technologies", 
      path: "/newtechnologies", 
      gradient: "from-green-400 to-cyan-500",
      bgGradient: "from-green-900/40 to-cyan-900/40",
      borderColor: "border-cyan-400",
      icon: "🚀"
    },
    { 
      label: "🌀 Known Galaxies", 
      path: "/knowngalaxies", 
      gradient: "from-violet-500 to-fuchsia-600",
      bgGradient: "from-violet-900/40 to-fuchsia-900/40",
      borderColor: "border-violet-500",
      icon: "🌀"
    },
  ];

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