import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects based on scroll
  const yClouds = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yParticles = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const yRays = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Layer 1: Soft animated cream gradient (Base) */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-white via-peach-light to-lavender-light opacity-100" />
      
      {/* Layer 2: Moving clouds (Very soft blur blobs) */}
      <motion.div style={{ y: yClouds }} className="absolute inset-0 opacity-20 will-change-transform">
        <motion.div 
          className="absolute top-[-5%] left-[-10%] w-[70%] h-[50%] bg-white rounded-full "
          animate={{ x: [0, 40, 0], y: [0, 15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[20%] right-[-10%] w-[60%] h-[40%] bg-soft-pink-light rounded-full "
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
        />
      </motion.div>

      {/* Layer 3: Warm light rays entering from top */}
      <motion.div style={{ y: yRays }} className="absolute inset-0 opacity-20 mix-blend-overlay will-change-transform">
        <div className="absolute top-[-10%] left-[15%] w-[30%] h-[150%] bg-gradient-to-b from-white via-white/40 to-transparent rotate-[30deg] blur-[80px] transform translate-z-0" />
        <div className="absolute top-[-10%] right-[20%] w-[25%] h-[130%] bg-gradient-to-b from-golden-light via-golden-light/30 to-transparent rotate-[-20deg] blur-[70px] transform translate-z-0" />
      </motion.div>

      {/* Layer 4: Blurred Roses (Very soft bokeh) */}
      <div className="absolute inset-0 will-change-transform">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`rose-bokeh-${i}`}
            className="absolute rounded-full bg-rose-light opacity-[0.08] blur-[40px]"
            style={{
              width: `${Math.random() * 80 + 60}px`,
              height: `${Math.random() * 80 + 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Layer 5: Floating Fairy Dust & Sparkles */}
      <motion.div style={{ y: yParticles }} className="absolute inset-0 will-change-transform">
        {[...Array(12)].map((_, i) => {
          const isSparkle = i % 4 === 0;
          
          return (
            <motion.div
              key={`dust-${i}`}
              className={`absolute rounded-full ${
                isSparkle ? 'bg-golden blur-[1px]' : 'bg-white blur-[2px]'
              }`}
              style={{
                width: isSparkle ? '3px' : '5px',
                height: isSparkle ? '3px' : '5px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0, isSparkle ? 0.35 : 0.15, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
