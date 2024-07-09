document.addEventListener('keydown', function(event) {
  // Check if the Cmd key is pressed (Mac only)
  if (event.metaKey) {
    // For cmd+K
    if (event.key === 'k') {
      event.preventDefault();
      const newChatButton = document.querySelector('[data-element-id="new-chat-button"]');
      if (newChatButton) {
        newChatButton.click();
      }
    }
    
    // For cmd+3
    if (event.key === '3') {
      event.preventDefault();
      const voiceInputButton = document.querySelector('[data-element-id="voice-input-button"]');
      if (voiceInputButton) {
        voiceInputButton.click();
      }
    }
  }
});
