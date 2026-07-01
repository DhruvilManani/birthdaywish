
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ScrollProvider } from './context/ScrollContext';
import { AudioProvider } from './context/AudioContext';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import MusicToggle from './components/ui/MusicToggle';

function App() {
  return (
    <AudioProvider>
      <ScrollProvider>
        <BrowserRouter>
          <div className="relative min-h-[100svh] w-full selection:bg-soft-pink-dark selection:text-white">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>
            
            {/* Global background music controller floating button */}
            <MusicToggle />
          </div>
        </BrowserRouter>
      </ScrollProvider>
    </AudioProvider>
  );
}

export default App;
