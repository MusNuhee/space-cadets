// src/pages/SunPage.jsx
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SpaceBackground from "../components/SpaceBackground"; 
import SunHero from "../assets/sun.jpg"; 

const sunFacts = [
  {
    name: "Sun",
    description:
      "The Sun is the star at the center of our solar system. It provides light and heat necessary for life on Earth. It makes up 99.8% of the solar system’s mass!",
  },
  {
    name: "Solar Energy",
    description:
      "The Sun's energy powers life on Earth, drives weather patterns, and supports photosynthesis in plants.",
  },
];

const sunQuizQuestions = [
  { question: "What is the Sun?", options: ["A planet", "A star", "A galaxy", "A moon"], correct: "A star" },
  { question: "What does the Sun provide?", options: ["Light and heat", "Water", "Air", "Gravity"], correct: "Light and heat" },
  { question: "What is the Sun made of?", options: ["Hydrogen and helium", "Oxygen and nitrogen", "Carbon and iron", "Water and air"], correct: "Hydrogen and helium" },
  { question: "What is the process happening in the Sun?", options: ["Nuclear fusion", "Combustion", "Evaporation", "Condensation"], correct: "Nuclear fusion" },
  { question: "What is the Sun's position in the solar system?", options: ["Center", "Edge", "Above Earth", "Below Earth"], correct: "Center" },
  { question: "How long does it take for sunlight to reach Earth?", options: ["8 minutes", "1 hour", "24 hours", "1 second"], correct: "8 minutes" },
  { question: "What is the Sun's surface temperature?", options: ["5,500°C", "1,000°C", "10,000°C", "100°C"], correct: "5,500°C" },
  { question: "What is the Sun's core temperature?", options: ["15 million°C", "1 million°C", "100,000°C", "10,000°C"], correct: "15 million°C" },
  { question: "What is the Sun's diameter?", options: ["1.39 million km", "100,000 km", "500,000 km", "10 million km"], correct: "1.39 million km" },
  { question: "What is the Sun's age?", options: ["4.6 billion years", "1 billion years", "10 billion years", "100 million years"], correct: "4.6 billion years" },
  { question: "What is the Sun's primary source of energy?", options: ["Nuclear fusion", "Combustion", "Solar wind", "Magnetism"], correct: "Nuclear fusion" },
  { question: "What is the Sun's outermost layer called?", options: ["Corona", "Photosphere", "Chromosphere", "Core"], correct: "Corona" },
  { question: "What are sunspots?", options: ["Cooler areas on the Sun", "Hotter areas on the Sun", "Storms on the Sun", "Magnetic fields"], correct: "Cooler areas on the Sun" },
  { question: "What is a solar flare?", options: ["A burst of energy from the Sun", "A sunspot", "A solar eclipse", "A magnetic storm"], correct: "A burst of energy from the Sun" },
  { question: "What is the Sun's gravitational pull responsible for?", options: ["Keeping planets in orbit", "Creating tides", "Causing eclipses", "All of the above"], correct: "Keeping planets in orbit" },
];

export default function SunPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [tab, setTab] = useState("overview");
  const [stars, setStars] = useState([]);

  // Generate floating stars
  useEffect(() => {
    const starArray = Array.from({ length: 60 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 5,
    }));
    setStars(starArray);
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === sunQuizQuestions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      if (currentQuestion < sunQuizQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        if (score + 1 >= 6) setShowBadge(true);
        else setShowScore(true);
        setShowQuiz(false);
      }
    }, 1000);
  };

  return (
    <div className="relative flex flex-col min-h-screen text-white overflow-hidden">
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
      <div className="relative z-10 bg-black/40 min-h-screen flex flex-col">
        <SpaceBackground />
        <Header activePage="sun" />
        <SearchBar data={sunFacts} />

        <main className="flex-grow flex flex-col items-center px-6 relative z-10">
          {/* 🌞 Hero Section with Background Image + Blend */}
          <section className="relative w-full">
          <div
    className="relative flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl py-20 mx-auto
        bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/50"
    style={{ backgroundImage: `url(${SunHero})`}}
  >
              
              {/* Gradient fade to blend bottom into page */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>

              <div className="relative z-10 flex-1 text-center md:text-left px-6">
                <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow-lg">
                  ☀️ The Sun
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

          {/* Quiz Section */}
          <div className="mt-12 text-center">
            <button
              className="bg-yellow-500 px-6 py-2 rounded font-bold text-black hover:bg-yellow-600"
              onClick={() => {
                setShowQuiz(true);
                setCurrentQuestion(0);
                setScore(0);
              }}
            >
              🎯 Start Sun Quiz
            </button>
          </div>

          {/* Quiz Modal */}
          {showQuiz && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-md relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => setShowQuiz(false)}
                >
                  ✖
                </button>
                <h2 className="text-xl font-bold mb-4">Quiz Time!</h2>
                <p className="text-lg mb-4">{sunQuizQuestions[currentQuestion].question}</p>
                <div className="grid grid-cols-1 gap-4">
                  {sunQuizQuestions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-2 rounded ${
                        selectedAnswer === option
                          ? option === sunQuizQuestions[currentQuestion].correct
                            ? "bg-green-500 border-4 border-green-700"
                            : "bg-red-500 border-4 border-red-700"
                          : "bg-yellow-500 hover:bg-yellow-600 text-black"
                      }`}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Badge and Score Modals */}
          {showBadge && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-md text-center">
                <h2 className="text-xl font-bold mb-4">🎉 Congratulations!</h2>
                <p className="text-lg mb-4">
                  You earned a badge for scoring {score}/{sunQuizQuestions.length} correct answers!
                </p>
                <button
                  className="bg-green-500 px-6 py-2 rounded font-bold text-white hover:bg-green-600"
                  onClick={() => setShowBadge(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showScore && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-md text-center">
                <h2 className="text-xl font-bold mb-4">Your Score: {score}/{sunQuizQuestions.length}</h2>
                <p className="text-lg mb-4">Try again next time to earn the badge!</p>
                <button
                  className="bg-blue-500 px-6 py-2 rounded font-bold text-white hover:bg-blue-600"
                  onClick={() => setShowScore(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
