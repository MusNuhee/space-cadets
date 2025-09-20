// src/pages/SunPage.jsx
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const sunFacts = [
  {
    name: "Sun",
    description:
      "The Sun is the star at the center of our solar system. It provides light and heat necessary for life on Earth.",
  },
  {
    name: "Solar Energy",
    description:
      "The Sun's energy powers life on Earth and drives weather patterns.",
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
  const [tab, setTab] = useState("overview"); // FIX: added missing tab state

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
        if (score + 1 >= 12) {
          setShowBadge(true);
        } else {
          setShowScore(true);
        }
        setShowQuiz(false);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-200 to-orange-500">
      <Header activePage="sun" />
      <SearchBar data={sunFacts} />

      <main className="flex-grow flex flex-col items-center text-black px-6">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl py-16">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-600 mb-4">The Sun</h1>
            <p className="text-gray-800 text-lg md:text-xl">
              The Sun is the center of our solar system, providing light, energy, and life to Earth. Explore its fascinating structure and importance.
            </p>
          </div>
          <div className="flex-1 flex justify-center relative w-64 h-64">
            <div className="absolute inset-0 rounded-full bg-yellow-400 animate-pulse blur-lg"></div>
            <div className="absolute inset-0 rounded-full bg-yellow-300 animate-spin-slow"></div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mt-8 w-full max-w-4xl">
          <div className="flex justify-center gap-6 border-b border-gray-700">
            {["overview", "structure", "importance"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-2 text-lg ${
                  tab === t
                    ? "text-yellow-600 border-b-2 border-yellow-600 font-semibold"
                    : "text-gray-600"
                } transition`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="mt-6 text-gray-800 text-center md:text-left space-y-4">
            {tab === "overview" && (
              <p>
                The Sun is a nearly perfect sphere of hot plasma, mainly hydrogen and helium. It constitutes 99.8% of the solar system's mass and is vital for life on Earth.
              </p>
            )}
            {tab === "structure" && (
              <p>
                Layers include the core, radiative zone, convective zone, photosphere, chromosphere, and corona. Each layer transfers energy and drives solar phenomena.
              </p>
            )}
            {tab === "importance" && (
              <p>
                The Sun provides light and warmth, powers photosynthesis, drives weather, and supports life on Earth. Without it, our planet would be frozen and lifeless.
              </p>
            )}
          </div>
        </section>

        {/* Facts Section */}
        <section className="mt-16 w-full max-w-6xl">
          <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Amazing Facts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "4.6 billion years old",
              "Light reaches Earth in ~8 minutes",
              "Core temperature ~15 million °C",
              "109 times wider than Earth",
              "Contains 99.8% of solar system’s mass",
              "Will eventually become a red giant",
            ].map((fact, i) => (
              <div
                key={i}
                className="p-5 rounded-lg bg-white/70 border border-yellow-300 hover:border-yellow-600 hover:scale-105 transition text-center"
              >
                {fact}
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mt-16 w-full max-w-6xl">
          <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Sun Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "https://solarsystem.nasa.gov/system/stellar_items/image_files/4_sun.jpg",
              "https://upload.wikimedia.org/wikipedia/commons/c/c3/Solar_prominence_from_STEREO_spacecraft_September_29%2C_2008.jpg",
              "https://upload.wikimedia.org/wikipedia/commons/4/4a/Sun_white_light.jpg",
            ].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Sun"
                className="rounded-lg shadow-lg hover:scale-105 transition"
              />
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12 text-center">
          <button
            className="bg-yellow-500 px-6 py-2 rounded font-bold text-white hover:bg-yellow-600"
            onClick={() => {
              setShowQuiz(true);
              setCurrentQuestion(0);
              setScore(0);
            }}
          >
            Start Quiz
          </button>
        </div>

        {/* Quiz Modal */}
        {showQuiz && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md relative">
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
                        : "bg-yellow-500 hover:bg-yellow-600"
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

        {/* Badge Modal */}
        {showBadge && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md text-center">
              <h2 className="text-xl font-bold mb-4">🎉 Congratulations!</h2>
              <p className="text-lg mb-4">
                You earned a badge for scoring {score}/15 correct answers!
              </p>
              <img
                src="/src/assets/logo.png"
                alt="Badge"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <button
                className="bg-green-500 px-6 py-2 rounded font-bold text-white hover:bg-green-600"
                onClick={() => setShowBadge(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Score Modal */}
        {showScore && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md text-center">
              <h2 className="text-xl font-bold mb-4">Your Score: {score}/15</h2>
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
  );
}
