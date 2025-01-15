// Source: https://asgeirtj.github.io/js/autoplay.js
// Version: 1.0

(function keepItAutoplayFriendly() {
  'use strict';
  
  // Check if device is mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  // Only proceed if mobile
  if (!isMobile) return;

  console.log('Mobile Autoplay Helper Initialized.');

  // Helper function to simulate user interaction
  const simulateInteraction = () => {
    console.log('Simulating user interaction...');
    document.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  };

  // Watch for when TTS audio is about to play
  const observeTTS = () => {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach((audio) => {
      if (!audio.hasAttribute('data-autoplay-helper')) {
        audio.setAttribute('data-autoplay-helper', 'true');

        // Trigger just before playback starts
        audio.addEventListener('play', () => {
          console.log('Audio is about to play. Ensuring interaction...');
          simulateInteraction();
        });
      }
    });
  };

  // Monitor for new audio elements
  const observer = new MutationObserver(() => {
    observeTTS();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Simulate interaction every 4 seconds to keep Safari "awake"
  setInterval(simulateInteraction, 4000);
})();
