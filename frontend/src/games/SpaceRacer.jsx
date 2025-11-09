// src/pages/SpaceRacer3D.jsx
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Ship({ position }) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.02;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <coneGeometry args={[0.3, 1.2, 12]} />
        <meshStandardMaterial color="#00b4d8" emissive="#0096c7" />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#90e0ef" emissive="#0077b6" />
      </mesh>
    </group>
  );
}

function Obstacle({ position, speed, onHit }) {
  const ref = useRef();

  useFrame((_, delta) => {
    ref.current.position.z += speed * delta;
    if (ref.current.position.z > 2) {
      ref.current.position.z = -50;
      ref.current.position.x = (Math.random() - 0.5) * 6;
    }

    // Collision check
    const shipZ = 0;
    const shipX = 0;
    const dist = Math.hypot(ref.current.position.x - shipX, ref.current.position.z - shipZ);
    if (dist < 0.6) {
      onHit();
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <dodecahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color="#ff6b6b" emissive="#ef233c" />
    </mesh>
  );
}

function Stars() {
  const ref = useRef();
  const starCount = 500;
  const positions = useRef(
    new Float32Array(Array.from({ length: starCount * 3 }, () => THREE.MathUtils.randFloatSpread(100)))
  );

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" />
    </points>
  );
}

function GameScene({ onGameOver, score, setScore, isRunning }) {
  const shipRef = useRef({ x: 0 });
  const [obstacles, setObstacles] = useState(
    Array.from({ length: 15 }, () => ({
      x: (Math.random() - 0.5) * 6,
      y: 0,
      z: -Math.random() * 50,
      speed: 5 + Math.random() * 3,
    }))
  );

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") shipRef.current.x -= 0.3;
      if (e.code === "ArrowRight" || e.code === "KeyD") shipRef.current.x += 0.3;
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useFrame((_, delta) => {
    if (!isRunning) return;
    setScore((s) => s + delta * 10);
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={1.2} />
      <Stars />
      <Ship position={[shipRef.current.x, -1, 0]} />
      {obstacles.map((o, i) => (
        <Obstacle
          key={i}
          position={[o.x, o.y, o.z]}
          speed={o.speed}
          onHit={() => onGameOver()}
        />
      ))}
    </>
  );
}

export default function SpaceRacer3D() {
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const handleGameOver = () => {
    setIsRunning(false);
    setGameOver(true);
  };

  const restartGame = () => {
    setScore(0);
    setIsRunning(true);
    setGameOver(false);
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-2">🚀 Space Racer 3D</h2>
      <p className="text-gray-400 mb-3">Use A / D or Arrow keys to move</p>

      <div style={{ width: "800px", height: "600px", borderRadius: "10px", overflow: "hidden" }}>
        <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
          <GameScene onGameOver={handleGameOver} score={score} setScore={setScore} isRunning={isRunning} />
        </Canvas>
      </div>

      <div className="mt-3 text-lg">Score: {Math.floor(score)}</div>

      {gameOver && (
        <div className="mt-4 flex flex-col items-center">
          <h3 className="text-red-400 text-xl font-bold mb-2">💥 Game Over!</h3>
          <button
            onClick={restartGame}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}
