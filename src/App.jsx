import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [countdown, setCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused((prevState) => !prevState);
  };

  const handleReset = () => {
    setCountdown(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <div className="flex items-center justify-center text-8xl font-bold mb-8">
          <AnimatePresence>
            {isRunning && !isPaused && (
              <motion.div
                key="countdown"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {formatTime(countdown)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handleStart}
            className={`flex items-center justify-center p-3 rounded-full transition-colors ${
              isRunning && !isPaused
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          >
            <Play className="w-6 h-6" />
          </button>
          <button
            onClick={handlePause}
            className={`flex items-center justify-center p-3 rounded-full transition-colors ${
              isPaused ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-600 hover:bg-gray-500'
            }`}
          >
            <Pause className="w-6 h-6" />
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center p-3 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors"
          >
            <RefreshCcw className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
      <div className="mt-4 flex items-center justify-center text-gray-400">
        <Clock className="w-5 h-5 mr-2" />
        <span>Simple Countdown App</span>
      </div>
    </div>
  );
};

export default App;