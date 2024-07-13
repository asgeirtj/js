// Function to increase the height of the submenu
function increaseSubmenuHeight() {
  const submenu = document.querySelector('#headlessui-menu-items-r10');
  if (submenu) {
    submenu.style.height = '400px';  // Double the height or set to your preferred value
    console.log('Submenu height increased');
  } else {
    console.log('Submenu not found');
  }
}

// Function to increase the height of the textarea
function increaseTextareaHeight() {
  const textarea = document.querySelector('[data-element-id="ai-characters-system-instruction-input"]');
  if (textarea) {
    textarea.style.height = '300px';  // Triple the height or set to your preferred value
    console.log('Textarea height increased');
  } else {
    console.log('Textarea not found');
  }
}

// Function to handle hotkeys
function handleHotkeys(event) {
  console.log('Key pressed:', event.key, 'Meta key:', event.metaKey);

  // Check if the Cmd key is pressed (Mac only)
  if (event.metaKey) {
    // For cmd+,
    if (event.key === ',') {
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

    // For cmd+K
    if (event.key === 'k') {
      console.log('Cmd+K detected');
      event.preventDefault();
      const newChatButton = document.querySelector('[data-element-id="new-chat-button-in-side-bar"]');
      if (newChatButton) {
        console.log('New Chat button found, clicking');
        newChatButton.click();
      } else {
        console.log('New Chat button not found');
      }
    }

    // For cmd+3
    if (event.key === '3') {
      console.log('Cmd+3 detected');
      event.preventDefault();
      const voiceInputButton = document.querySelector('[data-element-id="voice-input-button"]');
      if (voiceInputButton) {
        console.log('Voice Input button found, clicking');
        voiceInputButton.click();
      } else {
        console.log('Voice Input button not found');
      }
    }

    // For cmd+shift+R
    if (event.key === 'R' && event.shiftKey) {
      console.log('Cmd+Shift+R detected');
      event.preventDefault();
      const regenerateButton = document.querySelector('[data-element-id="regenerate-button"]');
      if (regenerateButton) {
        console.log('Regenerate button found, clicking');
        regenerateButton.click();
      } else {
        console.log('Regenerate button not found');
      }
    }

    // For cmd+.
    if (event.key === '.' && !event.shiftKey) {
      console.log('Cmd+. detected');
      event.preventDefault();

      // Open the submenu if it's not already open
      const submenuButton = document.querySelector('[aria-controls="headlessui-menu-items-r10"]');
      if (submenuButton && submenuButton.getAttribute('aria-expanded') !== 'true') {
        submenuButton.click();
      }

      // Wait for the submenu to open
      setTimeout(() => {
        // Find and click the "Model Settings (Current Chat)" option
        const modelSettingsOption = document.querySelector('#headlessui-menu-item\\:rm9');
        if (modelSettingsOption) {
          console.log('Model Settings (Current Chat) option found, clicking');
          modelSettingsOption.click();
        } else {
          console.log('Model Settings (Current Chat) option not found in menu');
        }
      }, 100); // Adjust this timeout if needed
    }
  }
}

// Run the functions and add event listener when the document is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
  increaseSubmenuHeight();
  increaseTextareaHeight();
  document.addEventListener('keydown', handleHotkeys);
  console.log('Height adjustments applied and hotkeys enabled');
});
