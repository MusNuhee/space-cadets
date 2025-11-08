import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

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
        if (score >= 5) setShowBadge(true);
        else setShowScore(true);
        setShowQuiz(false);
      }
    }, 1000);
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

        {/* Text + Bigger Moon Image */}
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl gap-10 relative mt-10">
          {/* Left Text */}
          <div className="text-left md:w-1/2 p-8 rounded-2xl shadow-lg bg-black/50 z-10 translate-y-8 translate-x-8">
            <p className="text-lg text-gray-100 leading-relaxed text-justify">
              🌕 The Moon is Earth’s only natural satellite. 🌍 It travels around our planet once every <span className="text-yellow-400 font-semibold">27 days</span> and lights up the night sky with its silvery glow!
              <br /><br />
              The Moon is like Earth’s special space friend and it changes shapes — sometimes round, sometimes just a thin slice. It doesn’t make its own light but shines by reflecting the Sun’s rays, making our nights bright and beautiful! 🌙  
              <br /><br />
              The Moon also helps control ocean tides on Earth! Astronauts have visited it and left their footprints there. When you look up at the night sky, you’re seeing the same Moon people have watched for thousands of years glowing softly in space! ✨
            </p>
          </div>

          {/* Big Moon Image */}
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
            The Moon always shows the same side to Earth because it rotates at the same rate that it orbits our planet. This is called <span className="text-yellow-400 font-semibold">tidal locking</span>. 
          </p>
          <p className="text-lg text-gray-200 text-justify mb-4">
            The Moon is about <span className="text-yellow-400 font-semibold">384,400 km</span> away from Earth! 🚀 Its surface is covered with craters, made when space rocks hit it. 🌑 In 1969, <span className="text-yellow-400 font-semibold">Neil Armstrong</span> became the first person to walk on the Moon. 👩‍🚀
          </p>

          <ul className="list-disc list-inside space-y-2 text-lg text-gray-200 mt-4">
            <li>The Moon is Earth’s only natural satellite.</li>
            <li>We always see the same side of the Moon.</li>
            <li>The Moon’s gravity causes ocean tides on Earth.</li>
            <li>There are mountains and valleys on the Moon.</li>
            <li>The Moon has no air or atmosphere.</li>
            <li>People first landed on the Moon in 1969.</li>
            <li>The Moon’s size is about 1/4 of Earth’s.</li>
            <li>The Moon doesn’t make its own light; it reflects sunlight.</li>
            <li>It takes about 27.3 days for the Moon to orbit the Earth.</li>
            <li>The Moon is about 4.5 billion years old.</li>
          </ul>
        </section>

        {/* Moon Phases GIF Card */}
        <section className="max-w-4xl mt-16 bg-gray-800/70 p-8 rounded-2xl shadow-xl text-left">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">🌗 Moon Phases</h2>
          <p className="text-lg text-gray-200 text-justify mb-6">
            The Moon changes shape each night! These shapes are called phases and happen because of how the Moon moves around Earth. 🌙 Watch the full cycle below:
          </p>

          <div className="flex justify-center">
            <div className="bg-black/50 rounded-2xl p-4 shadow-lg">
              <img
                src="frontend/src/assets/Animation showing all Moon Phases ( Lunation and Liberation ).mp4"
                alt="Moon Phases Animated GIF"
                className="w-full max-w-md rounded-2xl shadow-lg"
              />
              <p className="text-yellow-300 font-semibold mt-4 text-center">
                Moon phases from New Moon → Full Moon → Waning
              </p>
            </div>
          </div>
        </section>

        {/* Types of Full Moons */}
        <section className="max-w-4xl mt-10">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">🌟 What are the different types of full moons?</h2>
          <p className="text-lg text-gray-200 text-justify mb-6">
            A <span className="text-yellow-400 font-semibold">full moon</span> happens when the side of the Moon facing Earth is completely lit up. 🌕 But not all full moons look the same, sometimes red, extra big, or even twice in one month! 😲 These special full moons have fun names and meanings. Let’s learn about a few below!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ["🌕 Blood Moon", "Sometimes the Moon looks red in the night sky, and we call it a Blood Moon! This usually happens during a total lunar eclipse, when Earth moves between the Sun and the Moon and blocks most of the sunlight. The only light that reaches the Moon passes through Earth’s atmosphere, which scatters the blue light and makes the Moon glow red. A Blood Moon can also look reddish if there’s dust, smoke, or haze in the sky. 🍂 Sometimes it even happens in autumn, when the leaves are turning red, making the Moon look extra special! 🌕✨"],
              ["🌝 Supermoon", "Sometimes the Moon looks bigger and brighter than usual, and we call it a Supermoon! This happens when the Moon is at its closest point to Earth in its orbit. Even though it’s not really bigger, it looks extra bright in the sky. 🌟 People love to watch Supermoons because they seem closer and more magical than regular full moons! You can even notice that Supermoons light up the night more than usual, making everything on Earth look a little brighter."],
              ["🌙 Blue Moon", "A Blue Moon is rare, and it doesn’t really turn blue! 💙 We call it that when there are two full moons in one month, which only happens every two or three years. A Blue Moon is special because it’s an “extra” full moon, so people often say, “once in a blue moon” to mean something very unusual! Even though it looks like a regular full moon, it reminds us how special and rare our Moon can be."],
              ["🌾 Harvest Moon", "The Harvest Moon is the full moon closest to the start of autumn. 🌕🍂 Long ago, farmers used its bright light to harvest crops at night before electricity. Its light was very helpful during fall, when harvests were the biggest. Today, it’s still fun to watch because it makes the autumn sky look warm and glowing! People also enjoy taking pictures of the Harvest Moon rising over fields and mountains, making it one of the most beautiful moons to see."],
            ].map(([title, desc], i) => (
              <div key={i} className="p-4 rounded-2xl shadow-md bg-transparent border border-yellow-300/30">
                <p className="text-lg text-justify">
                  <span className="font-semibold text-yellow-300">{title}: </span>{desc}
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

      <Footer />
    </div>
  );
}
