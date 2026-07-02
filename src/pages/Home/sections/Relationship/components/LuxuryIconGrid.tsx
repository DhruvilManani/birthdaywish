import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const icons = [
  { emoji: '☕', text: "Every morning felt a little warmer." },
  { emoji: '🌙', text: "Late nights became my favorite." },
  { emoji: '🌧️', text: "Even the rain felt peaceful with you." },
  { emoji: '🌊', text: "You calmed my stormy thoughts." },
  { emoji: '🌸', text: "You made my world colorful." },
  { emoji: '🌹', text: "A love that simply bloomed." },
  { emoji: '🐼', text: "My favorite kind of comfort." },
  { emoji: '🎈', text: "You always lift my spirits." },
  { emoji: '🤍', text: "My heart just knew." }
];

const InteractiveIcon: React.FC<{ item: typeof icons[0] }> = ({ item }) => {
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
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.5, ease: "easeOut" } }
      }}
      className="flex flex-col items-center text-center max-w-sm relative"
    >
      <motion.div 
        animate={
          (isTapped && item.emoji === '🤍') ? { scale: [1, 1.3, 1, 1.3, 1] } 
          : (isTapped && item.emoji === '🎈') ? { y: -50, opacity: 0, transition: { duration: 1.5 } }
          : { y: [0, -5, 0] }
        }
        transition={isTapped && (item.emoji === '🤍' || item.emoji === '🎈') ? {} : { duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.9 }}
        onClick={handleTap}
        className={`text-4xl md:text-5xl mb-6 drop-shadow-sm opacity-80 cursor-pointer relative z-20 ${isTapped && (item.emoji === '🌙' || item.emoji === '✨') ? 'drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]' : ''}`}
      >
        {item.emoji}

        {/* Coffee Steam */}
        {item.emoji === '☕' && (
          <AnimatePresence>
            {isTapped && (
              <>
                <motion.div initial={{ opacity: 0, y: 0, scale: 0.5 }} animate={{ opacity: [0, 0.6, 0], y: -40, scale: 1.5, x: -10 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute -top-4 left-2 w-3 h-8 bg-stone-300  rounded-full pointer-events-none" />
                <motion.div initial={{ opacity: 0, y: 0, scale: 0.5 }} animate={{ opacity: [0, 0.5, 0], y: -50, scale: 2, x: 10 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} className="absolute -top-6 left-4 w-4 h-10 bg-stone-200  rounded-full pointer-events-none" />
              </>
            )}
          </AnimatePresence>
        )}

        {/* Flower Petals */}
        {(item.emoji === '🌸' || item.emoji === '🌹') && (
          <AnimatePresence>
            {isTapped && (
              <>
                {[...Array(2)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                    animate={{ opacity: 0, y: 40 + Math.random() * 20, x: (Math.random() - 0.5) * 60, rotate: Math.random() * 360 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`absolute top-2 left-4 text-sm pointer-events-none ${item.emoji === '🌹' ? 'text-red-500' : 'text-pink-400'}`}
                  >
                    {item.emoji === '🌹' ? '🥀' : '🌸'}
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        )}
      </motion.div>
      <h4 className="font-elegant italic text-2xl md:text-3xl text-stone-700/90 leading-relaxed tracking-wide">
        "{item.text}"
      </h4>
    </motion.div>
  );
};

export const LuxuryIconGrid: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        className="flex flex-col items-center gap-24"
      >
        {icons.map((item, index) => (
          <InteractiveIcon key={`icon-${index}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
};
