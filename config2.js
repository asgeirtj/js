function adjustModelMenu() {
  const modelMenu = document.querySelector('div[role="menu"] .py-2.max-h-\\[300px\\].overflow-auto');
  if (modelMenu) {
    modelMenu.style.maxHeight = '500px';
  }
}

function clickModelSettings() {
  const modelDropdownButton = document.querySelector('button[id^="headlessui-menu-button-"]');
  if (modelDropdownButton) {
    modelDropdownButton.click();
    
    setTimeout(() => {
      const modelSettingsButton = document.querySelector('button:has(span:contains("Model Settings (Current Chat)"))');
      
      if (modelSettingsButton) {
        modelSettingsButton.click();
      } else {
        const manageModelsButton = document.querySelector('button:contains("Manage Models")');
        if (manageModelsButton) {
          manageModelsButton.click();
        } else {
          console.log("Manage Models button not found");
        }
      }
      
      const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
          if (mutation.type === 'childList') {
            adjustModelMenu();
            observer.disconnect();
          }
        }
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
    }, 100);
  } else {
    console.log("Model dropdown button not found");
  }
}

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
        obs.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    setTimeout(() => observer.disconnect(), 1000);
  }
}

function setTextareaRows() {
  const textarea = document.querySelector('[data-element-id="ai-characters-system-instruction-input"]');
  if (textarea) {
    textarea.setAttribute('rows', '30');
  }
}

function toggleVoiceInput() {
  const finishButton = Array.from(document.querySelectorAll('button'))
    .find(button => button.textContent.includes('Finish'));
  
  if (finishButton) {
    finishButton.click();
  } else {
    const voiceButton = document.querySelector('button[data-element-id="voice-input-button"]');
    if (voiceButton) {
      voiceButton.click();
    } else {
      console.log("Voice input button not found");
    }
  }
}

const menuObserver = new MutationObserver(adjustModelMenu);
menuObserver.observe(document.body, { childList: true, subtree: true });

document.addEventListener('keydown', function(event) {
  if (event.metaKey) {
    // New Chat Button
    if (event.key === 'k') {
      event.preventDefault();
      clickElementBySelector(`button[data-element-id="new-chat-button-in-side-bar"].jsx-2562846439`);
    }
    // Toggle Voice Input
    if (event.key === '1' || event.key === '3') {
      event.preventDefault();
      toggleVoiceInput();
    }
    // Settings Button and Preferences
    if (event.key === ',') {
      event.preventDefault();
      clickSettingsAndPreferences(`button[data-element-id='settings-button'].cursor-default.bg-white\\/20`, "Preferences");
    }
    // Model Settings Menu Button and Menu Item
    if (event.key === '.') {
      event.preventDefault();
      clickModelSettings();
    }
    // Regenerate Button
    if (event.key === 'R' && event.shiftKey) {
      event.preventDefault();
      clickElementBySelector(`button[data-element-id="regenerate-button"].inline-flex.items-center.justify-center.rounded-md.px-3.py-2.shadow-md.transition-all.group.font-semibold.text-xs.hover\\:scale-105.border.border-transparent.text-white.bg-blue-600.hover\\:bg-blue-500.active\\:bg-blue-600.dark\\:bg-blue-900.dark\\:hover\\:bg-blue-800`);
    }
  }
});

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

console.log('Enhanced script loaded with all functionalities including model menu height adjustment, keyboard shortcuts, and voice input toggle.');
