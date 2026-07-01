import React, { useState } from 'react';
import { motion } from 'framer-motion';

const sentenceVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 2.5 } // Pause naturally
  }
};

const charVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } } // Faster typing speed
};

const letterVariants = {
  hidden: { opacity: 0, display: 'none' },
  show: { opacity: 1, display: 'inline' }
};

interface TypewriterLineProps {
  text: string;
  className?: string;
  showCursor?: boolean;
}

const TypewriterLine: React.FC<TypewriterLineProps> = ({ text, className, showCursor = false }) => {
  return (
    <motion.p variants={charVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className={className}>
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
      {showCursor && (
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[3px] h-[1em] bg-rose-dark align-middle ml-1"
        />
      )}
    </motion.p>
  );
};

export const TypewriterStory: React.FC = () => {
  const [showFinalCursor, setShowFinalCursor] = useState(false);

  return (
    <motion.div 
      className="flex flex-col gap-8 md:gap-10 text-center z-20 relative px-4 my-16 max-w-sm mx-auto"
      variants={sentenceVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      onAnimationComplete={() => setTimeout(() => setShowFinalCursor(true), 2000)}
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <TypewriterLine text='"We became friends."' className="font-cute text-neutral-700 text-xl md:text-2xl font-medium" />
      </motion.div>
      
      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <TypewriterLine text='"We talked every day."' className="font-cute text-neutral-700 text-xl md:text-2xl font-medium" />
      </motion.div>
      
      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <TypewriterLine text='"Six beautiful years passed."' className="font-cute text-neutral-700 text-xl md:text-2xl font-medium" />
      </motion.div>
      
      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <TypewriterLine text='"I kept teasing you..."' className="font-cute text-neutral-700 text-xl md:text-2xl font-medium" />
      </motion.div>
      
      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <TypewriterLine text='"And somehow..."' className="font-cute text-neutral-700 text-xl md:text-2xl font-medium" />
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <TypewriterLine text='"...you always stayed."' showCursor={showFinalCursor} className="font-elegant italic text-neutral-800 text-2xl md:text-3xl font-bold tracking-wide leading-relaxed mt-4" />
      </motion.div>
    </motion.div>
  );
};
