import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrapbookPhoto } from './ScrapbookPhoto';
import { HandwrittenNote } from '../ChapterTwo/InteractiveDecorations';
import { MemoryViewer } from './MemoryViewer';

// Utility to generate a pseudo-random rotation between -8 and 8
const getRandomRotation = (index: number) => {
  const rotations = [-4, 5, -2, 7, -6, 3, -5, 4, -7, 6];
  return rotations[index % rotations.length];
};

// Utility to get varied alignment
const getAlignment = (index: number): 'left' | 'center' | 'right' => {
  if (index % 5 === 0) return 'center';
  if (index % 2 === 0) return 'right';
  return 'left';
};

// Utility to get varied sizes
const getSize = (index: number): 'small' | 'medium' | 'large' => {
  if (index % 7 === 0) return 'large';
  if (index % 3 === 0) return 'small';
  return 'medium';
};

const quotes = [
  "Our happiest days.",
  "I wish I could relive this.",
  "Every smile became my favourite.",
  "These pictures never grow old.",
  "Forever my safe place."
];

const QuoteBlock: React.FC<{ text: string }> = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 2, ease: "easeOut" }}
    className="w-full flex justify-center my-24"
  >
    <HandwrittenNote text={text} className="scale-125 md:scale-150 text-stone-700 opacity-90" />
  </motion.div>
);

const DecorationElement: React.FC<{ type: 'star' | 'flower' | 'heart'; align: 'left' | 'right' }> = ({ type, align }) => {
  const content = {
    star: '⭐',
    flower: '🌸',
    heart: '🤎'
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -20, scale: 0 }}
      whileInView={{ opacity: 0.6, rotate: 10, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={`text-2xl md:text-4xl absolute ${align === 'left' ? 'left-8 md:left-24' : 'right-8 md:right-24'} drop-shadow-sm`}
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
          opacity: type === 'star' ? [0.4, 0.8, 0.4] : 1
        }}
        transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {content[type]}
      </motion.div>
    </motion.div>
  );
};

export const ScrapbookFlow: React.FC = () => {
  const totalImages = 30;
  
  // Pick one favorite image randomly (excluding the very first ones to ensure it appears midway)
  const favoriteIndex = React.useMemo(() => Math.floor(Math.random() * (totalImages - 5)) + 5, []);
  
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Create an array of indices [1, 2, ..., 30]
  const indices = Array.from({ length: totalImages }, (_, i) => i + 1);

  const viewerImages = React.useMemo(() => {
    return indices.map((index) => ({
      id: `memory-${index}`,
      src: `/images/memories/${String(index).padStart(3, '0')}.jpg`,
      isFavorite: index === favoriteIndex
    }));
  }, [indices, favoriteIndex]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col py-12 relative px-4">
      {indices.map((index) => {
        const paddedIndex = String(index).padStart(3, '0');
        const src = `/images/memories/${paddedIndex}.jpg`;
        
        // Inject Quotes
        const quoteIndex = (index % 6 === 0) ? (index / 6) % quotes.length : -1;
        
        // Inject Decorations randomly
        const decType = index % 8 === 0 ? 'flower' : (index % 3 === 0 ? 'heart' : 'star');
        const decoration = index % 4 === 0 ? decType as 'star' | 'flower' | 'heart' : null;

        return (
          <motion.div 
            key={`memory-${index}`} 
            className="relative w-full flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            
            {/* The Photo */}
            <ScrapbookPhoto 
              src={src}
              rotation={getRandomRotation(index)}
              alignment={getAlignment(index)}
              size={getSize(index)}
              hasTape={index % 3 !== 0}
              isFavorite={index === favoriteIndex}
              layoutId={`memory-${index}`}
              onClick={() => setActiveImageIndex(index - 1)}
            />
            
            {/* Hand-written Quote every 6 images */}
            {quoteIndex !== -1 && <QuoteBlock text={quotes[quoteIndex]} />}
            
            {/* Random Decoration */}
            {decoration && <DecorationElement type={decoration} align={index % 2 === 0 ? 'left' : 'right'} />}
          </motion.div>
        );
      })}

      {/* Memory Viewer Fullscreen Overlay */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <MemoryViewer 
            images={viewerImages}
            activeIndex={activeImageIndex}
            onClose={() => setActiveImageIndex(null)}
            onChangeIndex={setActiveImageIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
