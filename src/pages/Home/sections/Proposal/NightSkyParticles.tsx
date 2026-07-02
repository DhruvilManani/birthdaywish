import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Star: React.FC<{ delay: number, size: number, top: string, left: string, hasExploded: boolean }> = ({ delay, size, top, left, hasExploded }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-white z-0 pointer-events-none"
      style={{ top, left, width: size, height: size }}
      animate={{ 
        opacity: hasExploded ? [0.8, 1, 0.8] : [0.2, 0.6, 0.2],
        scale: hasExploded ? [1, 1.5, 1] : [1, 1.2, 1],
        boxShadow: hasExploded ? `0 0 ${size * 4}px #fff, 0 0 ${size * 8}px #ffd700` : `0 0 ${size * 2}px #fff`
      }}
      transition={{
        duration: hasExploded ? 1 : 3 + delay % 2,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );
};

const Firefly: React.FC<{ delay: number, size: number, startX: string, startY: string, duration: number, hasExploded: boolean }> = ({ delay, size, startX, startY, duration, hasExploded }) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none z-10"
      style={{ left: startX, top: startY, width: size, height: size, backgroundColor: '#a3ffb4' }}
      animate={hasExploded ? {
        opacity: 0,
        scale: 0
      } : { 
        y: [0, -50, 0, 50, 0], 
        x: [0, 30, 0, -30, 0],
        opacity: [0, 0.8, 0],
        boxShadow: ['0 0 4px #a3ffb4', '0 0 12px #a3ffb4', '0 0 4px #a3ffb4']
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );
};

const ExplosionParticle: React.FC<{ delay: number, type: 'gold' | 'heart' }> = ({ delay, type }) => {
  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * 300 + 100;
  const targetX = Math.cos(angle) * velocity;
  const targetY = Math.sin(angle) * velocity - 200; // General upward drift

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 pointer-events-none z-30"
      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
      animate={{ 
        x: targetX, 
        y: targetY, 
        opacity: 0,
        scale: type === 'heart' ? [0, 1.5, 0] : [0, 1, 0]
      }}
      transition={{ duration: 2.5 + Math.random(), delay, ease: "easeOut" }}
    >
      {type === 'heart' ? (
        <span className="text-rose-400 text-lg drop-shadow-md">❤</span>
      ) : (
        <div className="w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_8px_#ffd700]" />
      )}
    </motion.div>
  );
};

interface NightSkyParticlesProps {
  hasExploded: boolean;
}

export const NightSkyParticles: React.FC<NightSkyParticlesProps> = ({ hasExploded }) => {
  const [stars, setStars] = useState<any[]>([]);
  const [fireflies, setFireflies] = useState<any[]>([]);
  const [explosion, setExplosion] = useState<any[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 5,
      size: Math.random() * 2 + 1,
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
    })));

    setFireflies(Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 10 + 10,
      startX: `${Math.random() * 100}vw`,
      startY: `${Math.random() * 100}vh`,
    })));
  }, []);

  useEffect(() => {
    if (hasExploded) {
      setExplosion(Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        delay: Math.random() * 0.5, // staggered explosion
        type: Math.random() > 0.3 ? 'gold' : 'heart',
      })));
    }
  }, [hasExploded]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(s => <Star key={`star-${s.id}`} {...s} hasExploded={hasExploded} />)}
      {fireflies.map(f => <Firefly key={`ff-${f.id}`} {...f} hasExploded={hasExploded} />)}
      
      {hasExploded && (
        <div className="absolute inset-0 flex items-center justify-center">
          {explosion.map(e => <ExplosionParticle key={`exp-${e.id}`} delay={e.delay} type={e.type} />)}
        </div>
      )}
    </div>
  );
};
