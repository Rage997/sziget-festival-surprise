import React, { useState, useRef } from 'react';
import ThreeBackground from './components/ThreeBackground';
import SurpriseButton from './components/SurpriseButton';
import SurpriseReveal from './components/SurpriseReveal';
import BudapestMap from './components/BudapestMap';

function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false); // Separate state for balloons
  const [fireworksIntensity, setFireworksIntensity] = useState<'burst' | 'normal'>('normal');
  const burstTimeoutRef = useRef<NodeJS.Timeout>();

  const handleSurpriseClick = () => {
    console.log('Surprise button clicked!');
    setIsRevealed(true);
    setShowFireworks(true); // Start fireworks immediately
    setShowBalloons(true);  // Start balloons immediately too!
    
    // Start with burst intensity
    setFireworksIntensity('burst');
    
    // Clear any existing timeout
    if (burstTimeoutRef.current) {
      clearTimeout(burstTimeoutRef.current);
    }
    
    // After 15 seconds, settle into normal continuous fireworks
    burstTimeoutRef.current = setTimeout(() => {
      setFireworksIntensity('normal');
    }, 15000);
  };

  console.log('App state:', { isRevealed, showFireworks, showBalloons, fireworksIntensity });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Three.js background - on top but with pointer-events: none */}
      <ThreeBackground 
        showFireworks={showFireworks} // Only show after button press
        showBalloons={showBalloons}   // Only show after button press
        showCamper={isRevealed}
        fireworksIntensity={fireworksIntensity}
      />
      
      {/* UI Content - interactive layer */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-6 z-10">
        {!isRevealed ? (
          <div className="text-center">
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-wide">
                Something Special
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8">
                I have a surprise for you... 💕
              </p>
            </div>
            <SurpriseButton onClick={handleSurpriseClick} isRevealed={isRevealed} />
          </div>
        ) : (
          <>
            <SurpriseReveal isVisible={isRevealed} />
            <BudapestMap isVisible={isRevealed} />
          </>
        )}
      </div>
      
      {/* Enhanced decorative elements - lower z-index */}
      <div className="absolute top-10 left-10 w-6 h-6 border-2 border-white/20 rounded-full animate-ping z-5"></div>
      <div className="absolute bottom-20 right-20 w-4 h-4 bg-pink-400/30 rounded-full animate-pulse z-5"></div>
      <div className="absolute top-1/3 right-10 w-3 h-3 bg-yellow-400/40 rounded-full animate-bounce z-5"></div>
      <div className="absolute bottom-1/3 left-20 w-5 h-5 border border-blue-400/30 rotate-45 animate-spin z-5"></div>
      <div className="absolute top-20 right-1/3 w-4 h-4 bg-purple-400/30 rounded-full animate-pulse z-5"></div>
      <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-green-400/40 rounded-full animate-bounce z-5"></div>
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-blue-400/50 rounded-full animate-ping z-5"></div>
      <div className="absolute bottom-1/4 right-1/3 w-5 h-5 border border-pink-400/30 rotate-45 animate-spin z-5"></div>
    </div>
  );
}

export default App;