import React from 'react';
import { motion } from 'framer-motion';

const Particle: React.FC<{ delay: number, size: number, x: string, duration: number, type: 'firefly' | 'gold' | 'butterfly' }> = ({ delay, size, x, duration, type }) => {
  const getMarkup = () => {
    if (type === 'firefly') {
      return (
        <motion.div 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
          style={{ width: size, height: size, backgroundColor: '#a3ffb4', borderRadius: '50%', boxShadow: '0 0 8px #a3ffb4' }} 
        />
      );
    }
    if (type === 'butterfly') {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#DCA29F" strokeWidth="1" opacity={0.3}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      );
    }
    return (
      <div style={{ width: size, height: size, backgroundColor: '#ffd700', borderRadius: '50%', opacity: 0.5, boxShadow: '0 0 4px #ffd700' }} />
    );
  };

  const isButterfly = type === 'butterfly';

  return (
    <motion.div
      className="absolute bottom-0 z-0 pointer-events-none"
      initial={{ y: '100vh', x: x, rotate: 0, opacity: 0 }}
      animate={{ 
        y: '-20vh', 
        x: `calc(${x} + ${Math.random() > 0.5 ? 40 : -40}px)`,
        rotate: isButterfly ? [-10, 10, -10] : 360,
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
  const elements = Array.from({ length: 30 }).map((_, i) => {
    const type = i % 5 === 0 ? 'butterfly' : (i % 2 === 0 ? 'firefly' : 'gold');
    const size = type === 'butterfly' ? Math.random() * 10 + 10 : Math.random() * 3 + 2;
    return (
      <Particle
        key={i}
        delay={Math.random() * 20}
        duration={Math.random() * 20 + 20}
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
