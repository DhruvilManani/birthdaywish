import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface LuxuryButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  glow = true,
  ...props
}) => {
  const baseStyle = cn(
    'group relative inline-flex items-center justify-center font-cute font-semibold tracking-wider rounded-full overflow-hidden transition-all duration-500 active:scale-95 cursor-pointer select-none border border-transparent'
  );

  const variants = {
    primary: cn(
      'bg-gradient-to-r from-soft-pink via-peach-dark to-light-purple text-white shadow-soft border-white/20',
      glow && 'hover:shadow-[0_12px_28px_rgba(255,107,139,0.32)]'
    ),
    secondary: cn(
      'bg-cream-dark/85 text-rose border-soft-pink/30 hover:bg-soft-pink-light/80 backdrop-blur-sm shadow-sm',
      glow && 'hover:shadow-[0_8px_20px_rgba(230,230,250,0.4)]'
    ),
    outline: cn(
      'bg-transparent border-white/40 text-neutral-800 backdrop-blur-sm hover:bg-white/20 hover:border-white/60 shadow-sm'
    ),
    gold: cn(
      'bg-gradient-to-r from-golden-dark via-golden to-golden-light text-white shadow-luxury border-white/10',
      glow && 'hover:shadow-[0_12px_28px_rgba(212,175,55,0.32)]'
    ),
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-xs',
    md: 'px-8 py-3.5 text-sm md:text-base',
    lg: 'px-12 py-4.5 text-base md:text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={cn(baseStyle, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Premium glowing backdrop reflection sweep */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-sweep pointer-events-none" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children as React.ReactNode}
      </span>
    </motion.button>
  );
};
export default LuxuryButton;
