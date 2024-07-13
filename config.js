document.addEventListener('keydown', function(event) {
  // Check if the Cmd key is pressed (Mac only)
  if (event.metaKey) {
    // For cmd+K
    if (event.key === 'k') {
      event.preventDefault();
      const newChatButton = document.querySelector('[data-element-id="new-chat-button-in-side-bar"]');
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

    // For cmd+. (dot)
    if (event.key === '.') {
      event.preventDefault();
      clickModelSettings();
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
  }
});

function clickModelSettings() {
  const modelSettingsButton = document.querySelector('div[role="menuitem"] div.truncate:contains("Model Settings (Current Chat)")');
  
  if (modelSettingsButton) {
    console.log('Model Settings button found, clicking');
    const menuItem = modelSettingsButton.closest('[role="menuitem"]');
    if (menuItem) {
      menuItem.click();
    } else {
      console.log('Parent menuitem not found');
    }
  } else {
    console.log('Model Settings button not found');
  }
}

function increaseSubmenuHeight(submenu) {
  if (submenu) {
    submenu.style.maxHeight = '80vh';
    submenu.style.overflowY = 'auto';
  }
}

function contains(selector, text) {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).find(element => element.textContent.includes(text));
}

Document.prototype.querySelector = function(selector) {
  if (selector.includes(':contains(')) {
    const [actualSelector, text] = selector.split(':contains(');
    return contains(actualSelector, text.slice(0, -1));
  }
  return Document.prototype.querySelector.call(this, selector);
};

function setTextareaRows() {
  const textarea = document.querySelector('[data-element-id="ai-characters-system-instruction-input"]');
  if (textarea) {
    textarea.setAttribute('rows', '30');
  }
}

setTextareaRows();

const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      setTextareaRows();
      const addedNodes = mutation.addedNodes;
      for (let node of addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const submenu = node.querySelector('[role="menu"][data-headlessui-state="open"]');
          if (submenu) {
            increaseSubmenuHeight(submenu);
          }
        }
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('Combined script loaded with all functionalities and automatic submenu height increase');
