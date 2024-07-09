document.addEventListener('keydown', function(event) {
  // Check if it's cmd+K (Mac only)
  if (event.metaKey && event.key === 'k') {
    // Prevent the default action
    event.preventDefault();
    
    // Find the element with the specified data attribute
    const newChatButton = document.querySelector('[data-element-id="new-chat-button"]');
    
    // If the element exists, click it
    if (newChatButton) {
      newChatButton.click();
    }
  }
});
