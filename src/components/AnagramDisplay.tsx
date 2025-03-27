
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, RotateCcw, ArrowUp } from 'lucide-react';
import ActionButton from './ActionButton';
import { toast } from 'sonner';
import { copyToClipboard, createRandomPosition } from '@/utils/anagramUtils';

interface AnagramDisplayProps {
  anagram: string;
  onReset: () => void;
  onBack: () => void;
}

const AnagramDisplay: React.FC<AnagramDisplayProps> = ({ anagram, onReset, onBack }) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; position: ReturnType<typeof createRandomPosition> }>>([]);
  
  useEffect(() => {
    // Create initial sparkles
    const initialSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      position: createRandomPosition()
    }));
    setSparkles(initialSparkles);
    
    // Add new sparkles periodically
    const interval = setInterval(() => {
      setSparkles(prev => [
        ...prev.slice(-20), // Keep only the last 20 sparkles
        { id: Date.now(), position: createRandomPosition() }
      ]);
    }, 300);
    
    return () => clearInterval(interval);
  }, []);

  const handleCopy = async () => {
    const success = await copyToClipboard(anagram);
    if (success) {
      toast.success('Anagram copied to clipboard!');
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md flex flex-col items-center justify-center relative"
    >
      <div className="relative bg-white/20 backdrop-blur-md rounded-lg p-8 sm:p-12 w-full border border-white/40 overflow-hidden">
        {/* Sparkles */}
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            className="sparkle"
            style={{
              top: sparkle.position.top,
              left: sparkle.position.left,
              width: sparkle.position.size,
              height: sparkle.position.size,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2,
              delay: parseFloat(sparkle.position.delay),
              repeat: Infinity,
              repeatDelay: Math.random() * 3
            }}
          />
        ))}
        
        {/* Anagram Display */}
        <motion.div
          className="text-center relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold mb-6 text-rustic-text/90 tracking-wide"
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: { delay: 0.6, duration: 0.8 }
            }}
          >
            {anagram}
          </motion.h2>
          
          <motion.div
            className="text-sm text-rustic-muted mt-4"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 1, duration: 0.5 }
            }}
          >
            <p>Your new identity awaits</p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Action Buttons */}
      <motion.div 
        className="flex items-center justify-center gap-4 mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          transition: { delay: 1.2, duration: 0.5 }
        }}
      >
        <ActionButton variant="icon" onClick={handleCopy} aria-label="Copy anagram">
          <Copy size={18} />
        </ActionButton>
        
        <ActionButton variant="icon" onClick={onReset} aria-label="Try again">
          <RotateCcw size={18} />
        </ActionButton>
        
        <ActionButton variant="icon" onClick={onBack} aria-label="Go back">
          <ArrowUp size={18} />
        </ActionButton>
      </motion.div>
    </motion.div>
  );
};

export default AnagramDisplay;
