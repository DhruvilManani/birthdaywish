
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AudioProvider } from './context/AudioContext';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import MusicToggle from './components/ui/MusicToggle';

function App() {
  return (
    <AudioProvider>
      <BrowserRouter>
        <div className="flex justify-center items-center h-[100dvh] w-full bg-stone-950 overflow-hidden">
          <div className="relative flex flex-col h-[100dvh] w-full max-w-[430px] bg-cream-white shadow-2xl selection:bg-soft-pink-dark selection:text-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] overflow-hidden">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>
            
            {/* Global background music controller floating button */}
            <MusicToggle />
          </div>
        </div>
      </BrowserRouter>
    </AudioProvider>
  );
}

export default App;
