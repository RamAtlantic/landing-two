import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-2 text-white">
      <div className="flex flex-col items-center">
        <motion.div 
          className="bg-gradient-to-r from-[#EC3765] via-[#FFD700] to-[#EC3765] rounded-lg p-2 min-w-[60px] text-center"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
        </motion.div>
        <span className="text-xs text-white/70 mt-1">Horas</span>
      </div>
      
      <span className="text-2xl font-bold text-white/50">:</span>
      
      <div className="flex flex-col items-center">
        <motion.div 
          className="bg-gradient-to-r from-[#EC3765] via-[#FFD700] to-[#EC3765] rounded-lg p-2 min-w-[60px] text-center"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
        </motion.div>
        <span className="text-xs text-white/70 mt-1">Minutos</span>
      </div>
      
      <span className="text-2xl font-bold text-white/50">:</span>
      
      <div className="flex flex-col items-center">
        <motion.div 
          className="bg-gradient-to-r from-[#EC3765] via-[#FFD700] to-[#EC3765] rounded-lg p-2 min-w-[60px] text-center"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
        </motion.div>
        <span className="text-xs text-white/70 mt-1">Segundos</span>
      </div>
    </div>
  );
};

export default CountdownTimer; 