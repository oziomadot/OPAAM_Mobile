import { useState, useEffect } from 'react';

// Base coin values (in kobo - 100 kobo = 1 Naira)
const COIN_VALUES = {
  CORRECT_ANSWER: 10, // Base coins for correct answer
  TIME_BONUS: 1,      // Coins per second (adjust based on ad revenue)
  MAX_TIME_BONUS: 30  // Maximum time bonus per question
};

export const useCoinSystem = () => {
  const [coins, setCoins] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [startTime, setStartTime] = useState(0);

  // Format coins as Naira
  const formatCoins = (amount: number) => {
    return (amount / 100).toFixed(2);
  };

  // Start timer when question is shown
  const startTimer = () => {
    setStartTime(Date.now());
    setTimerActive(true);
  };

  // Stop timer and calculate coins
  const stopTimer = (isCorrect: boolean) => {
    if (!timerActive) return 0;
    
    const endTime = Date.now();
    const secondsSpent = Math.floor((endTime - startTime) / 1000);
    const timeBonus = Math.min(secondsSpent * COIN_VALUES.TIME_BONUS, COIN_VALUES.MAX_TIME_BONUS);
    
    let earnedCoins = 0;
    if (isCorrect) {
      earnedCoins = COIN_VALUES.CORRECT_ANSWER + timeBonus;
      setCoins(prev => prev + earnedCoins);
    }
    
    setTimerActive(false);
    return earnedCoins;
  };

  // Reset the coin system
  const resetCoins = () => {
    setCoins(0);
    setTimeSpent(0);
    setTimerActive(false);
  };

  return {
    coins,
    formatCoins,
    startTimer,
    stopTimer,
    resetCoins,
    currentTimeSpent: () => Math.floor((Date.now() - startTime) / 1000)
  };
};
