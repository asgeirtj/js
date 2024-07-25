// Function to wait for an element to appear
function waitForElement(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// Function to click settings button and manage plugins option
async function clickManagePluginsButton() {
  console.log('Cmd+O pressed, opening Manage Plugins');

  // Click the dropdown button to open the menu
  await clickElementBySelector('button#headlessui-menu-button-\\:rg\\:');

  // Wait for the menu to appear and click the "Manage Plugins" option
  waitForElement('div.truncate:contains("Manage Plugins")')
    .then(button => {
      button.click();
      console.log("Clicked Manage Plugins button");
    })
    .catch(() => console.log("Manage Plugins button not found"));
}

// Supporting function to click an element by selector
function clickElementBySelector(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.click();
    return true;
  } else {
    console.log(`Element with selector ${selector} not found`);
    return false;
  }
}

// Observer to adjust model menu height
const menuObserver = new MutationObserver(() => {
  const modelMenu = document.querySelector('div[role="menu"] .py-2.max-h-\\[300px\\].overflow-auto');
  if (modelMenu) {
    modelMenu.style.maxHeight = '500px';
  }
});
menuObserver.observe(document.body, { childList: true, subtree: true });

// Event listener for keyboard shortcuts
document.addEventListener('keydown', function(event) {
  if (event.metaKey) {
    switch(event.key) {
      case 'k':
        event.preventDefault();
        clickElementBySelector('button[data-element-id="new-chat-button-in-side-bar"]');
        break;
      case '1':
        event.preventDefault();
        toggleVoiceInput();
        break;
      case ',':
        event.preventDefault();
        clickSettingsAndPreferences('button[data-element-id="settings-button"].cursor-default.bg-white\\/20', "Preferences");
        break;
      case 'R':
        if (event.shiftKey) {
          event.preventDefault();
          clickElementBySelector('button[data-element-id="regenerate-button"].inline-flex.items-center.justify-center.rounded-md.px-3.py-2.shadow-md.transition-all.group.font-semibold.text-xs.hover\\:scale-105.border.border-transparent.text-white.bg-blue-600.hover\\:bg-blue-500.active\\:bg-blue-600.dark\\:bg-blue-900.dark\\:hover\\:bg-blue-800');
        }
        break;
      case 'l':
        event.preventDefault();
        clickLatestPlayButton();
        break;
      case 'j':
        event.preventDefault();
        clickSettingsAndPreferences('button[data-element-id="settings-button"].cursor-default.bg-white\\/20', "Models");
        break;
      case 'o':
        event.preventDefault();
        clickManagePluginsButton();
        break;
      default:
        break;
    }
  }
  if (event.key === 'F2') {
    event.preventDefault();
    clickStopButton();
  }
});

// Set text area rows
function setTextareaRows() {
  const textareas = [
    document.querySelector('[data-element-id="ai-characters-system-instruction-input"]'),
  ];

  textareas.forEach(textarea => {
    if (textarea) {
      textarea.setAttribute('rows', '30');
    }
  });
}
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

console.log('Enhanced script loaded with all functionalities including model menu height adjustment, keyboard shortcuts, new chat button (Cmd+K), toggle voice input (Cmd+1), stop button (F2), click latest play button (Cmd+L), click Models button (Cmd+J), and manage plugins button (Cmd+O).');

// Supporting functions used in the script
function clickSettingsAndPreferences(settingsButtonSelector, preferencesText) {
  const settingsButton = document.querySelector(settingsButtonSelector);
  if (settingsButton) {
    settingsButton.click();
    const observer = new MutationObserver((mutations, obs) => {
      const preferencesOption = Array.from(document.querySelectorAll('button, div[role="menuitem"]'))
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

function toggleVoiceInput() {
  const finishButton = Array.from(document.querySelectorAll('button'))
    .find(button => button.textContent.includes('Finish'));
  if (finishButton) {
    finishButton.click();
  } else {
    clickElementBySelector('button[data-element-id="voice-input-button"].rounded-md.py-1.px-1.flex.items-center.justify-center.transition-all.space-x-2.shrink-0.text-gray-500.hover\\:text-gray-900.dark\\:hover\\:text-white');
  }
}

function clickStopButton() {
  const stopButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === "Stop");
  if (stopButton) {
    stopButton.click();
  } else {
    console.log("Stop button not found");
  }
}

function clickLatestPlayButton() {
  const playButtons = document.querySelectorAll('button[data-element-id="in-message-play-button"]');
  if (playButtons.length > 0) {
    playButtons[playButtons.length - 1].click();
    console.log("Clicked the latest play button");
  } else {
    console.log("No play buttons found");
  }
}
