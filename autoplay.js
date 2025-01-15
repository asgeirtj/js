// Source: https://asgeirtj.github.io/js/autoplay.js
// Version: 1.1
// Remember to increment version number when making changes

(function keepItAutoplayFriendly() {
  'use strict';
  
  console.log('Autoplay Helper started - Simulating user interaction every 4 seconds to prevent audio sleep/suspension');

  // Helper function to simulate user interaction
  const simulateInteraction = () => {
    document.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  };

  // Simulate interaction every 4 seconds to keep Safari "awake"
  setInterval(simulateInteraction, 4000);
})();
