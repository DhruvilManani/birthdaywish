import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeartBeatProps {
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export const HeartBeat: React.FC<HeartBeatProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const centerX = width / 2;
    const centerY = height / 2;

    const spawnParticles = () => {
      const colors = ['#FF6B8B', '#FFB7C5', '#D4AF37', '#FFFDF6'];
      const numParticles = 12;
      for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 2.0;
        particlesRef.current.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.012 + Math.random() * 0.008,
        });
      }
    };

    // Trigger particle bursts in sync with the heart's double-beat (every 1.2s)
    let lastBurst = 0;
    const burstInterval = 1200; // ms

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Trigger particle burst
      if (time - lastBurst > burstInterval) {
        spawnParticles();
        // Secondary subtle bounce particle burst to mimic heart double beat
        setTimeout(spawnParticles, 250);
        lastBurst = time;
      }

      // Update and draw particles
      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(index, 1);
          return;
        }

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grad.addColorStop(0, p.color);
        grad.addColorStop(0.3, p.color + 'aa');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Call onComplete after a fixed heartbeat duration (e.g. 4.5 seconds)
    const timeoutId = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4500);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-40 bg-black flex items-center justify-center select-none overflow-hidden">
      {/* Background canvas for heart sparkles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Pulsing Glowing Heart */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1.08, 1.28, 1, 1], // Double beat pattern
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 w-28 h-28 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 24 24"
          fill="url(#heartGrad)"
          className="w-full h-full drop-shadow-[0_0_25px_rgba(255,107,139,0.8)] filter"
          style={{ transform: 'translate3d(0,0,0)' }}
        >
          <defs>
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B8B" />
              <stop offset="50%" stopColor="#FF9EAE" />
              <stop offset="100%" stopColor="#FFB7C5" />
            </linearGradient>
          </defs>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
    </div>
  );
};
export default HeartBeat;
