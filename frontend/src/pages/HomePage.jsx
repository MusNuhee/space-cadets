// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationModal from "../components/NotificationModal";
import AccountModal from "../components/AccountModal";
import SearchBar from "../components/SearchBar";


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
  "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"  // Technologies
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
    <div className="flex flex-col min-h-screen text-white relative overflow-x-hidden">
      {/* Animated Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Images with Transitions */}
        {heroBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentBackground ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/50"></div>
        
        {/* Header with Search Bar */}
        <div className="relative z-20">
          <Header
            onNotificationClick={() => setShowNotifications(true)}
            onAccountClick={() => setShowAccount(true)}
          />
          {/* Search Bar at Top */}
          <div className="container mx-auto px-6 mt-4">
            <SearchBar data={data} />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center pt-16">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in">
                {heroContents[currentBackground].title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in delay-300">
                {heroContents[currentBackground].description}
              </p>
              <button 
                onClick={() => navigateToTop("/explore")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full font-bold text-white text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-blue-500/30 animate-fade-in delay-500"
              >
                {heroContents[currentBackground].buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => goToBackground(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBackground ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Exploration Cards Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text">
            Explore the Cosmos
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {explorationCards.map((card, index) => (
              <div
                key={card.path}
                className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-between h-64 transition-all duration-500 border-2 border-gray-700/50 hover:border-gray-500 overflow-hidden group hover:scale-105 hover:shadow-2xl"
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${card.bgGradient}`}></div>
                
                {/* Card content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <span className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </span>
                  <h3 className="text-xl font-bold text-center mb-2 text-white">{card.label}</h3>
                </div>
                
                <button
                  onClick={() => navigateToTop(card.path)}
                  className={`relative z-10 bg-gradient-to-r ${card.gradient} px-6 py-2 rounded-full font-bold text-white hover:shadow-lg transition-all transform hover:scale-105 w-full max-w-xs`}
                >
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Console Section */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center border-4 border-blue-500 overflow-hidden group hover:border-cyan-400 transition-all duration-500">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            <div className="relative z-10 text-center">
              <span className="text-6xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">🎮</span>
              <h2 className="text-3xl font-bold mb-2 text-blue-300 group-hover:text-cyan-300 transition-colors">
                Space Cadets Game Console
              </h2>
              <p className="text-lg mb-6 text-blue-200 group-hover:text-cyan-200 transition-colors text-center max-w-2xl">
                Ready for fun? Play space-themed games and challenge your friends in our interactive gaming hub!
              </p>
              <button
                className="bg-gradient-to-r from-green-500 to-cyan-500 px-8 py-3 rounded-xl font-bold text-white text-xl hover:from-green-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/30 group-hover:shadow-cyan-500/50"
                onClick={() => navigateToTop("/games")}
              >
                Let's Play!
              </button>
            </div>
          </div>
        </div>
      </section>

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