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
        'relative flex flex-col flex-1 w-full h-full px-6 pt-[max(env(safe-area-inset-top),3rem)] pb-[calc(env(safe-area-inset-bottom)+7rem)] md:py-24 overflow-y-auto overflow-x-hidden',
        bgClasses[background],
        className
      )}
      {...props}
    >
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
        className="flex flex-col flex-1 w-full max-w-lg mx-auto items-center text-center relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};
