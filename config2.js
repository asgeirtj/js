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

async function clickButtonByDataId(dataId) {
  const button = await waitForElement(`[data-element-id="${dataId}"]`);
  if (button) {
    button.click();
    console.log(`Clicked button: ${dataId}`);
    return true;
  }
  console.log(`Button not found: ${dataId}`);
  return false;
}

async function selectOption(optionText) {
  await waitForElement('[role="option"]');
  const options = Array.from(document.querySelectorAll('[role="option"]'));
  const option = options.find(opt => opt.textContent.includes(optionText));
  if (option) {
    option.click();
    console.log(`Selected option: ${optionText}`);
    return true;
  }
  console.log(`Option not found: ${optionText}`);
  return false;
}

async function clickButtonByText(text) {
  await waitForElement('button');
  const buttons = Array.from(document.querySelectorAll('button'));
  const button = buttons.find(b => b.textContent.trim() === text);
  if (button) {
    button.click();
    console.log(`Clicked button: ${text}`);
    return true;
  }
  console.log(`Button not found: ${text}`);
  return false;
}

async function openAIAgentsEditNova(agentName) {
  console.log(`Attempting to open AI agent: ${agentName}`);
  if (await clickButtonByDataId('search-shortcut-button')) {
    console.log('Clicked search shortcut button');
    if (await selectOption('Open AI Agents')) {
      console.log('Selected Open AI Agents option');
      await clickButtonByText('Open Model Settings');
      console.log('Clicked Open Model Settings');

      await waitForElement('[data-element-id="one-ai-character-block"]');
      const blocks = document.querySelectorAll('[data-element-id="one-ai-character-block"]');
      console.log(`Found ${blocks.length} AI character blocks`);

      blocks.forEach((block, index) => {
        console.log(`Block ${index + 1} text content: "${block.textContent.trim()}"`);
      });

      const targetBlock = Array.from(blocks).find(block => {
        const blockText = block.textContent.trim();
        return blockText.startsWith(agentName);  // Match beginning of block text
      });
      
      if (!targetBlock) {
        console.log(`Block not found for ${agentName}`);
        return;
      }

      console.log(`Found target block for ${agentName}: "${targetBlock.textContent.trim()}"`);
      const editButton = Array.from(targetBlock.querySelectorAll('button')).find(btn => 
btn.textContent.trim().toLowerCase() === 'edit'
);

      if (editButton) {
        editButton.click();
        console.log(`Edit button clicked for ${agentName}`);
      } else {
        console.log(`Edit button not found for ${agentName}`);
      }
    }
  }
}

function adjustModelMenu() {
  const modelMenu = document.querySelector('div[role="menu"] .py-2.max-h-\\[300px\\].overflow-auto');
  if (modelMenu) {
    modelMenu.style.maxHeight = '500px';
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
  const textareas = [
    document.querySelector('[data-element-id="ai-characters-system-instruction-input"]'),
  ];

  textareas.forEach(textarea => {
    if (textarea) {
      textarea.setAttribute('rows', '30');
    }
  });
}

function toggleVoiceInput() {
  const finishButton = Array.from(document.querySelectorAll('button'))
    .find(button => button.textContent.includes('Finish'));
  if (finishButton) {
    finishButton.click();
  } else {
    clickElementBySelector(`button[data-element-id="voice-input-button"].rounded-md.py-1.px-1.flex.items-center.justify-center.transition-all.space-x-2.shrink-0.text-gray-500.hover\\:text-gray-900.dark\\:hover\\:text-white`);
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
  const playButtons = document.querySelectorAll(`button[data-element-id="in-message-play-button"]`);
  if (playButtons.length > 0) {
    playButtons[playButtons.length - 1].click();
    console.log("Clicked the latest play button");
  } else {
    console.log("No play buttons found");
  }
}

function clickModelsButton() {
  clickSettingsAndPreferences(`button[data-element-id='settings-button'].cursor-default.bg-white\\/20`, "Models");
}

const menuObserver = new MutationObserver(adjustModelMenu);
menuObserver.observe(document.body, { childList: true, subtree: true });

document.addEventListener('keydown', function(event) {
  if (event.metaKey) {
    // New Chat Button
    if (event.key === 'k') {
      event.preventDefault();
      clickElementBySelector('button[data-element-id="new-chat-button-in-side-bar"]');
    }
    // Toggle Voice Input
    if (event.key === '1') {
      event.preventDefault();
      toggleVoiceInput();
    }
    // Settings Button and Preferences
    if (event.key === ',') {
      event.preventDefault();
      clickSettingsAndPreferences(`button[data-element-id='settings-button'].cursor-default.bg-white\\/20`, "Preferences");
    }
    // Regenerate Button
    if (event.key === 'R' && event.shiftKey) {
      event.preventDefault();
      clickElementBySelector(`button[data-element-id="regenerate-button"].inline-flex.items-center.justify-center.rounded-md.px-3.py-2.shadow-md.transition-all.group.font-semibold.text-xs.hover\\:scale-105.border.border-transparent.text-white.bg-blue-600.hover\\:bg-blue-500.active\\:bg-blue-600.dark\\:bg-blue-900.dark\\:hover\\:bg-blue-800`);
    }
    // Latest Play Button
    if (event.key === 'l') {
      event.preventDefault();
      clickLatestPlayButton();
    }
    // Open AI Agents Edit Nova
    if (event.key === 'e') {
      event.preventDefault();
      console.log('Cmd+E pressed, opening Nova');
      openAIAgentsEditNova("Nova");
    }
    // Open AI Agents Edit Nova huge instructions
    if (event.key === '2') {
      event.preventDefault();
      console.log('Cmd+2 pressed, opening Nova huge instructions');
      openAIAgentsEditNova("Nova huge instructions");
    }
    // Models Button
    if (event.key === 'j') {
      event.preventDefault();
      clickModelsButton();
    }
  }
  // Stop Button
  if (event.key === 'F2') {
    event.preventDefault();
    clickStopButton();
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

console.log('Enhanced script loaded with all functionalities including model menu height adjustment, keyboard shortcuts, new chat button (Cmd+K), toggle voice input (Cmd+1), stop button (F2), open AI Agents Edit Nova (Cmd+E), open AI Agents Edit Nova huge instructions (Cmd+2), click latest play button (Cmd+L), and click Models button (Cmd+J).');
