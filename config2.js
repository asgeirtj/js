/*
 * Typing Mind Extension Script - Version 1.1
 * Date Updated: 2023-10-05
 * 
 * Updates in this version:
 * - Added Cmd+K functionality to reset character or start a new chat if the reset button is not found.
 * - Improved auto-play setting toggle through simulated hover and visibility checks.
 * 
 * Shortcuts include:
 * - Cmd+K: Reset character if agent is selected but no new chat, otherwise new chat
 * - Cmd+1: Toggle voice input
 * - Cmd+, : Open Preferences
 * - Cmd+Shift+R: Regenerate response
 * - Cmd+L: Play latest message
 * - Cmd+J: Open Models
 * - Cmd+O: Open Manage Plugins
 * - Cmd+3: Edit second-to-newest message
 * - Cmd+U: Toggle auto-play setting in TTS and click Done
 * - F2: Stop button
 */

// Function to wait for an element to appear
function waitForElement(selector, timeout = 3000) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
        }

        const observer = new MutationObserver((mutations, me) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                me.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element not found within timeout: ${selector}`));
        }, timeout);
    });
}

// Function to simulate hover on an element and then wait for visibility of a target item
function simulateHoverAndFind(elementSelector, targetSelector, timeout = 3000) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(elementSelector);
        if (element) {
            simulateHover(element);
            console.log(`Hovered over element: ${elementSelector}`);

            const observer = new MutationObserver((mutations, obs) => {
                const targetElement = document.querySelector(targetSelector);
                if (targetElement && targetElement.offsetParent !== null) { // checking visibility
                    resolve(targetElement);
                    obs.disconnect();
                    console.log(`Found and visible element: ${targetSelector}`);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element not found within timeout: ${targetSelector}`));
            }, timeout);
        } else {
            reject(new Error(`Hover target not found: ${elementSelector}`));
        }
    });
}

// Function to simulate hover on an element
function simulateHover(element) {
    const event = new MouseEvent('mouseover', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    element.dispatchEvent(event);
}

// Function to toggle auto-play setting
async function toggleAutoPlaySetting() {
    try {
        const hoverParentSelector = '[data-element-id="additional-actions-of-response-container"]';
        const settingsButtonSelector = '.group\\:hover\\:inline-block.sm\\:hidden.font-semibold.text-gray-500.hover\\:underline';
        
        const settingsButton = await simulateHoverAndFind(hoverParentSelector, settingsButtonSelector);
        settingsButton.click();

        // Wait for the modal to appear
        const modal = await waitForElement('[data-element-id="pop-up-modal"]');
        console.log('Modal appeared:', modal);

        // Toggle the "Auto play assistant messages" switch
        const toggleButton = await waitForElement('[data-element-id="plugins-switch-disabled"]');
        console.log('Toggle switch found:', toggleButton);
        toggleButton.click();

        // Click the "Done" button
        const doneButton = await waitForElement('button[type="submit"].inline-flex.items-center.px-4.py-2.border.border-transparent.text-base.font-medium.rounded-md.shadow-sm.text-white.bg-blue-600.hover\\:bg-blue-700.focus\\:outline-none.focus\\:ring-2.focus\\:ring-offset-2.focus\\:ring-blue-500.disabled\\:bg-gray-400.gap-2');
        console.log('Done button found:', doneButton);
        doneButton.click();
        
    } catch (error) {
        console.error('Error in toggling autoplay setting:', error);
    }
}

// Function to check and click Reset Character or New Chat for Cmd+K
function handleCmdK() {
    const resetButton = document.querySelector('button[data-element-id="reset-character-button"]');
    if (resetButton) {
        resetButton.click();
        console.log('Clicked reset character button');
    } else {
        const newChatButton = document.querySelector('button[data-element-id="new-chat-button-in-side-bar"]');
        if (newChatButton) {
            newChatButton.click();
            console.log('Clicked new chat button');
        } else {
            console.log('New chat button not found');
        }
    }
}

// Attach event listener for Cmd+K (or Ctrl+K on Windows/Linux)
document.addEventListener('keydown', function(event) {
    if (event.metaKey && event.key === 'k') {
        event.preventDefault();
        handleCmdK();
    }
});

// Attach additional keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.metaKey) {
        switch (event.key) {
            case '1':
                event.preventDefault();
                toggleVoiceInput();
                break;
            case ',':
                event.preventDefault();
                clickSettingsAndPreferences('button[data-element-id="settings-button"]', "Preferences");
                break;
            case 'R':
                if (event.shiftKey) {
                    event.preventDefault();
                    clickElementBySelector('button[data-element-id="regenerate-button"]');
                }
                break;
            case 'l':
                event.preventDefault();
                clickLatestPlayButton();
                break;
            case 'j':
                event.preventDefault();
                clickSettingsAndPreferences('button[data-element-id="settings-button"]', "Models");
                break;
            case 'o':
                event.preventDefault();
                clickManagePluginsButton();
                break;
            case '3':
                event.preventDefault();
                clickSecondToNewestEditMessageButton();
                break;
            case 'u':
                event.preventDefault();
                toggleAutoPlaySetting();
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

// Supporting function to click settings and preferences
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

console.log('Typing Mind Extension Script - Version 1.1 Date Updated: 2023-10-05 Updates in this version - Added Cmd+K functionality to reset character or start a new chat if the reset button is not found. - Improved auto-play setting toggle through simulated hover and visibility checks.');
