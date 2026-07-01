import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 3, // long pauses between lines
      delayChildren: 1.5,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 2, ease: "easeOut" }
  }
};

export const MemoryText: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col gap-8 md:gap-10 text-center px-6 md:px-12 mt-10 z-10 relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.p variants={itemVariants} className="font-cute text-neutral-700 text-lg md:text-xl font-medium tracking-wide">
        "We first met in 9th standard."
      </motion.p>
      
      <motion.p variants={itemVariants} className="font-cute text-neutral-700 text-lg md:text-xl font-medium tracking-wide">
        "You asked me for a writing pad."
      </motion.p>
      
      <motion.p variants={itemVariants} className="font-cute text-neutral-700 text-lg md:text-xl font-medium tracking-wide">
        "It felt like the smallest moment."
      </motion.p>
      
      <motion.p variants={itemVariants} className="font-elegant italic text-neutral-800 text-xl md:text-2xl font-bold tracking-widest leading-relaxed mt-4">
        "But life had already started writing<br/>our story."
      </motion.p>
    </motion.div>
  );
};
