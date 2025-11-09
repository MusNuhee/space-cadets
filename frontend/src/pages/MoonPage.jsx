import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import moonphase from "../assets/moonphase.mp4";
import bloodmoon from "../assets/bloodmoon.png";
import bluemoon from "../assets/bluemoon.png";
import supermoon from "../assets/supermoon.png";
import harvestmoon from "../assets/harvestmoon.png";

const moonFacts = [
  { name: "What is the Moon?", description: "The Moon is Earth's only natural satellite. It orbits our planet and shines at night!" },
  { name: "Who was the first person on the Moon?", description: "Neil Armstrong was the first person to walk on the Moon in 1969." },
  { name: "Why does the Moon change shape?", description: "The Moon looks different each night because of its phases: new moon, crescent, half, and full moon." },
  { name: "How far is the Moon from Earth?", description: "The Moon is about 384,400 km (238,855 miles) away from Earth." },
  { name: "What are moon craters?", description: "Craters are holes on the Moon's surface made by space rocks hitting it." },
  { name: "Why does the Moon shine?", description: "The Moon shines because it reflects light from the Sun." },
];

const quizQuestions = [
  { question: "What is the Moon?", options: ["A planet", "A star", "A satellite", "A galaxy"], correct: "A satellite" },
  { question: "Who was the first person to walk on the Moon?", options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"], correct: "Neil Armstrong" },
  { question: "Why does the Moon change shape?", options: ["It rotates", "It reflects sunlight", "Its phases", "It moves closer"], correct: "Its phases" },
  { question: "How far is the Moon from Earth?", options: ["384,400 km", "500,000 km", "100,000 km", "1 million km"], correct: "384,400 km" },
  { question: "What are moon craters?", options: ["Volcanoes", "Holes made by space rocks", "Mountains", "Lakes"], correct: "Holes made by space rocks" },
  { question: "Why does the Moon shine?", options: ["It emits light", "It reflects sunlight", "It absorbs light", "It glows"], correct: "It reflects sunlight" },
];

export default function MoonPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        if (score + (answer === quizQuestions[currentQuestion].correct ? 1 : 0) >= 5) {
          setShowBadge(true);
        } else {
          setShowScore(true);
        }
        setShowQuiz(false);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setShowBadge(false);
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen flex flex-col text-white relative overflow-hidden">
      <SpaceBackground />
      <Header activePage="moon" />
      <SearchBar data={moonFacts} />

      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-10">
        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-4 text-yellow-300 drop-shadow-lg animate-pulse">
          🌕 Welcome to the Moon!
        </h1>

        {/* Text + Moon Image */}
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl gap-10 relative mt-10">
          <div className="text-left md:w-1/2 p-8 rounded-2xl shadow-lg bg-black/50 z-10 translate-y-8 translate-x-8">
            <p className="text-lg text-gray-100 leading-relaxed text-justify">
              🌕 The Moon is Earth's only natural satellite. 🌍 It travels around our planet once every{" "}
              <span className="text-yellow-400 font-semibold">27 days</span> and lights up the night sky with its silvery glow!
              <br /><br />
              The Moon is like Earth's special space friend and it changes shapes. Sometimes round, sometimes just a thin slice. It doesn't make its own light but shines by reflecting the Sun's rays, making our nights bright and beautiful! 🌙  
              <br /><br />
              The Moon also helps control ocean tides on Earth! Astronauts have visited it and left their footprints there. When you look up at the night sky, you're seeing the same Moon people have watched for thousands of years glowing softly in space! ✨
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center items-center z-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg"
              alt="Realistic Moon"
              className="w-[350px] h-[350px] md:w-[400px] md:h-[400px] object-cover rounded-full shadow-2xl opacity-90 animate-float"
            />
          </div>
        </div>

        {/* Did You Know Section */}
        <section className="max-w-4xl mt-32 bg-gray-800/70 p-8 rounded-2xl shadow-xl text-left">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">🌙 Did You Know?</h2>
          <p className="text-lg text-gray-200 text-justify mb-4">
            The Moon always shows the same side to Earth because it rotates at the same rate that it orbits our planet. This is called{" "}
            <span className="text-yellow-400 font-semibold">tidal locking</span>.
          </p>
          <p className="text-lg text-gray-200 text-justify mb-4">
            The Moon is about <span className="text-yellow-400 font-semibold">384,400 km</span> away from Earth! 🚀 Its surface is covered with craters made when space rocks hit it. 🌑 In 1969,{" "}
            <span className="text-yellow-400 font-semibold">Neil Armstrong</span> became the first person to walk on the Moon. 👩‍🚀
          </p>

          <ul className="list-disc list-inside space-y-2 text-lg text-gray-200 mt-4">
            <li>The Moon is Earth's only natural satellite.</li>
            <li>We always see the same side of the Moon.</li>
            <li>The Moon's gravity causes ocean tides on Earth.</li>
            <li>There are mountains and valleys on the Moon.</li>
            <li>The Moon has no air or atmosphere.</li>
            <li>People first landed on the Moon in 1969.</li>
            <li>The Moon's size is about 1/4 of Earth's.</li>
            <li>The Moon doesn't make its own light; it reflects sunlight.</li>
            <li>It takes about 27.3 days for the Moon to orbit Earth.</li>
            <li>The Moon is about 4.5 billion years old.</li>
          </ul>
        </section>

        {/* Moon Phases Animated Section */}
        <section className="max-w-4xl mt-16 bg-gray-800/70 p-8 rounded-2xl shadow-xl text-left">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">🌗 Moon Phases</h2>
          <p className="text-lg text-gray-200 text-justify mb-6">
            The Moon changes shape each night! These shapes are called phases and happen because of how the Moon moves around Earth. 🌙
          </p>

          <div className="flex justify-center">
            <div className=" rounded-2xl p-4 ">
              <video
                src={moonphase}
                autoPlay
                loop
                muted
                playsInline
                className="w-[300px] md:w-[400px] rounded-2xl shadow-lg mx-auto"
              />
              <p className="text-yellow-300 font-semibold mt-4 text-center">
                Watch how the Moon goes from New Moon 🌑 to Full Moon 🌕 and back again!
              </p>
            </div>
          </div>
        </section>

        {/* Types of Full Moons with animations */}
        <section className="max-w-4xl mt-10">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">🌟 What are the different types of full moons?</h2>
          <p className="text-lg text-gray-200 text-justify mb-6">
            A <span className="text-yellow-400 font-semibold">full moon</span> happens when the side of the Moon facing Earth is completely lit up. 🌕 But not all full moons look the same, sometimes red, extra big, or even twice in one month! 😲 These special full moons have fun names and meanings. Let's learn about a few below!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "🌕 Blood Moon",
                desc: "Sometimes, the Moon looks red in the night sky. This is commonly known as the Blood Moon. It happens during a total lunar eclipse when Earth blocks sunlight. Only red light gets through the atmosphere.",
                img: bloodmoon,
                bg: "bg-red-300/40"
              },
              {
                title: "🌝 Supermoon",
                desc: "Sometimes the Moon looks bigger and brighter than usual, called a Supermoon! This happens when the Moon is closest to Earth in its orbit.",
                img: supermoon,
                bg: "bg-yellow-200/40"
              },
              {
                title: "🌙 Blue Moon",
                desc: "A Blue Moon is rare, and it doesn't really turn blue! 💙 It happens when there are two full moons in one month.",
                img: bluemoon,
                bg: "bg-blue-600/70"
              },
              {
                title: "🌾 Harvest Moon",
                desc: "The Harvest Moon is the full moon closest to the start of autumn. 🌕🍂 Long ago, farmers used its light to harvest crops at night before electricity.",
                img: harvestmoon,
                bg: "bg-orange-300/40"
              }
            ].map((moon, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl shadow-lg border border-yellow-300/30 ${moon.bg} flex flex-col items-center text-center hover:scale-105 transition-transform`}
              >
                <img
                  src={moon.img}
                  alt={moon.title}
                  className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full mb-4 shadow-md animate-float-slow hover:animate-spin-slow"
                />
                <p className="text-lg text-gray-100">
                  <span className="font-semibold text-yellow-300">{moon.title}: </span>
                  {moon.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-lg text-gray-200 text-justify mt-6">
            So, the Moon might look a little different each month, but every time it shines, it tells a new story in our night sky. 🌙💫
          </p>
        </section>

        {/* Quiz Button */}   
        <div className="mt-8">
          <button
            className="bg-yellow-500 px-8 py-3 rounded-full font-bold text-white text-lg hover:bg-yellow-600 transition transform hover:scale-105 shadow-lg"
            onClick={() => setShowQuiz(true)}
          >
            Start Quiz 🚀
          </button>
        </div>
      </main>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800/90 p-8 rounded-2xl max-w-2xl w-full border border-yellow-400/40">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
              🌙 Moon Quiz
            </h2>
            
            <div className="bg-gray-700/50 p-6 rounded-xl mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Question {currentQuestion + 1}/{quizQuestions.length}
              </h3>
              <p className="text-lg text-gray-200 mb-6">
                {quizQuestions[currentQuestion].question}
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedAnswer === option
                        ? option === quizQuestions[currentQuestion].correct
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                        : 'bg-gray-600/50 hover:bg-gray-600 text-gray-200'
                    }`}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-yellow-300 font-semibold">
                Score: {score}/{quizQuestions.length}
              </p>
              <button
                className="bg-red-500 px-6 py-2 rounded-full text-white hover:bg-red-600 transition"
                onClick={resetQuiz}
              >
                Close Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Results */}
      {(showBadge || showScore) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800/90 p-8 rounded-2xl max-w-md w-full text-center border border-yellow-400/40">
            {showBadge ? (
              <>
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                  Congratulations! 🎉
                </h3>
                <p className="text-lg text-gray-200 mb-4">
                  You scored {score}/{quizQuestions.length} and earned the Moon Expert badge!
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">🌙</div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                  Quiz Completed!
                </h3>
                <p className="text-lg text-gray-200 mb-4">
                  You scored {score}/{quizQuestions.length}. Keep learning about the Moon!
                </p>
              </>
            )}
            
            <button
              className="bg-yellow-500 px-6 py-3 rounded-full text-white font-semibold hover:bg-yellow-600 transition mt-4"
              onClick={resetQuiz}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}