import React from 'react';
import { motion } from 'framer-motion';

export const HeroSubtitle: React.FC = () => {
  return (
    <motion.div
      className="text-center z-10 relative mt-10 px-8 max-w-md mx-auto"
      initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration: 1.5, delay: 3.2, ease: "easeOut" }}
    >
      <p className="font-elegant italic text-neutral-500/95 leading-[2.2] text-[16px] md:text-xl tracking-[0.08em] md:tracking-[0.1em] antialiased">
        "The girl who turned ordinary days
        <br />
        into my favourite memories."
      </p>
    </motion.div>
  );
};
