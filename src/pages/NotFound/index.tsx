import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { LuxuryButton } from '../../components/ui/LuxuryButton';
import { GlassCard } from '../../components/ui/GlassCard';
import { pageTransitionVariants } from '../../utils/animations';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-center justify-center min-h-[100svh] w-full px-6 bg-gradient-to-b from-cream-white via-soft-pink-light/35 to-lavender-light/35"
    >
      <GlassCard className="max-w-md w-full text-center py-12" glowColor="pink">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-7xl font-elegant bg-gradient-to-r from-rose to-golden bg-clip-text text-transparent mb-4"
        >
          404
        </motion.h1>
        
        <h2 className="text-xl md:text-2xl font-elegant font-semibold text-neutral-800 mb-2">
          Lost in the Dream?
        </h2>
        
        <p className="font-cute text-sm md:text-base text-neutral-500 mb-8 max-w-xs mx-auto">
          This secret path doesn't exist in our memory lane. Let's head back home.
        </p>

        <LuxuryButton 
          variant="primary" 
          onClick={() => navigate('/')} 
          className="gap-2"
        >
          <Home className="w-4 h-4" />
          Back Home
        </LuxuryButton>
      </GlassCard>
    </motion.div>
  );
};
export default NotFoundPage;
