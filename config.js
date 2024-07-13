document.addEventListener('keydown', function(event) {
  if (event.metaKey) {
    if (event.key === 'k') {
      event.preventDefault();
      const newChatButton = document.querySelector('[data-element-id="new-chat-button-in-side-bar"]');
      if (newChatButton) newChatButton.click();
    }
    
    if (event.key === '3') {
      event.preventDefault();
      const voiceInputButton = document.querySelector('[data-element-id="voice-input-button"]');
      if (voiceInputButton) voiceInputButton.click();
    }

    if (event.key === '.') {
      event.preventDefault();
      clickModelSettings();
    }

    if (event.key === 'R' && event.shiftKey) {
      event.preventDefault();
      const regenerateButton = document.querySelector('[data-element-id="regenerate-button"]');
      if (regenerateButton) regenerateButton.click();
    }
  }
});

function clickModelSettings() {
  const modelSettingsButton = Array.from(document.querySelectorAll('div[role="menuitem"] div.truncate'))
    .find(el => el.textContent.includes("Model Settings (Current Chat)"));
  
  if (modelSettingsButton) {
    const menuItem = modelSettingsButton.closest('[role="menuitem"]');
    if (menuItem) menuItem.click();
  }
}

function increaseSubmenuHeight(submenu) {
  if (submenu) {
    submenu.style.maxHeight = '80vh';
    submenu.style.overflowY = 'auto';
  }
}

function setTextareaRows() {
  const textarea = document.querySelector('[data-element-id="ai-characters-system-instruction-input"]');
  if (textarea) textarea.setAttribute('rows', '30');
}

setTextareaRows();

const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      setTextareaRows();
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const submenu = node.querySelector('[role="menu"][data-headlessui-state="open"]');
          if (submenu) increaseSubmenuHeight(submenu);
        }
      });
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

console.log('Improved script loaded with all functionalities and automatic submenu height increase');
