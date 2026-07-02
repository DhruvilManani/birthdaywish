import React from 'react';
import { motion } from 'framer-motion';
import { VolumeX } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { cn } from '../../utils/cn';

interface MusicToggleProps {
  className?: string;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({ className }) => {
  const { isPlaying, togglePlay } = useAudio();

  const waveBarCount = 4;
  const waveBars = Array.from({ length: waveBarCount });

  return (
    <motion.button
      onClick={togglePlay}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'absolute bottom-6 right-6 z-50',
        'w-12 h-12 md:w-14 h-14',
        'glass-panel shadow-glass border border-white/40',
        'rounded-full flex items-center justify-center cursor-pointer group',
        'transition-all duration-500 ease-out',
        isPlaying
          ? 'hover:shadow-[0_0_20px_rgba(255,107,139,0.3)] bg-white/75'
          : 'hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] bg-white/45',
        className
      )}
      aria-label="Toggle background music"
    >
      <div className="flex flex-col items-center justify-center">
        {isPlaying ? (
          <div className="flex items-end justify-center gap-[2.5px] h-3.5 w-6">
            {waveBars.map((_, index) => {
              // Custom delays for nice stagger animation
              const delays = [0, 0.25, 0.15, 0.35];
              return (
                <motion.div
                  key={index}
                  animate={{
                    height: ['4px', '14px', '4px'],
                  }}
                  transition={{
                    duration: 1.0,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: delays[index],
                  }}
                  className="w-[2.5px] bg-rose rounded-full"
                />
              );
            })}
          </div>
        ) : (
          <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-neutral-500 transition-colors group-hover:text-rose" />
        )}
      </div>
    </motion.button>
  );
};
export default MusicToggle;
