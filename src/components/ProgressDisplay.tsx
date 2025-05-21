// src/components/ProgressDisplay.tsx
import React, { useState, useEffect } from 'react';

const trackableSections = ['/sobre', '/experiencias', '/projetos', '/habilidades'];
const localStorageKey = 'visitedPortfolioSections';

const ProgressDisplay = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Ensure this code only runs on the client-side
      if (typeof window !== 'undefined') {
        const visitedFromStorage = localStorage.getItem(localStorageKey);
        const visitedPaths = visitedFromStorage ? JSON.parse(visitedFromStorage) : [];
        // Filter only trackable sections and ensure uniqueness
        const uniqueVisitedTrackable = new Set(visitedPaths.filter((path: string) => trackableSections.includes(path)));
        const newProgress = trackableSections.length > 0 ? (uniqueVisitedTrackable.size / trackableSections.length) * 100 : 0;
        setProgress(Math.floor(newProgress));
      }
    };

    updateProgress(); // Initial calculation

    // Listen for storage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === localStorageKey) {
        updateProgress();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      // Cleanup listener on component unmount
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div className="bg-game-bg-dark p-3 text-center font-pixel text-game-text-light shadow-pixel-md mb-6 mx-auto w-full max-w-md rounded-lg border-2 border-game-border">
      <p className="text-sm sm:text-base mb-1">Exploration Progress: {progress}%</p>
      <div className="w-full bg-game-border h-3 mt-1 pixel-border-inset rounded overflow-hidden">
        <div 
          className="bg-game-accent h-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressDisplay;
