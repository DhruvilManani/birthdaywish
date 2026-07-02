import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SafeImage } from './SafeImage';
import { HandwrittenNote } from '../../ChapterTwo/InteractiveDecorations';

interface ScrapbookMemoryProps {
  src: string;
  caption: string;
  rotation?: number;
  align?: 'left' | 'right' | 'center';
  decoration?: 'flower' | 'heart' | 'tape' | 'clip';
}

export const ScrapbookMemory: React.FC<ScrapbookMemoryProps> = ({ 
  src, 
  caption, 
  rotation = 0, 
  align = 'center',
  decoration = 'tape'
}) => {
  const alignClass = align === 'left' ? 'mr-auto ml-4 md:ml-12' : align === 'right' ? 'ml-auto mr-4 md:mr-12' : 'mx-auto';
  
  // Randomize floating slightly so multiple memories don't sync
  const floatDuration = useMemo(() => 4 + Math.random() * 2, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: rotation - 10 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", duration: 2, bounce: 0.2 }}
      className={`relative w-64 md:w-80 my-16 ${alignClass} group`}
    >
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}>
        {/* Torn Paper Background */}
        <div className="absolute inset-0 bg-[#fdfbf7] shadow-[0_15px_30px_rgba(0,0,0,0.1)] rounded-sm"
             style={{
               clipPath: 'polygon(1% 0%, 98% 1%, 100% 98%, 0% 100%, 2% 50%)',
               transform: 'scale(1.05)'
             }}
        />

        {/* Masking Tape */}
        {decoration === 'tape' && (
          <motion.div 
            animate={{ rotate: [-3, -4, -3], scale: [1, 1.02, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#e8e4d9] opacity-80 mix-blend-multiply rotate-[-3deg] z-20 shadow-sm" 
            style={{ clipPath: 'polygon(5% 0%, 95% 5%, 98% 95%, 2% 100%)' }} 
          />
        )}

        {/* Paper Clip */}
        {decoration === 'clip' && (
          <div className="absolute -top-6 left-8 w-6 h-16 border-4 border-stone-300 rounded-full z-20 rotate-[15deg] shadow-sm overflow-hidden">
            <motion.div 
              animate={{ y: ['-100%', '200%'] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
              className="absolute inset-0 bg-white opacity-50  w-full h-4 rotate-45"
            />
          </div>
        )}

        {/* Flower */}
        {decoration === 'flower' && (
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileTap={{ scale: 1.2, rotate: [20, 25, 20] }}
            className="absolute -top-4 -right-4 text-4xl z-20 drop-shadow-md rotate-[20deg] cursor-pointer"
          >
            🌸
          </motion.div>
        )}

        {/* Heart Sticker */}
        {decoration === 'heart' && (
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileTap={{ scale: 1.3 }}
            className="absolute -bottom-4 -left-4 text-3xl z-20 drop-shadow-md rotate-[-15deg] cursor-pointer"
          >
            🤎
          </motion.div>
        )}

        {/* Image Container */}
        <div className="relative z-10 p-4 pb-16 bg-[#fdfbf7]">
          <div className="w-full aspect-square overflow-hidden shadow-inner bg-stone-100">
            <SafeImage src={src} alt={caption} className="w-full h-full object-cover grayscale-[20%] sepia-[10%] group-hover:grayscale-0 transition-all duration-700" />
          </div>
          
          {/* Caption with fade and slight rotation */}
          <div className="absolute bottom-4 w-full left-0 flex justify-center px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 1, 0, -1, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
              >
                <HandwrittenNote text={caption} className="text-stone-700 opacity-90 scale-90 md:scale-100" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
