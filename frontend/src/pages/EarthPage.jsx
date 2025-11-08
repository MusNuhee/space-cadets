import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const facts = [
	{ question: "🌍 What is Earth?", answer: "Earth is our home planet. It is the third planet from the Sun and the only one known to have life!" },
	{ question: "🌏 How big is Earth?", answer: "Earth's diameter is about 12,742 km. That's really big—almost 8,000 miles!" },
	{ question: "🌱 Why is Earth special?", answer: "Earth has water, air, and land. It has plants, animals, and people. No other planet is just like Earth!" },
	{ question: "🌡️ What is Earth's weather like?", answer: "Earth has all kinds of weather: sunny, rainy, snowy, and windy. It even has storms and rainbows!" },
	{ question: "🌎 What are continents?", answer: "Earth has 7 continents: Africa, Antarctica, Asia, Australia, Europe, North America, and South America." },
	{ question: "🌊 What are oceans?", answer: "Earth has 5 oceans: Pacific, Atlantic, Indian, Southern, and Arctic. Oceans are huge and full of life!" },
	{ question: "🌋 What is inside Earth?", answer: "Earth has layers: crust, mantle, outer core, and inner core. The core is super hot!" },
];

const quizQuestions = [
	{ question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], correct: "7" },
	{ question: "What is Earth's diameter?", options: ["12,742 km", "10,000 km", "15,000 km", "8,000 km"], correct: "12,742 km" },
	{ question: "Which layer of Earth is the hottest?", options: ["Crust", "Mantle", "Outer Core", "Inner Core"], correct: "Inner Core" },
	{ question: "How many oceans does Earth have?", options: ["3", "4", "5", "6"], correct: "5" },
	{ question: "Which continent is the largest?", options: ["Asia", "Africa", "Europe", "Australia"], correct: "Asia" },
	{ question: "What is Earth's weather like?", options: ["Sunny", "Rainy", "Snowy", "All of the above"], correct: "All of the above" },
	{ question: "What makes Earth special?", options: ["Water", "Air", "Life", "All of the above"], correct: "All of the above" },
	{ question: "What is Earth's position from the Sun?", options: ["1st", "2nd", "3rd", "4th"], correct: "3rd" },
	{ question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: "Pacific" },
	{ question: "What is Earth's shape?", options: ["Flat", "Round", "Oval", "Sphere"], correct: "Sphere" },
	{ question: "Which continent is the smallest?", options: ["Australia", "Europe", "Antarctica", "South America"], correct: "Australia" },
	{ question: "What is Earth's core made of?", options: ["Rock", "Metal", "Gas", "Liquid"], correct: "Metal" },
	{ question: "Which continent is the coldest?", options: ["Asia", "Antarctica", "Europe", "North America"], correct: "Antarctica" },
	{ question: "Which ocean is the coldest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: "Arctic" },
	{ question: "What is Earth's nickname?", options: ["Blue Planet", "Green Planet", "Red Planet", "Yellow Planet"], correct: "Blue Planet" },
];

export default function EarthPage() {
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [showQuiz, setShowQuiz] = useState(false);
	const [score, setScore] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showBadge, setShowBadge] = useState(false);
	const [showScore, setShowScore] = useState(false);

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
				if (score + 1 >= 12) {
					setShowBadge(true);
				} else {
					setShowScore(true);
				}
				setShowQuiz(false);
			}
		}, 800);
	};

	return (
		<div className="min-h-screen flex flex-col text-white relative overflow-hidden">
			<SpaceBackground />
			<Header />
			<SearchBar data={facts} />

			{/* 🌍 Main Content */}
			<main className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-10">
				<h1 className="text-5xl font-extrabold mb-4 text-green-300 drop-shadow-lg animate-pulse">
					🌍 Welcome to Planet Earth!
				</h1>

				<img
					src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
					alt="Earth"
					className="w-48 h-48 rounded-full shadow-xl mb-6 border-4 border-blue-400 animate-bounce"
				/>

				<section className="max-w-3xl bg-gray-800/70 rounded-2xl p-6 shadow-lg">
					<p className="text-lg text-gray-200 leading-relaxed">
						Earth is our amazing home in space! It’s the <span className="text-green-400 font-semibold">third planet</span> from the Sun and the only one known to have life.
						Here, we have land, water, air, animals, and people — everything needed for life to bloom! 🌱
					</p>
				</section>

				<section className="max-w-4xl">
					<h2 className="text-3xl font-bold text-green-400 mb-4">🌱 Why is Earth Special?</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="bg-green-700/40 p-4 rounded-2xl shadow-md"><p className="text-lg">💧 It has water to drink and oceans full of life.</p></div>
						<div className="bg-blue-700/40 p-4 rounded-2xl shadow-md"><p className="text-lg">🌬️ It has air for us to breathe.</p></div>
						<div className="bg-yellow-600/40 p-4 rounded-2xl shadow-md"><p className="text-lg">🌞 It gets just the right amount of sunlight.</p></div>
						<div className="bg-purple-700/40 p-4 rounded-2xl shadow-md"><p className="text-lg">🌿 It grows plants, trees, and flowers everywhere.</p></div>
						<div className="bg-pink-700/40 p-4 rounded-2xl shadow-md"><p className="text-lg">🐾 It’s home to animals and humans alike.</p></div>
						<div className="bg-indigo-700/40 p-4 rounded-2xl shadow-md"><p className="text-lg">🌈 It has colorful weather — from rainbows to snow!</p></div>
					</div>
				</section>

				<section className="max-w-4xl">
					<h2 className="text-3xl font-bold text-blue-400 mb-4">🗺️ Continents & Oceans</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="bg-blue-800/40 p-5 rounded-2xl shadow-md">
							<h3 className="text-2xl font-semibold text-blue-300 mb-2">🌍 Continents</h3>
							<p className="text-gray-200">There are <span className="text-yellow-300 font-semibold">7 continents</span> — Africa, Antarctica, Asia, Australia, Europe, North America, and South America.</p>
						</div>
						<div className="bg-cyan-800/40 p-5 rounded-2xl shadow-md">
							<h3 className="text-2xl font-semibold text-cyan-300 mb-2">🌊 Oceans</h3>
							<p className="text-gray-200">Earth has <span className="text-yellow-300 font-semibold">5 oceans</span> — Pacific, Atlantic, Indian, Southern, and Arctic.</p>
						</div>
					</div>
				</section>

				<section className="max-w-3xl bg-gray-800/60 rounded-2xl p-6 shadow-md">
					<h2 className="text-3xl font-bold text-yellow-400 mb-4">🌦️ Earth's Weather</h2>
					<p className="text-gray-200 text-lg">Earth’s weather can be sunny ☀️, rainy 🌧️, snowy ❄️, or windy 🌬️. Sometimes we even see beautiful rainbows 🌈 after the rain!</p>
				</section>

				<section className="max-w-2xl text-lg text-gray-200">
					<p>
						Earth is a <span className="text-blue-300 font-semibold">beautiful blue planet</span> that we must take care of.
						Let’s learn more about it with a fun quiz below! 💫
					</p>
				</section>

				<div className="mt-8">
					<motion.button
						className="bg-green-500 px-8 py-3 rounded-full font-bold text-white text-lg hover:bg-green-600 transition transform hover:scale-105 shadow-lg"
						whileTap={{ scale: 0.9 }}
						onClick={() => setShowQuiz(true)}
					>
						Start Quiz 🚀
					</motion.button>
				</div>
			</main>

			{/* Quiz, Badge, and Score popups remain unchanged */}
			<AnimatePresence>
				{showQuiz && (
					<motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
						initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
						<motion.div
							className="bg-gray-800 text-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl border-2 border-blue-400"
							initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
						>
							<button className="absolute top-2 right-3 text-gray-400 hover:text-white" onClick={() => setShowQuiz(false)}>✖</button>
							<h2 className="text-xl font-bold mb-4 text-center">🧠 Quiz Time!</h2>
							<p className="text-lg mb-4 text-center">{quizQuestions[currentQuestion].question}</p>
							<div className="grid grid-cols-1 gap-3">
								{quizQuestions[currentQuestion].options.map((option, idx) => (
									<motion.button key={idx}
										className={`px-4 py-2 rounded-full font-semibold ${
											selectedAnswer === option
												? option === quizQuestions[currentQuestion].correct
													? "bg-green-500 border-4 border-green-700"
													: "bg-red-500 border-4 border-red-700"
												: "bg-blue-500 hover:bg-blue-600"
										}`}
										whileTap={{ scale: 0.9 }}
										onClick={() => handleAnswer(option)}
									>
										{option}
									</motion.button>
								))}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* 🎖️ Badge Popup */}
			<AnimatePresence>
				{showBadge && (
					<motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
						initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
						<motion.div
							className="bg-gray-800 text-white rounded-2xl p-6 w-full max-w-md text-center shadow-2xl border-2 border-yellow-400"
							initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
						>
							<h2 className="text-2xl font-bold mb-4">🎉 Congratulations!</h2>
							<p className="text-lg mb-4">You earned a badge for scoring {score}/15 correct answers!</p>
							<motion.img src="/src/assets/logo.png" alt="Badge" className="w-32 h-32 mx-auto mb-4 rounded-full shadow-lg"
								initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} />
							<motion.button className="bg-yellow-400 px-6 py-2 rounded-full font-bold text-black hover:bg-yellow-500"
								whileTap={{ scale: 0.9 }} onClick={() => setShowBadge(false)}>Close</motion.button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* ❌ Score Popup */}
			<AnimatePresence>
				{showScore && (
					<motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
						initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
						<motion.div
							className="bg-gray-800 text-white rounded-2xl p-6 w-full max-w-md text-center shadow-2xl border-2 border-blue-400"
							initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
						>
							<h2 className="text-2xl font-bold mb-4">Your Score: {score}/15</h2>
							<p className="text-lg mb-4">Try again next time to earn the badge! 🌟</p>
							<motion.button className="bg-blue-500 px-6 py-2 rounded-full font-bold text-white hover:bg-blue-600"
								whileTap={{ scale: 0.9 }} onClick={() => setShowScore(false)}>Close</motion.button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<Footer />
		</div>
	);
}
