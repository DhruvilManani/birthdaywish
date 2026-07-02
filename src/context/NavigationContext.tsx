import React, { createContext, useContext, useState } from 'react';

interface NavigationContextType {
  isChapterComplete: boolean;
  setChapterComplete: (isComplete: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChapterComplete, setIsChapterComplete] = useState(false);

  return (
    <NavigationContext.Provider value={{ isChapterComplete, setChapterComplete: setIsChapterComplete }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
