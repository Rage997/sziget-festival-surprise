import React, { useState, useRef } from 'react';
import ThreeBackground from './components/ThreeBackground';
import SurpriseButton from './components/SurpriseButton';
import SurpriseReveal from './components/SurpriseReveal';
import BudapestMap from './components/BudapestMap';

function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [fireworksIntensity, setFireworksIntensity] = useState<'burst' | 'normal'>('normal');
  const burstTimeoutRef = useRef<NodeJS.Timeout>();

  const handleSurpriseClick = () => {
    console.log('Surprise button clicked!');
    setIsRevealed(true);
    setShowFireworks(true);
    setShowBalloons(true);
    
    setFireworksIntensity('burst');
    
    if (burstTimeoutRef.current) {
      clearTimeout(burstTimeoutRef.current);
    }
    
    burstTimeoutRef.current = setTimeout(() => {
      setFireworksIntensity('normal');
    }, 15000);
  };

  console.log('App state:', { isRevealed, showFireworks, showBalloons, fireworksIntensity });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Three.js background - optimized for mobile */}
      <ThreeBackground 
        showFireworks={showFireworks}
        showBalloons={showBalloons}
        showCamper={isRevealed}
        fireworksIntensity={fireworksIntensity}
      />
      
      {/* UI Content - mobile-first responsive design */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 z-10">
        {!isRevealed ? (
          <div className="text-center w-full max-w-lg">
            <div className="mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-wide leading-tight">
                Something Special
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-8 px-2">
                I have a surprise for you... 💕
              </p>
            </div>
            <SurpriseButton onClick={handleSurpriseClick} isRevealed={isRevealed} />
          </div>
        ) : (
          <div className="w-full">
            <SurpriseReveal isVisible={isRevealed} />
            <BudapestMap isVisible={isRevealed} />
          </div>
        )}
      </div>
      
      {/* Mobile-optimized decorative elements */}
      <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-4 sm:w-6 h-4 sm:h-6 border-2 border-white/20 rounded-full animate-ping z-5"></div>
      <div className="absolute bottom-16 sm:bottom-20 right-8 sm:right-20 w-3 sm:w-4 h-3 sm:h-4 bg-pink-400/30 rounded-full animate-pulse z-5"></div>
      <div className="absolute top-1/4 sm:top-1/3 right-4 sm:right-10 w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400/40 rounded-full animate-bounce z-5"></div>
      <div className="absolute bottom-1/3 left-8 sm:left-20 w-3 sm:w-5 h-3 sm:h-5 border border-blue-400/30 rotate-45 animate-spin z-5"></div>
      <div className="absolute top-16 sm:top-20 right-1/4 sm:right-1/3 w-3 sm:w-4 h-3 sm:h-4 bg-purple-400/30 rounded-full animate-pulse z-5"></div>
      <div className="absolute bottom-32 sm:bottom-40 left-1/6 sm:left-1/4 w-2 sm:w-3 h-2 sm:h-3 bg-green-400/40 rounded-full animate-bounce z-5"></div>
      <div className="absolute top-1/2 left-4 sm:left-10 w-2 h-2 bg-blue-400/50 rounded-full animate-ping z-5"></div>
      <div className="absolute bottom-1/4 right-1/4 sm:right-1/3 w-3 sm:w-5 h-3 sm:h-5 border border-pink-400/30 rotate-45 animate-spin z-5"></div>
    </div>
  );
}

export default App;