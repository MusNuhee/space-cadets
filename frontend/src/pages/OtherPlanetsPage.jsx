// src/pages/OtherPlanetsPage.jsx
import { useState, useRef, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SpaceBackground from "../components/SpaceBackground";
import Solarsystem from "../assets/solarsystem.jpg";

export default function OtherPlanetsPage() {
  // Floating stars
  const stars = Array.from({ length: 50 }, () => ({
    size: `${Math.random() * 3 + 1}px`,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 5 + 2,
  }));

  // Planet data
  const planets = [
    {
      name: "Mercury",
      facts: [
        "Closest planet to the Sun",
        "Very hot during the day and freezing at night",
        "Smallest planet in the Solar System",
        "No atmosphere to retain heat",
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
    },
    {
      name: "Venus",
      facts: [
        "Hottest planet in the Solar System",
        "Covered in thick clouds",
        "Rotates slowly in retrograde",
        "Surface pressure is 92 times Earth's",
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
    },
    {
      name: "Earth",
      facts: [
        "Our home planet",
        "Only planet known with life",
        "Has water, air, and atmosphere",
        "Tectonic activity shapes continents",
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
    },
    {
      name: "Mars",
      facts: [
        "The Red Planet",
        "Has the tallest volcano",
        "Has the largest canyon",
        "Thin atmosphere mostly of CO2",
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    },
    {
      name: "Jupiter",
      facts: [
        "Largest planet",
        "Has Great Red Spot",
        "Gas giant made mostly of hydrogen",
        "Has 95 moons",
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
    },
    {
      name: "Saturn",
      facts: [
        "Famous for its rings",
        "Rings made of ice and rock",
        "Gas giant like Jupiter",
        "Has 83 moons",
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
    },
    {
      name: "Uranus",
      facts: [
        "Spins on its side",
        "Has faint blue rings",
        "Gas giant with methane giving blue color",
        "Very cold and distant from Sun",
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
    },
    {
      name: "Neptune",
      facts: [
        "Farthest from the Sun",
        "Windiest planet",
        "Deep blue color due to methane",
        "Has 14 known moons",
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg",
    },
  ];

  // Quiz data
  const otherPlanetsQuizQuestions = [
    { question: "Which planet is closest to the Sun?", options: ["Mercury", "Venus", "Earth", "Mars"], correct: "Mercury" },
    { question: "Which planet is the hottest?", options: ["Venus", "Mercury", "Earth", "Mars"], correct: "Venus" },
    { question: "Which planet is our home?", options: ["Earth", "Mars", "Venus", "Mercury"], correct: "Earth" },
    { question: "Which planet is called the Red Planet?", options: ["Mars", "Earth", "Venus", "Mercury"], correct: "Mars" },
    { question: "Which planet is the largest?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correct: "Jupiter" },
    { question: "Which planet has rings?", options: ["Saturn", "Jupiter", "Uranus", "Neptune"], correct: "Saturn" },
    { question: "Which planet spins on its side?", options: ["Uranus", "Saturn", "Jupiter", "Neptune"], correct: "Uranus" },
    { question: "Which planet is the windiest?", options: ["Neptune", "Uranus", "Saturn", "Jupiter"], correct: "Neptune" },
  ];

  // States
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const toggleCard = (index) => {
    setOpenCardIndex(openCardIndex === index ? null : index);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === otherPlanetsQuizQuestions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      if (currentQuestion < otherPlanetsQuizQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        if (score + 1 >= 5) setShowBadge(true);
        else setShowScore(true);
        setShowQuiz(false);
      }
    }, 1000);
  };

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

      <div className="relative z-10 min-h-screen flex flex-col bg-black/40">
        <SpaceBackground />
        <Header activePage="planets" />
        <SearchBar data={planets} />

        <main className="flex-grow flex flex-col items-center px-6 relative z-10">
          {/* Hero */}
          <section className="relative w-full">
            <div
              className="relative flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl py-20 mx-auto
                bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/50"
              style={{ backgroundImage: `url(${Solarsystem})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
              <div className="relative z-10 flex-1 text-center md:text-left px-6">
                <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow-lg">
                  The Planets
                </h1>
                <p className="text-lg md:text-xl text-gray-200 drop-shadow">
                  Learn about the planets in our Solar System — and test your knowledge with a fun quiz!
                </p>
              </div>
            </div>
          </section>

          {/* Planet Cards */}
          <section className="mt-12 max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {planets.map((planet, index) => {
                const contentRef = useRef(null);
                const [maxHeight, setMaxHeight] = useState(0);

                useEffect(() => {
                  if (openCardIndex === index && contentRef.current) {
                    setMaxHeight(contentRef.current.scrollHeight);
                  } else {
                    setMaxHeight(0);
                  }
                }, [openCardIndex, index]);

                return (
                  <div
                    key={index}
                    className="relative bg-black/20 border border-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_#ffffff] cursor-pointer flex flex-col justify-between w-70"
                  >
                    {/* Planet Image */}
                    <div className="relative flex justify-center mt-6">
                      <img
                        src={planet.img}
                        alt={planet.name}
                        className="w-40 h-40 rounded-xl object-cover animate-spin-slow"
                      />
                    </div>

                    {/* Planet Name */}
                    <div className="p-4 text-center">
                      <h3 className="text-2xl font-bold text-white">{planet.name}</h3>
                    </div>

                    {/* Toggle Arrow */}
                    <div
                      className="text-center pb-4 cursor-pointer"
                      onClick={() => toggleCard(index)}
                    >
                      {openCardIndex === index ? (
                        <FaChevronUp className="mx-auto text-yellow-400" />
                      ) : (
                        <FaChevronDown className="mx-auto text-yellow-400" />
                      )}
                    </div>

                    {/* Facts */}
                    <div
                      ref={contentRef}
                      style={{ maxHeight: `${maxHeight}px` }}
                      className="overflow-hidden transition-[max-height] duration-500 px-4 pb-4 bg-gradient-to-b from-gray-800 to-gray-700"
                    >
                      {planet.facts.map((fact, i) => (
                        <p key={i} className="text-gray-200 list-disc list-inside mb-1">
                          • {fact}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quiz Button */}
          <div className="mt-8 text-center">
            <button
              className="bg-green-500 px-6 py-2 rounded font-bold text-white hover:bg-green-600"
              onClick={() => {
                setShowQuiz(true);
                setCurrentQuestion(0);
                setScore(0);
              }}
            >
              🎯 Start Planets Quiz
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
                <p className="text-lg mb-4">{otherPlanetsQuizQuestions[currentQuestion].question}</p>
                <div className="grid grid-cols-1 gap-4">
                  {otherPlanetsQuizQuestions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-2 rounded ${
                        selectedAnswer === option
                          ? option === otherPlanetsQuizQuestions[currentQuestion].correct
                            ? "bg-green-500 border-4 border-green-700"
                            : "bg-red-500 border-4 border-red-700"
                          : "bg-blue-500 hover:bg-blue-600 text-black"
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

          {/* Badge and Score */}
          {showBadge && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-md text-center">
                <h2 className="text-xl font-bold mb-4">🎉 Congratulations!</h2>
                <p className="text-lg mb-4">
                  You earned a badge for scoring {score}/{otherPlanetsQuizQuestions.length} correct answers!
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
                <h2 className="text-xl font-bold mb-4">
                  Your Score: {score}/{otherPlanetsQuizQuestions.length}
                </h2>
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
