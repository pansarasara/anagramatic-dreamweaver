
document.addEventListener('DOMContentLoaded', () => {
  // Application states
  const appStates = {
    INPUT: 'input',
    SELECTING: 'selecting',
    RESULT: 'result'
  };
  
  // DOM elements
  const sections = {
    input: document.getElementById('input-section'),
    selection: document.getElementById('selection-section'),
    result: document.getElementById('result-section')
  };
  
  const elements = {
    nameForm: document.getElementById('name-form'),
    nameInput: document.getElementById('name-input'),
    baseName: document.getElementById('base-name'),
    currentAnagram: document.getElementById('current-anagram'),
    lettersContainer: document.getElementById('letters-container'),
    createAnagramContainer: document.getElementById('create-anagram-container'),
    createAnagramBtn: document.getElementById('create-anagram-btn'),
    finalAnagram: document.getElementById('final-anagram'),
    copyBtn: document.getElementById('copy-btn'),
    backBtn: document.getElementById('back-btn'),
    resetBtn: document.getElementById('reset-btn')
  };
  
  // Application state variables
  let currentState = appStates.INPUT;
  let baseName = '';
  let availableLetters = [];
  let selectedLetters = [];
  
  // Initialize the application
  function init() {
    bindEvents();
    setAppState(appStates.INPUT);
  }
  
  // Bind all event listeners
  function bindEvents() {
    // Form submission
    elements.nameForm.addEventListener('submit', handleNameSubmit);
    
    // Button clicks
    elements.createAnagramBtn.addEventListener('click', handleCreateAnagram);
    elements.copyBtn.addEventListener('click', handleCopyAnagram);
    elements.backBtn.addEventListener('click', handleBack);
    elements.resetBtn.addEventListener('click', handleReset);
  }
  
  // Set application state
  function setAppState(state) {
    currentState = state;
    
    // Hide all sections first
    Object.values(sections).forEach(section => {
      section.classList.add('hidden');
    });
    
    // Show the active section
    switch (state) {
      case appStates.INPUT:
        sections.input.classList.remove('hidden');
        sections.input.classList.add('fade-in');
        break;
      case appStates.SELECTING:
        sections.selection.classList.remove('hidden');
        sections.selection.classList.add('fade-in');
        break;
      case appStates.RESULT:
        sections.result.classList.remove('hidden');
        sections.result.classList.add('fade-in');
        break;
    }
  }
  
  // Handle name form submission
  function handleNameSubmit(e) {
    e.preventDefault();
    const name = elements.nameInput.value.trim();
    
    if (name && isValidName(name)) {
      baseName = name;
      availableLetters = getCharacters(name);
      selectedLetters = [];
      
      // Update UI
      elements.baseName.textContent = baseName;
      renderLetterButtons();
      updateCurrentAnagram();
      
      // Switch to selecting state
      setAppState(appStates.SELECTING);
    } else {
      alert('Please enter a valid name with at least one letter.');
    }
  }
  
  // Render letter buttons for selection
  function renderLetterButtons() {
    elements.lettersContainer.innerHTML = '';
    
    // Add a space button first
    const spaceButton = document.createElement('button');
    spaceButton.className = 'letter-btn space-btn';
    spaceButton.textContent = '␣';
    spaceButton.dataset.letter = ' ';
    spaceButton.title = 'Add a space';
    spaceButton.addEventListener('click', () => handleSpaceSelect(spaceButton));
    elements.lettersContainer.appendChild(spaceButton);
    
    // Then add letter buttons
    availableLetters.forEach((letter, index) => {
      const button = document.createElement('button');
      button.className = 'letter-btn';
      button.textContent = letter.toUpperCase();
      button.dataset.letter = letter;
      button.dataset.index = index;
      
      // Add animation delay for staggered appearance
      button.style.animationDelay = `${index * 0.05}s`;
      
      button.addEventListener('click', () => handleLetterSelect(letter, button));
      
      elements.lettersContainer.appendChild(button);
    });
  }
  
  // Handle letter selection
  function handleLetterSelect(letter, buttonElement) {
    // Remove letter from available letters
    const index = availableLetters.indexOf(letter);
    if (index > -1) {
      availableLetters.splice(index, 1);
    }
    
    // Add letter to selected letters
    selectedLetters.push(letter);
    
    // Remove the button
    buttonElement.remove();
    
    // Update anagram display
    updateCurrentAnagram();
    
    // Check if all letters are used
    if (availableLetters.length === 0) {
      elements.createAnagramContainer.classList.remove('hidden');
    }
  }
  
  // Handle space selection (without removing the button)
  function handleSpaceSelect(buttonElement) {
    // Add space to selected letters
    selectedLetters.push(' ');
    
    // Update anagram display
    updateCurrentAnagram();
    
    // Highlight button briefly to give feedback
    buttonElement.classList.add('letter-active');
    setTimeout(() => {
      buttonElement.classList.remove('letter-active');
    }, 200);
  }
  
  // Update the current anagram display
  function updateCurrentAnagram() {
    if (selectedLetters.length > 0) {
      elements.currentAnagram.innerHTML = selectedLetters.join('');
    } else {
      elements.currentAnagram.innerHTML = '<span class="placeholder">Select letters below</span>';
    }
  }
  
  // Handle create anagram button click
  function handleCreateAnagram() {
    const finalAnagram = selectedLetters.join('');
    elements.finalAnagram.textContent = finalAnagram;
    setAppState(appStates.RESULT);
  }
  
  // Handle copy anagram button click
  function handleCopyAnagram() {
    const text = elements.finalAnagram.textContent;
    copyToClipboard(text).then(success => {
      if (success) {
        // Show temporary success message
        const originalText = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = '<span>Copied!</span>';
        
        setTimeout(() => {
          elements.copyBtn.innerHTML = originalText;
        }, 2000);
      }
    });
  }
  
  // Handle back button click
  function handleBack() {
    // Reset letters to original state
    availableLetters = getCharacters(baseName);
    selectedLetters = [];
    
    // Update UI
    renderLetterButtons();
    updateCurrentAnagram();
    elements.createAnagramContainer.classList.add('hidden');
    
    // Switch back to selecting state
    setAppState(appStates.SELECTING);
  }
  
  // Handle reset button click
  function handleReset() {
    // Reset all state variables
    baseName = '';
    availableLetters = [];
    selectedLetters = [];
    
    // Clear form
    elements.nameInput.value = '';
    
    // Switch back to input state
    setAppState(appStates.INPUT);
  }
  
  // Utility functions
  
  // Get characters from name
  function getCharacters(name) {
    return name
      .toLowerCase()
      .split('')
      .filter(char => /[a-z]/.test(char));
  }
  
  // Check if name is valid
  function isValidName(name) {
    return getCharacters(name).length > 0;
  }
  
  // Copy text to clipboard
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  }
  
  // Add sparkle effect
  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Random size between 5px and 15px
    const size = Math.random() * 10 + 5;
    
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }
  
  // Initialize the app
  init();
});
