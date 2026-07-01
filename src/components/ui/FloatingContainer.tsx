import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface FloatingContainerProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  yRange?: number;
  xRange?: number;
  rotateRange?: number;
  delay?: number;
}

export const FloatingContainer: React.FC<FloatingContainerProps> = ({
  children,
  className,
  duration = 6,
  yRange = 12,
  xRange = 6,
  rotateRange = 3,
  delay = 0,
}) => {
  return (
    <motion.div
      animate={{
        y: [-yRange, yRange, -yRange],
        x: [-xRange, xRange, -xRange],
        rotate: [-rotateRange, rotateRange, -rotateRange],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  );
};
