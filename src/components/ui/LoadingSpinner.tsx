import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = 'md',
  label = 'Loading magic...',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-16 h-16 border-2',
    lg: 'w-24 h-24 border-3',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 select-none', className)}>
      <div className="relative flex items-center justify-center">
        {/* Outer glowing halo ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className={cn(
            'rounded-full border-t-rose border-r-transparent border-b-peach border-l-transparent opacity-80',
            sizeClasses[size]
          )}
        />

        {/* Inner reverse ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className={cn(
            'absolute rounded-full border-t-transparent border-r-golden border-b-transparent border-l-light-purple opacity-60',
            size === 'lg' ? 'w-18 h-18 border-2' : size === 'md' ? 'w-10 h-10 border-2' : 'w-5 h-5 border'
          )}
        />

        {/* Center glowing heart/sparkle dot */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className={cn(
            'absolute rounded-full bg-soft-pink-dark shadow-[0_0_10px_rgba(255,107,139,0.6)]',
            size === 'lg' ? 'w-4 h-4' : size === 'md' ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5'
          )}
        />
      </div>

      {label && (
        <motion.p
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-xs md:text-sm font-cute tracking-widest text-neutral-500 uppercase"
        >
          {label}
        </motion.p>
      )}
    </div>
  );
};
