import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Butterfly: React.FC<{ delay: number, duration: number, startY: string, startX: string, scale: number }> = ({ delay, duration, startY, startX, scale }) => {
  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{ top: startY, left: startX, scale }}
      animate={{ 
        y: [0, -30, 20, -50, -100],
        x: [0, 40, -20, 60, 100],
        rotate: [0, 15, -15, 20, -10],
        opacity: [0, 0.8, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffb6c1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </motion.div>
  );
};

const FairyLight: React.FC<{ delay: number, size: number, top: string, left: string }> = ({ delay, size, top, left }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-white z-0 pointer-events-none"
      style={{ top, left, width: size, height: size }}
      animate={{ 
        opacity: [0.1, 0.9, 0.1],
        boxShadow: [`0 0 ${size}px #fff`, `0 0 ${size * 4}px #fff, 0 0 ${size * 8}px #ffb6c1`, `0 0 ${size}px #fff`]
      }}
      transition={{
        duration: 2 + delay % 2,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );
};

export const PrincessParticles: React.FC = () => {
  const [lights, setLights] = useState<any[]>([]);
  const [butterflies, setButterflies] = useState<any[]>([]);

  useEffect(() => {
    setLights(Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 5,
      size: Math.random() * 3 + 1,
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
    })));

    setButterflies(Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 15,
      duration: Math.random() * 10 + 15,
      startY: `${Math.random() * 100}vh`,
      startX: `${Math.random() * 100}vw`,
      scale: Math.random() * 0.5 + 0.8
    })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lights.map(l => <FairyLight key={`light-${l.id}`} {...l} />)}
      {butterflies.map(b => <Butterfly key={`bf-${b.id}`} {...b} />)}
    </div>
  );
};
