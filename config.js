document.addEventListener('keydown', function(event) {
  console.log('Key pressed:', event.key, 'Meta key:', event.metaKey);
  
  if (event.metaKey && event.key === ',') {
    console.log('Cmd+, detected');
    event.preventDefault();
    
    // Find and click the settings button (hamburger menu)
    const settingsButton = document.querySelector('[data-element-id="settings-button"]');
    if (settingsButton) {
      console.log('Settings button found, clicking');
      settingsButton.click();
      
      // Wait for the menu to open (adjust timeout if needed)
      setTimeout(() => {
        // Find and click the preferences option in the menu
        const preferencesOption = Array.from(document.querySelectorAll('button'))
          .find(el => el.textContent.trim() === 'Preferences');
        
        if (preferencesOption) {
          console.log('Preferences option found, clicking');
          preferencesOption.click();
        } else {
          console.log('Preferences option not found in menu');
        }
      }, 100); // Adjust this timeout if needed
    } else {
      console.log('Settings button not found');
    }
  }
});

console.log('Config.js loaded and event listener attached');
