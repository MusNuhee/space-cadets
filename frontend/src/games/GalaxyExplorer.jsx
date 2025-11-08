import { useEffect, useRef, useState } from "react";

export default function SpaceCollectGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const player = { x: 300, y: 450, width: 60, height: 60, speed: 6 };
  const stars = [];
  const asteroids = [];

  // 🎨 Load images (replace with your own cartoon images later)
  const playerImg = new Image();
  playerImg.src = "/assets/player.png"; // TODO: replace with your own

  const starImg = new Image();
  starImg.src = "/assets/star.png"; // TODO: replace with your own

  const asteroidImg = new Image();
  asteroidImg.src = "/assets/asteroid.png"; // TODO: replace with your own

  const bgImg = new Image();
  bgImg.src = "/assets/background.jpg"; // TODO: replace with your own

  let leftPressed = false;
  let rightPressed = false;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;

    // 🕹️ Input handlers
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a") leftPressed = true;
      if (e.key === "ArrowRight" || e.key === "d") rightPressed = true;
      if (e.key === " " && gameOver) restartGame();
    };
    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a") leftPressed = false;
      if (e.key === "ArrowRight" || e.key === "d") rightPressed = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // ⭐ Spawn new stars and asteroids randomly
    function spawnObjects() {
      if (Math.random() < 0.04)
        stars.push({ x: Math.random() * 580, y: -40, size: 40 });
      if (Math.random() < 0.03)
        asteroids.push({ x: Math.random() * 580, y: -60, size: 50 });
    }

    // 🔁 Game loop
    function update() {
      if (gameOver) return;

      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      // Move player
      if (leftPressed && player.x > 0) player.x -= player.speed;
      if (rightPressed && player.x < canvas.width - player.width)
        player.x += player.speed;

      // Draw player
      ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

      // Update stars
      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.y += 4;
        ctx.drawImage(starImg, star.x, star.y, star.size, star.size);

        // Collect star
        if (
          star.x < player.x + player.width &&
          star.x + star.size > player.x &&
          star.y < player.y + player.height &&
          star.y + star.size > player.y
        ) {
          stars.splice(i, 1);
          setScore((s) => s + 1);
        } else if (star.y > canvas.height) {
          stars.splice(i, 1);
        }
      }

      // Update asteroids
      for (let i = asteroids.length - 1; i >= 0; i--) {
        const a = asteroids[i];
        a.y += 5;
        ctx.drawImage(asteroidImg, a.x, a.y, a.size, a.size);

        // Collision
        if (
          a.x < player.x + player.width &&
          a.x + a.size > player.x &&
          a.y < player.y + player.height &&
          a.y + a.size > player.y
        ) {
          setGameOver(true);
        } else if (a.y > canvas.height) {
          asteroids.splice(i, 1);
        }
      }

      spawnObjects();
      animationFrame = requestAnimationFrame(update);
    }

    // 🧩 Start game loop
    animationFrame = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [gameOver]);

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    player.x = 300;
    player.y = 450;
    stars.length = 0;
    asteroids.length = 0;
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen">
      <h1 className="text-3xl text-white font-bold mb-4">🌠 Space Collect Game</h1>
      <p className="text-white mb-2">Score: {score}</p>
      {gameOver && (
        <div className="text-red-500 text-xl mb-4">
          💥 Game Over! Press SPACE to restart.
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="border-4 border-indigo-500 rounded-xl shadow-lg"
      />
    </div>
  );
}
