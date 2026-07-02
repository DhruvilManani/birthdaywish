import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  glowColor?: 'pink' | 'gold' | 'lavender' | 'none';
  hoverEffect?: boolean;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glowColor = 'pink',
  hoverEffect = true,
  delay = 0,
  ...props
}) => {
  const glowClasses = {
    pink: 'shadow-[0_12px_40px_rgba(255,183,197,0.18)] border-soft-pink/30 hover:shadow-[0_20px_50px_rgba(255,107,139,0.22)]',
    gold: 'shadow-[0_12px_40px_rgba(212,175,55,0.15)] border-golden/30 hover:shadow-[0_20px_50px_rgba(212,175,55,0.22)]',
    lavender: 'shadow-[0_12px_40px_rgba(230,230,250,0.2)] border-lavender-dark/30 hover:shadow-[0_20px_50px_rgba(201,201,235,0.28)]',
    none: 'border-white/30 shadow-sm',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as any }}
      whileHover={hoverEffect ? { y: -5, scale: 1.01 } : undefined}
      className={cn(
        'glass-panel rounded-[32px] p-8 md:p-10',
        'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
        glowClasses[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
export default GlassCard;
