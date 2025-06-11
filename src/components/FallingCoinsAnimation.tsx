import React from 'react';
import { motion } from 'framer-motion';
import { FaCoins } from 'react-icons/fa';

const NUM_COINS = 15; // Number of coins to animate

const FallingCoinsAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(NUM_COINS)].map((_, i) => {
        const duration = 3 + Math.random() * 4; // Fall duration between 3 and 7 seconds
        const delay = Math.random() * 5; // Start delay up to 5 seconds
        const initialX = `${Math.random() * 100}%`; // Random horizontal start position
        const rotation = Math.random() * 360; // Random initial rotation

        return (
          <motion.div
            key={i}
            className="absolute text-yellow-500 text-opacity-70"
            style={{
              top: '-10%', // Start above the screen
              left: initialX,
              fontSize: `${1 + Math.random() * 1.5}rem`, // Random size between 1rem and 2.5rem
            }}
            initial={{ rotate: rotation, y: 0, opacity: 0 }}
            animate={{
              y: '110vh', // Fall below the screen
              opacity: [0, 0.7, 0.7, 0], // Fade in, stay visible, fade out
              rotate: rotation + (Math.random() > 0.5 ? 360 : -360), // Spin while falling
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatDelay: 1, // Small delay before repeating
              ease: 'linear',
              opacity: {
                  times: [0, 0.1, 0.9, 1], // Control opacity timing
                  duration: duration * 1.1, // Make opacity transition slightly longer
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay
              }
            }}
          >
            <FaCoins />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FallingCoinsAnimation; 