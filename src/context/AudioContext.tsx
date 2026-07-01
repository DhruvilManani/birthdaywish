import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setTrack: (src: string) => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  togglePlay: () => {},
  play: () => {},
  pause: () => {},
  audioRef: { current: null },
  setTrack: () => {},
});

export const useAudio = () => useContext(AudioContext);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element globally
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Handle standard browser autoplay blocker rules
    const handleUserInteraction = () => {
      // Don't auto-play immediately if the user hasn't explicitly played, 
      // but ensure context is ready
    };

    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const play = () => {
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio autoplay blocked or failed:', err));
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setTrack = (src: string) => {
    if (audioRef.current) {
      const isAlreadyPlaying = isPlaying;
      audioRef.current.src = src;
      audioRef.current.load();
      if (isAlreadyPlaying) {
        play();
      }
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, play, pause, audioRef, setTrack }}>
      {children}
    </AudioContext.Provider>
  );
};
