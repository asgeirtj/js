// Source: https://asgeirtj.github.io/js/autoplay2.js
// Version: 1.3

(function keepItAutoplayFriendly() {
  'use strict';

  console.log('Autoplay Helper started');

  // Remove specific button element
  document.querySelector('button.w-full.focus\\:text-white.focus\\:outline-0.inline-flex.items-start.justify-start.flex-col.md\\:h-\\[50px\\].h-12.cursor-default.aspect-square.sm\\:aspect-auto.\\@\\[500px\\]\\:min-w-0.min-w-\\[58px\\]:nth-of-type(6)').style.display = 'none';

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
