import React from 'react';
import { motion } from 'framer-motion';

const Particle: React.FC<{ delay: number, size: number, x: string, duration: number, type: 'heart' | 'petal' | 'gold' }> = ({ delay, size, x, duration, type }) => {
  const getMarkup = () => {
    if (type === 'heart') {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffb6c1" opacity={0.6}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      );
    }
    if (type === 'petal') {
      return (
        <div style={{ width: size, height: size, backgroundColor: '#fce3e7', borderRadius: '50% 0 50% 50%', opacity: 0.5 }} />
      );
    }
    return (
      <div style={{ width: size, height: size, backgroundColor: '#ffd700', borderRadius: '50%', opacity: 0.8, boxShadow: '0 0 4px #ffd700' }} />
    );
  };

  return (
    <motion.div
      className="absolute bottom-0 z-0 pointer-events-none"
      initial={{ y: '100vh', x: x, rotate: 0, opacity: 0 }}
      animate={{ 
        y: '-20vh', 
        x: `calc(${x} + ${Math.random() > 0.5 ? 20 : -20}px)`,
        rotate: 360,
        opacity: [0, 0.8, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
    >
      {getMarkup()}
    </motion.div>
  );
};

export const HeartParticles: React.FC = () => {
  // Generate random particles
  const elements = Array.from({ length: 20 }).map((_, i) => {
    const type = i % 3 === 0 ? 'heart' : (i % 3 === 1 ? 'petal' : 'gold');
    const size = type === 'gold' ? Math.random() * 3 + 2 : Math.random() * 10 + 10;
    return (
      <Particle
        key={i}
        delay={Math.random() * 20}
        duration={Math.random() * 15 + 15}
        x={`${Math.random() * 100}vw`}
        size={size}
        type={type}
      />
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {elements}
    </div>
  );
};
