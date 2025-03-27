
/**
 * Split a name into an array of characters, filtering out spaces and special characters
 */
export const getCharacters = (name: string): string[] => {
  // Filter out spaces and special characters, convert to lowercase
  return name
    .toLowerCase()
    .split('')
    .filter(char => /[a-z]/.test(char));
};

/**
 * Check if a string is a valid name (contains at least one letter)
 */
export const isValidName = (name: string): boolean => {
  return getCharacters(name).length > 0;
};

/**
 * Create a random position for sparkle animations
 */
export const createRandomPosition = (): { top: string; left: string; delay: string; size: string } => {
  return {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    size: `${Math.random() * 10 + 5}px`
  };
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};
