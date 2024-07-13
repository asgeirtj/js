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
      clickModelSettings(`button#headlessui-menu-button-:rk8:.inline-flex.items-center.justify-center.gap-2.p-2.rounded-md.hover\\:bg-black\\/5.active\\:bg-black\\/10`, "Model Settings (Current Chat)");
    }
    // Regenerate Button
    if (event.key === 'R' && event.shiftKey) {
      event.preventDefault();
      clickElementBySelector(`button[data-element-id="regenerate-button"].inline-flex.items-center.justify-center.rounded-md.px-3.py-2.shadow-md.transition-all.group.font-semibold.text-xs.hover\\:scale-105.border.border-transparent.text-white.bg-blue-600.hover\\:bg-blue-500.active\\:bg-blue-600.dark\\:bg-blue-900.dark\\:hover\\:bg-blue-800`);
    }
  }
});

function clickElementBySelector(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.click();
  } else {
    console.log(`Element with selector ${selector} not found`);
  }
}

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

function clickModelSettings(menuButtonSelector, modelSettingsText) {
  const modelSettingsMenuButton = document.querySelector(menuButtonSelector);
  if (modelSettingsMenuButton) {
    modelSettingsMenuButton.click();
    const observer = new MutationObserver((mutations, obs) => {
      const modelSettingsOption = Array.from(document.querySelectorAll('span.truncate'))
        .find(el => el.textContent.trim() === modelSettingsText);
      
      if (modelSettingsOption) {
        modelSettingsOption.click();
        adjustSpecificElementHeight(); // Adjust height after clicking
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

function adjustSpecificElementHeight() {
  const specificElement = document.querySelector('div.py-2.max-h-\\[300px\\].overflow-auto[role="none"]');
  if (specificElement) {
    specificElement.style.maxHeight = '500px';
  } else {
    console.log('Specific element for height adjustment not found');
  }
}

function setTextareaRows() {
  const textarea = document.querySelector('[data-element-id="ai-characters-system-instruction-input"]');
  if (textarea) {
    textarea.setAttribute('rows', '30');
  }
}

setTextareaRows();
adjustSpecificElementHeight(); // Initial height adjustment

const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      setTextareaRows();
      adjustSpecificElementHeight(); // Ensure the height adjustment is applied dynamically
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('Updated script loaded with all functionalities including specific element height adjustment to 500px.');
