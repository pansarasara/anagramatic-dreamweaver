
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NameInput from '@/components/NameInput';
import LetterButton from '@/components/LetterButton';
import ActionButton from '@/components/ActionButton';
import AnagramDisplay from '@/components/AnagramDisplay';
import { getCharacters } from '@/utils/anagramUtils';

// Define application states
type AppState = 'INPUT' | 'SELECTING' | 'RESULT';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('INPUT');
  const [baseName, setBaseName] = useState<string>('');
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [finalAnagram, setFinalAnagram] = useState<string>('');
  
  // Handle the name submission
  const handleNameSubmit = (name: string) => {
    const chars = getCharacters(name);
    setBaseName(name);
    setAvailableLetters(chars);
    setSelectedLetters([]);
    setAppState('SELECTING');
  };
  
  // Handle letter selection
  const handleLetterSelect = (letter: string) => {
    // Remove letter from available letters
    const newAvailable = [...availableLetters];
    const index = newAvailable.indexOf(letter);
    if (index > -1) {
      newAvailable.splice(index, 1);
    }
    
    // Add letter to selected letters
    setSelectedLetters([...selectedLetters, letter]);
    setAvailableLetters(newAvailable);
  };
  
  // Handle creating the anagram
  const handleCreateAnagram = () => {
    setFinalAnagram(selectedLetters.join(''));
    setAppState('RESULT');
  };
  
  // Handle reset button
  const handleReset = () => {
    setBaseName('');
    setAvailableLetters([]);
    setSelectedLetters([]);
    setFinalAnagram('');
    setAppState('INPUT');
  };
  
  // Handle back button
  const handleBack = () => {
    setAppState('SELECTING');
    // Reset the letters to original state
    const chars = getCharacters(baseName);
    setAvailableLetters(chars);
    setSelectedLetters([]);
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-rustic-text tracking-tight mb-3">
          Anagramatic
        </h1>
        <p className="text-rustic-muted max-w-md mx-auto text-sm sm:text-base">
          Transform your name into something extraordinary
        </p>
      </motion.header>
      
      <main className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {appState === 'INPUT' && (
            <NameInput onNameSubmit={handleNameSubmit} key="name-input" />
          )}
          
          {appState === 'SELECTING' && (
            <motion.div
              key="selecting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-rustic-muted/20 mb-8 w-full max-w-md">
                <h2 className="text-lg font-medium mb-2">Base name:</h2>
                <p className="text-2xl font-serif">{baseName}</p>
                
                <div className="mt-6 mb-2">
                  <h3 className="text-sm text-rustic-muted">Your anagram:</h3>
                  <div className="min-h-12 bg-rustic-paper/50 rounded-md p-3 mt-1 text-xl tracking-wide border border-rustic-muted/10">
                    {selectedLetters.length > 0 
                      ? selectedLetters.join('') 
                      : <span className="text-rustic-muted/50 text-sm">Select letters below</span>
                    }
                  </div>
                </div>
              </div>
              
              {/* Letter Selection */}
              <div className="flex flex-wrap justify-center gap-1 mb-8 max-w-lg">
                {availableLetters.map((letter, index) => (
                  <LetterButton 
                    key={`${letter}-${index}`}
                    letter={letter}
                    onClick={handleLetterSelect}
                  />
                ))}
              </div>
              
              {/* Create Anagram Button - Only show when all letters are used */}
              {availableLetters.length === 0 && selectedLetters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <ActionButton onClick={handleCreateAnagram} className="text-lg py-3 px-10">
                    Create Anagram
                  </ActionButton>
                </motion.div>
              )}
            </motion.div>
          )}
          
          {appState === 'RESULT' && (
            <AnagramDisplay 
              anagram={finalAnagram} 
              onReset={handleReset} 
              onBack={handleBack} 
              key="result"
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
