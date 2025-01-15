// Source: https://asgeirtj.github.io/js/autoplay2.js
// Version: 1.1

(function keepItAutoplayFriendly() {
  'use strict';
  
  // Check if device is mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  // Only proceed if mobile
  if (!isMobile) return;

  console.log(`Autoplay Helper started on: ${navigator.userAgent}`);

  // Helper function to simulate user interaction
  const simulateInteraction = () => {
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
})();
