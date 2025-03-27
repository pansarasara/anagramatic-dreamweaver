
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LetterButtonProps {
  letter: string;
  onClick: (letter: string) => void;
  disabled?: boolean;
}

const LetterButton: React.FC<LetterButtonProps> = ({ letter, onClick, disabled = false }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const handleClick = () => {
    if (!disabled) {
      onClick(letter);
    }
  };

  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'letter-btn w-12 h-12 sm:w-14 sm:h-14 m-1 text-lg sm:text-xl font-medium',
        isHovering ? 'bg-rustic-accent/10' : 'bg-white/80',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      )}
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {letter.toUpperCase()}
      {isHovering && !disabled && (
        <div className="absolute inset-0 overflow-hidden rounded-md">
          <div className="shimmer-effect w-full h-full" />
        </div>
      )}
    </motion.button>
  );
};

export default LetterButton;
