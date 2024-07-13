// Function to adjust the menu height
function adjustMenuHeight(newHeight) {
  const menuContainer = document.querySelector('nav[class*="jsx-2562846439"]');
  if (menuContainer) {
    menuContainer.style.maxHeight = `${newHeight}px`;
    menuContainer.style.overflowY = 'auto';
  } else {
    console.error('Menu container not found');
  }
}

// Function to create a control panel for menu height
function createControlPanel() {
  const panel = document.createElement('div');
  panel.style.position = 'fixed';
  panel.style.top = '10px';
  panel.style.right = '10px';
  panel.style.zIndex = '9999';
  panel.style.background = 'white';
  panel.style.padding = '10px';
  panel.style.border = '1px solid black';

  const input = document.createElement('input');
  input.type = 'number';
  input.value = '500';  // Default height set to 500px
  input.style.width = '60px';

  const button = document.createElement('button');
  button.textContent = 'Adjust Height';
  button.onclick = () => adjustMenuHeight(input.value);

  panel.appendChild(input);
  panel.appendChild(button);
  document.body.appendChild(panel);
}

// Function to click elements by selector
function clickElementBySelector(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.click();
  } else {
    console.log(`Element with selector ${selector} not found`);
  }
}

// Function to click settings and preferences
function clickSettingsAndPreferences(settingsButtonSelector, preferencesText) {
  const settingsButton = document.querySelector(settingsButtonSelector);
  if (settingsButton) {
    settingsButton.click();
    const observer = new MutationObserver((mutations, obs) => {
      const preferencesOption = Array.from(document.querySelectorAll('button'))
        .find(el => el.textContent.trim() === preferencesText);
      
      if (preferencesOption) {
        preferencesOption.click();
        obs.disconnect(); // Stop observing
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    setTimeout(() => observer.disconnect(), 1000);
  }
}

// Function to click model settings
function clickModelSettings(menuButtonSelector, modelSettingsText) {
  const modelSettingsMenuButton = document.querySelector(menuButtonSelector);
  if (modelSettingsMenuButton) {
    modelSettingsMenuButton.click();
    const observer = new MutationObserver((mutations, obs) => {
      const modelSettingsOption = Array.from(document.querySelectorAll('span.truncate'))
        .find(el => el.textContent.trim() === modelSettingsText);
      
      if (modelSettingsOption) {
        modelSettingsOption.click();
        obs.disconnect(); // Stop observing
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    setTimeout(() => observer.disconnect(), 1000);
  }
}

// Function to set textarea rows
function setTextareaRows() {
  const textarea = document.querySelector('[data-element-id="ai-characters-system-instruction-input"]');
  if (textarea) {
    textarea.setAttribute('rows', '30');
  }
}

// Event listener for keyboard shortcuts
document.addEventListener('keydown', function(event) {
  if (event.metaKey) {
    // New Chat Button
    if (event.key === 'k') {
      event.preventDefault();
      clickElementBySelector(`button[data-element-id="new-chat-button-in-side-bar"].jsx-2562846439`);
    }
    // Voice Input Button
    if (event.key === '3') {
      event.preventDefault();
      clickElementBySelector(`button[data-element-id="voice-input-button"].rounded-md.py-1.px-1.flex.items-center.justify-center.transition-all.space-x-2.shrink-0.text-gray-500.hover\\:text-gray-900.dark\\:hover\\:text-white`);
    }
    // Settings Button and Preferences
    if (event.key === ',') {
      event.preventDefault();
      clickSettingsAndPreferences(`button[data-element-id='settings-button'].cursor-default.bg-white\\/20`, "Preferences");
    }
    // Model Settings Menu Button and Menu Item
    if (event.key === '.') {
      event.preventDefault();
      clickModelSettings(`button[id^="headlessui-menu-button-"]`, "Model Settings (Current Chat)");
    }
    // Regenerate Button
    if (event.key === 'R' && event.shiftKey) {
      event.preventDefault();
      clickElementBySelector(`button[data-element-id="regenerate-button"]`);
    }
  }
});

// Set textarea rows and observe for changes
setTextareaRows();
const textareaObserver = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      setTextareaRows();
    }
  }
});
textareaObserver.observe(document.body, {
  childList: true,
  subtree: true
});

// Initialize menu height adjustment
createControlPanel();
adjustMenuHeight(500);  // Set initial height to 500px

console.log('Enhanced script loaded with all functionalities including menu height adjustment and setting textarea rows.');
