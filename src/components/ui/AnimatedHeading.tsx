import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3';
  delay?: number;
  highlightWords?: string[];
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className,
  tag = 'h1',
  delay = 0,
  highlightWords = [],
}) => {
  const Tag = tag;

  const tagStyles = {
    h1: 'text-4xl md:text-6xl font-elegant font-bold leading-tight mb-4',
    h2: 'text-2xl md:text-4xl font-elegant font-semibold leading-snug mb-3',
    h3: 'text-xl md:text-2xl font-elegant font-medium leading-relaxed mb-2',
  };

  // Split text into words to run individual word reveals
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any, // Apple easeOutExpo
      },
    },
  };

  return (
    <Tag className={cn('text-center select-none', tagStyles[tag], className)}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="inline-block flex-wrap justify-center"
      >
        {words.map((word, idx) => {
          // Check if this word should be highlighted in gradient color
          const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
          const isHighlighted = highlightWords.some(
            (hw) => cleanWord.toLowerCase() === hw.toLowerCase()
          );

          return (
            <motion.span
              key={idx}
              variants={wordVariants}
              className={cn(
                'inline-block mr-[0.25em]',
                isHighlighted
                  ? 'bg-gradient-to-r from-rose via-peach-dark to-golden bg-clip-text text-transparent'
                  : 'text-neutral-900'
              )}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
};
