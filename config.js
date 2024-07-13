document.addEventListener('keydown', function(event) {
  if (event.metaKey) {
    if (event.key === 'k') {
      event.preventDefault();
      clickElementById("new-chat-button-in-side-bar");
    }
    
    if (event.key === '3') {
      event.preventDefault();
      clickElementById("voice-input-button");
    }

    if (event.key === ',') {
      event.preventDefault();
      
      const settingsButton = document.querySelector('[data-element-id="settings-button"]');
      if (settingsButton) {
        settingsButton.click();
        
        const observer = new MutationObserver((mutations, obs) => {
          const preferencesOption = Array.from(document.querySelectorAll('button'))
            .find(el => el.textContent.trim() === 'Preferences');
          
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

    if (event.key === '.') {
      event.preventDefault();
      
      const modelSettingsMenuButton = document.querySelector('[data-element-id="current-chat-title"] button[aria-haspopup="menu"]');
      if (modelSettingsMenuButton) {
        modelSettingsMenuButton.click();
        
        const observer = new MutationObserver((mutations, obs) => {
          const modelSettingsOption = Array.from(document.querySelectorAll('div[role="menuitem"]'))
            .find(el => el.textContent.trim() === 'Model Settings (Current Chat)');
          
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
      } else {
        console.log('Model settings menu button not found');
      }
    }

    if (event.key === 'R' && event.shiftKey) {
      event.preventDefault();
      clickElementById("regenerate-button");
    }
  }
});

function clickElementById(id) {
  const element = document.querySelector(`[data-element-id="${id}"]`);
  if (element) {
    element.click();
  } else {
    console.log(`Element with id ${id} not found`);
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

console.log('Updated script loaded with all functionalities including correct cmd+, and cmd+. shortcuts');
