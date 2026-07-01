import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id: string;
  className?: string;
  background?: 'gradient' | 'glass' | 'cream' | 'none';
  fullHeight?: boolean;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className,
  background = 'none',
  fullHeight = true,
  ...props
}) => {
  const bgClasses = {
    gradient: 'bg-gradient-to-b from-cream-white via-soft-pink-light/35 to-lavender-light/35',
    glass: 'glass-panel border-y border-white/30',
    cream: 'bg-cream-white',
    none: '',
  };

  return (
    <section
      id={id}
      className={cn(
        'relative w-full flex flex-col justify-center px-6 py-12 md:py-24 overflow-hidden',
        fullHeight && 'min-h-[100svh]',
        bgClasses[background],
        className
      )}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.0 }}
        className="w-full max-w-lg mx-auto flex flex-col items-center text-center relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};
