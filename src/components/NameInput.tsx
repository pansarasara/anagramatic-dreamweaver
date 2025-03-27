
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import ActionButton from './ActionButton';
import { toast } from '@/components/ui/sonner';
import { isValidName } from '@/utils/anagramUtils';
import { motion } from 'framer-motion';

interface NameInputProps {
  onNameSubmit: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidName(name)) {
      toast.error('Please enter a valid name with at least one letter');
      return;
    }
    
    onNameSubmit(name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label 
            htmlFor="name-input" 
            className="block text-sm font-medium text-rustic-text/80"
          >
            Enter your name
          </label>
          <div className={`relative transition-all duration-300 ${isFocused ? 'transform -translate-y-1' : ''}`}>
            <Input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="bg-white/90 backdrop-blur-sm border-rustic-muted/30 py-6 px-4 text-lg focus:ring-rustic-accent/30 transition-all duration-300"
              placeholder="Your name here..."
              autoComplete="off"
            />
            {isFocused && (
              <div className="absolute inset-0 -z-10 blur-xl bg-rustic-accent/10 rounded-lg" />
            )}
          </div>
        </div>
        
        <ActionButton 
          type="submit" 
          className="w-full py-3 text-base"
        >
          Set as Base Name
        </ActionButton>
      </form>
    </motion.div>
  );
};

export default NameInput;
