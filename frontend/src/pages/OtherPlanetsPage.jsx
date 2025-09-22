// src/pages/SunPage.jsx
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SpaceBackground from "../components/SpaceBackground"; 
import Solarsystem from "../assets/solarsystem.jpg"; // make sure this path is correct

const SunPage = () => {
  const [tab, setTab] = useState("overview");

  // Generate random stars
  const stars = Array.from({ length: 50 }, () => ({
    size: `${Math.random() * 3 + 1}px`,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 5 + 2,
  }));

  const sunFacts = [
    {
      name: "Sun",
      description:
        "The Sun is the star at the center of our solar system. It provides light, warmth, and energy for life on Earth.",
    },
  ];

  return (
    <div className="relative flex flex-col min-h-screen text-white overflow-hidden bg-black">
      {/* Floating Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-70 animate-pulse"
          style={{
            width: star.size,
            height: star.size,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Overlay for content */}
      <div className="relative z-10 min-h-screen flex flex-col bg-black/40">
         <SpaceBackground />
        <Header activePage="sun" />
        <SearchBar data={sunFacts} />

        <main className="flex-grow flex flex-col items-center px-6 relative z-10">
          {/* Hero Section */}
          <section className="relative w-full">
            <div
              className="relative flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl py-20 mx-auto
        bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/50"
              style={{ backgroundImage: `url(${Solarsystem})` }}
            >
              {/* Gradient fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>

              <div className="relative z-10 flex-1 text-center md:text-left px-6">
                <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow-lg">
                   The Planets
                </h1>
                <p className="text-lg md:text-xl text-gray-200 drop-shadow">
                  The Sun provides energy, light, and warmth that makes life possible on Earth.
                  Explore its layers, structure, and amazing phenomena!
                </p>
              </div>
            </div>
          </section>

          {/* Tabs Section */}
          <section className="mt-8 w-full max-w-4xl">
            <div className="flex justify-center gap-6 border-b border-gray-600">
              {["overview", "layers", "importance", "fun"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-2 text-lg capitalize ${
                    tab === t
                      ? "text-yellow-400 border-b-2 border-yellow-400 font-semibold drop-shadow"
                      : "text-gray-400"
                  } transition`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-6 text-gray-200 text-center md:text-left space-y-4">
              {tab === "overview" && (
                <p>
                  The Sun is a massive sphere of hot plasma composed mainly of hydrogen and helium. Its gravity keeps planets in orbit, and it generates energy through <strong>nuclear fusion</strong>.
                </p>
              )}
              {tab === "layers" && (
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Core:</strong> Fusion occurs here, producing enormous energy.</li>
                  <li><strong>Radiative Zone:</strong> Energy slowly moves outward via radiation.</li>
                  <li><strong>Convective Zone:</strong> Hot plasma circulates, transporting energy to the surface.</li>
                  <li><strong>Photosphere:</strong> Visible surface emitting light.</li>
                  <li><strong>Chromosphere:</strong> Red-colored layer above the surface.</li>
                  <li><strong>Corona:</strong> Outer atmosphere, visible during solar eclipses.</li>
                </ul>
              )}
              {tab === "importance" && (
                <p>
                  The Sun provides light and warmth, drives weather and ocean currents, and powers photosynthesis. Without it, Earth would be lifeless and frozen.
                </p>
              )}
              {tab === "fun" && (
                <p>
                  Fun Fact: The Sun is so massive that about 1.3 million Earths could fit inside it! Its gravity influences the orbits of all planets.
                </p>
              )}
            </div>
          </section>

          {/* Facts Section */}
          <section className="mt-16 w-full max-w-6xl">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
              🌟 Amazing Sun Facts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                "Age: 4.6 billion years",
                "Diameter: 1.39 million km",
                "Surface temp: ~5,500 °C",
                "Core temp: ~15 million °C",
                "99.8% of Solar System's mass",
                "Will become a Red Giant in ~5 billion years",
                "Light takes ~8 minutes to reach Earth",
                "Sunspots and solar flares affect space weather",
              ].map((fact, i) => (
                <div
                  key={i}
                  className="p-5 rounded-lg bg-white/10 border border-yellow-500 hover:bg-yellow-500/20 hover:scale-105 transition text-center"
                >
                  {fact}
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default SunPage;
