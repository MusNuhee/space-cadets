import { useState } from "react";
import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Starimage from "../assets/star.jpg";
const constellations = [
  {
    name: "Aries",
    fact: `
      🌌 Represents: A ram (🐏)
      ✨ Name: 'Aries' means 'the Ram' in Latin
      📍 Location: Best seen in the Northern Hemisphere during autumn & early winter
      ⭐ Brightest Stars: Hamal 🌟, Sheratan ✨, and Mesartim 💫
      📖 Mythology: A magical ram saved two children, Phrixus and Helle, and its golden fleece became famous in the tale of Jason and the Argonauts
      ♈ Zodiac: Aries is the first zodiac sign (March 21 – April 19). People born under Aries are brave 💪, adventurous 🌍, and energetic ⚡
    `,
    img: "/src/assets/aries.png",
    fact2: `
      🐏 Ram in the Sky – Aries looks like a ram, but really it’s just a few stars in a bent line. You need imagination to see the shape!
      🌟 Brightest Star – The star Hamal is the brightest in Aries. It’s about 66 light-years away—that means light takes 66 years to reach us!
      🪐 Planets Found – Astronomers have discovered exoplanets (planets outside our Solar System) around some Aries stars.
      ⏳ Very Old – People have known about Aries for thousands of years. It was important to Babylonians, Egyptians, and Greeks.
      ☀️ First Point of Aries – Long ago, the Sun used to rise in Aries at the start of spring. That’s why Aries was called the “First Point of Aries.”
      🔭 Not Super Bright – Aries is not the brightest constellation, but once you spot Hamal, you can connect the other stars easily.
      ♈ Astrology Sign – Aries is the first zodiac sign. People born under Aries are often described as brave, energetic, and adventurous.
      🛡️ Golden Fleece Story – The magical ram’s golden fleece became one of the most famous treasures in Greek mythology.
      🌍 Best Time to See – You can see Aries most clearly between October and December in the Northern Hemisphere.
    `,
  },
  {
    name: "Pisces",
    fact: `
      🌌 Represents: Two fish (🐟🐟) swimming in opposite directions
      ✨ Name: 'Pisces' means 'the Fish' in Latin
      📍 Location: Best seen in the Northern Hemisphere during winter
      ⭐ Brightest Stars: Fum al Samakah 🌟, and Al Pherg 🌟
      📖 Mythology: Represents Aphrodite and her son Eros, who transformed into fish to escape the monster Typhon
      ♓ Zodiac: Pisces is the twelfth zodiac sign (February 19 – March 20). People born under Pisces are empathetic 💖, artistic 🎨, and intuitive 🔮
    `,
    img: "/src/assets/pisces.png",
  },
  {
    name: "Leo",
    fact: `
      🌌 Represents: A lion (🦁)
      ✨ Name: 'Leo' means 'the Lion' in Latin
      📍 Location: Best seen in the Northern Hemisphere during spring
      ⭐ Brightest Stars: Regulus 🌟, Denebola ✨, and Algieba 💫
      📖 Mythology: Represents the Nemean Lion, defeated by Hercules in Greek mythology
      ♌ Zodiac: Leo is the fifth zodiac sign (July 23 – August 22). People born under Leo are confident 🌟, creative 🎨, and charismatic ✨
    `,
    img: "/src/assets/leo.png",
  },
  {
    name: "Scorpio",
    fact: `
      🌌 Represents: A scorpion (🦂)
      ✨ Name: 'Scorpio' means 'the Scorpion' in Latin
      📍 Location: Best seen in the Southern Hemisphere during winter
      ⭐ Brightest Stars: Antares 🌟, Shaula ✨, and Sargas 💫
      📖 Mythology: Represents the scorpion that killed Orion in Greek mythology
      ♏ Zodiac: Scorpio is the eighth zodiac sign (October 23 – November 21). People born under Scorpio are passionate 🔥, determined 💪, and mysterious 🌌
    `,
    img: "/src/assets/scorpio.png",
  },
  {
    name: "Capricorn",
    fact: `
      🌌 Represents: A sea goat (🐐🌊)
      ✨ Name: 'Capricorn' means 'the Goat' in Latin
      📍 Location: Best seen in the Southern Hemisphere during summer
      ⭐ Brightest Stars: Deneb Algedi 🌟, Dabih ✨, and Alshat 💫
      📖 Mythology: Represents the goat Amalthea, who nursed Zeus in Greek mythology
      ♑ Zodiac: Capricorn is the tenth zodiac sign (December 22 – January 19). People born under Capricorn are disciplined 📚, ambitious 🚀, and practical 🛠️
    `,
    img: "/src/assets/capricon.png",
  },
  {
    name: "Aquarius",
    fact: `
      🌌 Represents: The water bearer (💧)
      ✨ Name: 'Aquarius' means 'the Water Carrier' in Latin
      📍 Location: Best seen in the Northern Hemisphere during autumn
      ⭐ Brightest Stars: Sadalmelik 🌟, Sadalsuud ✨, and Skat 💫
      📖 Mythology: Represents Ganymede, the cupbearer to the gods in Greek mythology
      ♒ Zodiac: Aquarius is the eleventh zodiac sign (January 20 – February 18). People born under Aquarius are innovative 💡, independent 🌍, and humanitarian 🤝
    `,
    img: "/src/assets/aquaris.png",
  },
  {
    name: "Cancer",
    fact: `
      🌌 Represents: A crab (🦀)
      ✨ Name: 'Cancer' means 'the Crab' in Latin
      📍 Location: Best seen in the Northern Hemisphere during spring
      ⭐ Brightest Stars: Acubens 🌟, Altarf ✨, and Asellus Borealis 💫
      📖 Mythology: Represents the crab sent by Hera to distract Hercules during his battle with the Hydra
      ♋ Zodiac: Cancer is the fourth zodiac sign (June 21 – July 22). People born under Cancer are nurturing 💖, intuitive 🔮, and protective 🛡️
    `,
    img: "/src/assets/cancer.png",
  },
  {
    name: "Gemini",
    fact: `
      🌌 Represents: Twins (👬)
      ✨ Name: 'Gemini' means 'the Twins' in Latin
      📍 Location: Best seen in the Northern Hemisphere during winter
      ⭐ Brightest Stars: Castor 🌟 and Pollux ✨
      📖 Mythology: Represents the twin brothers Castor and Pollux, who were immortalized in the stars by Zeus
      ♊ Zodiac: Gemini is the third zodiac sign (May 21 – June 20). People born under Gemini are curious 🤔, adaptable 🌍, and communicative 🗣️
    `,
    img: "/src/assets/gemini.png",
  },
  {
    name: "Libra",
    fact: `
      🌌 Represents: Scales ⚖️
      ✨ Name: 'Libra' means 'the Scales' in Latin
      📍 Location: Best seen in the Northern Hemisphere during autumn
      ⭐ Brightest Stars: Zubeneschamali 🌟 and Zubenelgenubi ✨
      📖 Mythology: Represents the scales of justice held by Themis, the goddess of divine law
      ♎ Zodiac: Libra is the seventh zodiac sign (September 23 – October 22). People born under Libra are diplomatic 🤝, charming ✨, and balanced ⚖️
    `,
    img: "/src/assets/libra.png",
    fact2:""
  },
  {
    name: "Sagittarius",
    fact: `
      🌌 Represents: An archer (🏹)
      ✨ Name: 'Sagittarius' means 'the Archer' in Latin
      📍 Location: Best seen in the Southern Hemisphere during summer
      ⭐ Brightest Stars: Kaus Australis 🌟, Nunki ✨, and Alnasl 💫
      📖 Mythology: Represents the centaur Chiron, a skilled archer and healer in Greek mythology
      ♐ Zodiac: Sagittarius is the ninth zodiac sign (November 22 – December 21). People born under Sagittarius are adventurous 🌍, optimistic 🌟, and philosophical 📚
    `,
    img: "/src/assets/sagittarius.png",
  },
  {
    name: "Taurus",
    fact: `
      🌌 Represents: A bull (🐂)
      ✨ Name: 'Taurus' means 'the Bull' in Latin
      📍 Location: Best seen in the Northern Hemisphere during spring
      ⭐ Brightest Stars: Aldebaran 🌟, Elnath ✨, and Alcyone 💫
      📖 Mythology: Represents the bull that carried Europa across the sea in Greek mythology
      ♉ Zodiac: Taurus is the second zodiac sign (April 20 – May 20). People born under Taurus are reliable 🛠️, patient 🕰️, and grounded 🌍
    `,
    img: "/src/assets/taurus.png",
  },
  {
    name: "Virgo",
    fact: `
      🌌 Represents: A maiden (👩)
      ✨ Name: 'Virgo' means 'the Virgin' in Latin
      📍 Location: Best seen in the Northern Hemisphere during summer
      ⭐ Brightest Stars: Spica 🌟, Zavijava ✨, and Porrima 💫
      📖 Mythology: Represents Demeter, the goddess of agriculture, or Astraea, the goddess of innocence
      ♍ Zodiac: Virgo is the sixth zodiac sign (August 23 – September 22). People born under Virgo are analytical 🧠, practical 🛠️, and detail-oriented 📋
    `,
    img: "/src/assets/virgo.png",
  },
];

const starConstellationQuizQuestions = [
  { question: "What does Aries represent?", options: ["A ram", "A lion", "A fish", "A scorpion"], correct: "A ram" },
  { question: "What does Pisces represent?", options: ["Two fish", "A lion", "A ram", "A scorpion"], correct: "Two fish" },
  { question: "What does Leo represent?", options: ["A lion", "A ram", "A fish", "A scorpion"], correct: "A lion" },
  { question: "What does Scorpio represent?", options: ["A scorpion", "A lion", "A ram", "A fish"], correct: "A scorpion" },
  { question: "What does Capricorn represent?", options: ["A sea goat", "A lion", "A ram", "A fish"], correct: "A sea goat" },
  { question: "What does Aquarius represent?", options: ["The water bearer", "A lion", "A ram", "A fish"], correct: "The water bearer" },
  { question: "What does Cancer represent?", options: ["A crab", "A lion", "A ram", "A fish"], correct: "A crab" },
  { question: "What does Gemini represent?", options: ["Twins", "A lion", "A ram", "A fish"], correct: "Twins" },
  { question: "What does Libra represent?", options: ["Scales", "A lion", "A ram", "A fish"], correct: "Scales" },
  { question: "What does Sagittarius represent?", options: ["An archer", "A lion", "A ram", "A fish"], correct: "An archer" },
  { question: "What does Taurus represent?", options: ["A bull", "A lion", "A ram", "A fish"], correct: "A bull" },
  { question: "What does Virgo represent?", options: ["A maiden", "A lion", "A ram", "A fish"], correct: "A maiden" },
  { question: "What is the brightest constellation?", options: ["Orion", "Leo", "Scorpio", "Pisces"], correct: "Orion" },
  { question: "What is the largest constellation?", options: ["Hydra", "Leo", "Scorpio", "Pisces"], correct: "Hydra" },
  { question: "What is the smallest constellation?", options: ["Crux", "Leo", "Scorpio", "Pisces"], correct: "Crux" },
];

export default function StarConstellationPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === starConstellationQuizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion < starConstellationQuizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        if (score + 1 >= 12) {
          setShowBadge(true);
        } else {
          setShowScore(true);
        }
        setShowQuiz(false);
      }
    }, 1000); // Delay to show feedback
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % constellations.length);
  };

  const handlePrevious = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? constellations.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col text-white relative">
      <SpaceBackground />
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
         <section className="relative w-full">
                  <div
            className="relative flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl py-20 mx-auto
                bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/50"
            style={{ backgroundImage: `url(${Starimage})`}}
          ><div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>

              <div className="relative z-10 flex-1 text-center md:text-left px-6">
                <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow-lg">
                  ✨ Explore the Stars and Constellations!
                </h1>
                <p className="text-lg md:text-xl text-gray-200 drop-shadow">
                  Discover the fascinating world of star constellations, their myths, and
                  fun facts. Test your knowledge with our exciting quiz and earn badges!
                </p>
              </div></div>
        </section>
        
        {selectedIndex === null ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full max-w-5xl">
            {constellations.map((constellation, idx) => (
              <button
                key={idx}
                className="bg-[#bd002f]/10 rounded-xl shadow-lg p-6 flex flex-col items-center hover:bg-indigo-700 transition-transform border-2 border-indigo-400"
                onClick={() => setSelectedIndex(idx)}
              >
                <img
                  src={constellation.img}
                  alt={constellation.name}
                  className="w-32 h-32 object-cover mb-4"
                />
                <span className="text-2xl font-bold mb-2">{constellation.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-8 w-full max-w-">
            {/* Left Details */}
            <div className="bg-indigo-900/80 rounded-xl shadow-lg p-6 flex flex-col items-center sm:w-1/3">
              <h2 className="text-3xl font-bold mb-4">
                {constellations[selectedIndex].name}
              </h2>
              <p className="text-lg text-indigo-200 whitespace-pre-line leading-relaxed">
                {constellations[selectedIndex].fact}
              </p>

            </div>

            {/* Constellation Image */}
            <div className="flex items-center justify-center">
              <img
                src={constellations[selectedIndex].img}
                alt={constellations[selectedIndex].name}
                className="w-auto h-70 object-cover shadow-lg"
              />
            </div>

            {/* Right Details */}
            <div className="bg-indigo-900/80 rounded-xl shadow-lg p-6 flex flex-col items-center sm:w-1/3">
              <h2 className="text-3xl font-bold mb-4">Fun Fact</h2>
              <p className="text-lg text-indigo-200 whitespace-pre-line leading-relaxed">
                {constellations[selectedIndex].fact2}
              </p>

            </div>
          </div>
        )}
        {selectedIndex !== null && (
          <div className="flex gap-4 mt-6">
            <button
              className="bg-red-500 px-6 py-2 rounded font-bold text-white hover:bg-red-600"
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 px-6 py-2 rounded font-bold text-white hover:bg-blue-600"
              onClick={handleNext}
            >
              Next
            </button>
            <button
              className="bg-gray-500 px-6 py-2 rounded font-bold text-white hover:bg-gray-600"
              onClick={() => setSelectedIndex(null)}
            >
              Back to Constellations
            </button>
          </div>
        )}
        {/* Quiz Button */}
        <div className="mt-8 text-center">
          <button
            className="bg-indigo-500 px-6 py-2 rounded font-bold text-white hover:bg-indigo-600"
            onClick={() => setShowQuiz(true)}
          >
            Start Quiz
          </button>
        </div>
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
              <p className="text-lg mb-4">{starConstellationQuizQuestions[currentQuestion].question}</p>
              <div className="grid grid-cols-1 gap-4">
                {starConstellationQuizQuestions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    className={`px-4 py-2 rounded ${
                      selectedAnswer === option
                        ? option === starConstellationQuizQuestions[currentQuestion].correct
                          ? "bg-green-500 border-4 border-green-700"
                          : "bg-red-500 border-4 border-red-700"
                        : "bg-indigo-500 hover:bg-indigo-600"
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
        {showBadge && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md text-center">
              <h2 className="text-xl font-bold mb-4">🎉 Congratulations!</h2>
              <p className="text-lg mb-4">You earned a badge for scoring {score}/15 correct answers!</p>
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
        {showScore && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md text-center">
              <h2 className="text-xl font-bold mb-4">Your Score: {score}/15</h2>
              <p className="text-lg mb-4">Try again next time to earn the badge!</p>
              <button
                className="bg-indigo-500 px-6 py-2 rounded font-bold text-white hover:bg-indigo-600"
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