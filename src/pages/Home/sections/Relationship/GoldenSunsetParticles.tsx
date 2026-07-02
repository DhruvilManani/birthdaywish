import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Leaf: React.FC<{ delay: number, duration: number, left: string }> = ({ delay, duration, left }) => {
  return (
    <motion.div
      className="absolute top-[-10vh] pointer-events-none z-10 opacity-70"
      style={{ left }}
      animate={{ 
        y: ['0vh', '110vh'],
        x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
        rotate: [0, 360],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C7.58172 2 4 5.58172 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 5.58172 16.4183 2 12 2Z" fill="#d97743" fillOpacity="0.6"/>
      </svg>
    </motion.div>
  );
};

const Bird: React.FC<{ delay: number, duration: number, startY: string, isScattered: boolean }> = ({ delay, duration, startY, isScattered }) => {
  return (
    <motion.div
      className="absolute left-[-10vw] pointer-events-none z-0 opacity-40"
      style={{ top: startY }}
      animate={{ 
        x: ['0vw', '110vw'],
        y: isScattered ? [0, -200] : [0, Math.random() * 40 - 20, 0, Math.random() * 40 - 20, 0],
      }}
      transition={{
        duration: isScattered ? 2 : duration,
        repeat: isScattered ? 0 : Infinity,
        delay: isScattered ? 0 : delay,
        ease: "linear"
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c4333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h0c2.76 0 5-2.24 5-5h0c0 2.76 2.24 5 5 5h0c2.76 0 5-2.24 5-5h0c0 2.76 2.24 5 5 5"/>
      </svg>
    </motion.div>
  );
};

const Ripple: React.FC<{ x: number, y: number, id: number, onComplete: (id: number) => void }> = ({ x, y, id, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(id), 2000);
    return () => clearTimeout(timer);
  }, [id, onComplete]);

  return (
    <motion.div
      className="fixed rounded-[50%] border border-white/40 pointer-events-none z-20 mix-blend-overlay"
      style={{ left: x, top: y, x: '-50%', y: '-50%' }}
      initial={{ width: 0, height: 0, opacity: 0.8 }}
      animate={{ width: 300, height: 100, opacity: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
    />
  );
};

interface GoldenSunsetParticlesProps {
  scatterBirds: boolean;
  onRipple: (e: React.MouseEvent | React.TouchEvent) => void;
  ripples: { id: number, x: number, y: number }[];
  removeRipple: (id: number) => void;
}

export const GoldenSunsetParticles: React.FC<GoldenSunsetParticlesProps> = ({ scatterBirds, onRipple, ripples, removeRipple }) => {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [birds, setBirds] = useState<any[]>([]);

  useEffect(() => {
    setLeaves(Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 15,
      left: `${Math.random() * 100}vw`,
    })));

    setBirds(Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 15,
      duration: Math.random() * 15 + 20,
      startY: `${Math.random() * 40 + 10}vh`,
    })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" onClick={onRipple} onTouchStart={onRipple}>
      {leaves.map(l => <Leaf key={`leaf-${l.id}`} {...l} />)}
      {birds.map(b => <Bird key={`bird-${b.id}`} {...b} isScattered={scatterBirds} />)}
      
      <AnimatePresence>
        {ripples.map(r => (
          <Ripple key={`ripple-${r.id}`} x={r.x} y={r.y} id={r.id} onComplete={removeRipple} />
        ))}
      </AnimatePresence>
    </div>
  );
};
