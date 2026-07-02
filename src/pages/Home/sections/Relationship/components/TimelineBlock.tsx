import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineBlockProps {
  time: string;
  title: string;
  icon: string;
  isLast?: boolean;
}

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ time, title, icon, isLast = false }) => {
  const [isTapped, setIsTapped] = useState(false);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleTap = () => {
    setIsTapped(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsTapped(false), 2000);
  };

  return (
    <div className="relative flex flex-col items-center w-full my-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", duration: 1.5, bounce: 0.3 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleTap}
        className="w-16 h-16 md:w-20 md:h-20 bg-[#fffdfa] rounded-full shadow-lg border border-[#f5ead9] flex items-center justify-center z-10 relative cursor-pointer"
      >
        <motion.span 
          animate={isTapped && icon === '🤍' ? { scale: [1, 1.4, 1, 1.4, 1] } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl z-20"
        >
          {icon}
        </motion.span>
        
        {/* Subtle glow (always there) */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.3)] opacity-0 hover:opacity-100 transition-opacity duration-500" />

        {/* Tap Glow for Moon */}
        {icon === '🌙' && (
          <motion.div 
            animate={{ opacity: isTapped ? 1 : 0, scale: isTapped ? 1.5 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(251,191,36,0.8)] pointer-events-none"
          />
        )}

        {/* Coffee Steam */}
        {icon === '☕' && (
          <AnimatePresence>
            {isTapped && (
              <>
                <motion.div initial={{ opacity: 0, y: 0, scale: 0.5 }} animate={{ opacity: [0, 0.5, 0], y: -30, scale: 1.5, x: -5 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute -top-4 w-2 h-6 bg-stone-300 blur-sm rounded-full" />
                <motion.div initial={{ opacity: 0, y: 0, scale: 0.5 }} animate={{ opacity: [0, 0.4, 0], y: -40, scale: 2, x: 5 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} className="absolute -top-6 w-3 h-8 bg-stone-200 blur-md rounded-full" />
              </>
            )}
          </AnimatePresence>
        )}

        {/* Phone Emojis */}
        {icon === '📱' && (
          <AnimatePresence>
            {isTapped && (
              <>
                <motion.div initial={{ opacity: 0, y: 0, x: 0 }} animate={{ opacity: [1, 1, 0], y: -50, x: -20 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute -top-4 text-xl">❤️</motion.div>
                <motion.div initial={{ opacity: 0, y: 0, x: 0 }} animate={{ opacity: [1, 1, 0], y: -60, x: 10 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, delay: 0.1 }} className="absolute -top-4 text-lg">🥹</motion.div>
                <motion.div initial={{ opacity: 0, y: 0, x: 0 }} animate={{ opacity: [1, 1, 0], y: -40, x: 30 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, delay: 0.2 }} className="absolute -top-4 text-xl">✨</motion.div>
              </>
            )}
          </AnimatePresence>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-center mt-6"
      >
        <p className="font-cute text-amber-700/60 tracking-widest uppercase text-xs mb-1">{time}</p>
        <h3 className="font-elegant text-2xl md:text-3xl text-stone-800">{title}</h3>
      </motion.div>

      {/* The connecting vertical line */}
      {!isLast && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 64, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-[1px] bg-gradient-to-b from-amber-200 to-transparent mt-8"
        />
      )}
    </div>
  );
};
