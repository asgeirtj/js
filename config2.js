/*
 * Typing Mind Extension Script
 * This script adds various keyboard shortcuts and functionalities to Typing Mind.
 * Shortcuts include:
 * - Cmd+K: Reset character if agent selected but no new chat, otherwise new chat
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
            reject(new Error('Element not found within timeout'));
        }, timeout);
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

// Function to click the settings button, toggle the switch, and click the done button
async function toggleAutoPlaySetting() {
    try {
        // Find the last assistant message and simulate hover to make the "Settings" button visible
        const assistantMessages = document.querySelectorAll('[data-element-id="ai-response"]');
        if (assistantMessages.length > 0) {
            const lastAssistantMessage = assistantMessages[assistantMessages.length - 1];
            simulateHover(lastAssistantMessage);
            console.log('Simulated hover over the last assistant message');

            // Wait for the "Settings" button to become visible
            await waitForElement('.group\\:hover\\:inline-block.sm\\:hidden.font-semibold.text-gray-500.hover\\:underline');
            
            // Click the "Settings" button
            const settingsButton = document.querySelector('.group\\:hover\\:inline-block.sm\\:hidden.font-semibold.text-gray-500.hover\\:underline');
            if (settingsButton) {
                settingsButton.click();
                console.log('Clicked settings button');
            } else {
                console.log('Settings button not found');
                return;
            }

            // Wait for the modal to appear
            await waitForElement('[data-element-id="pop-up-modal"]');
            console.log('Modal appeared');

            // Toggle the "Auto play assistant messages" switch
            const toggleButton = document.querySelector('[data-element-id="plugins-switch-disabled"]');
            if (toggleButton) {
                toggleButton.click();
                console.log('Toggled the auto play assistant messages switch');
            } else {
                console.log('Auto play assistant messages switch not found');
                return;
            }

            // Click the "Done" button
            const doneButton = document.querySelector('button[type="submit"].inline-flex.items-center.px-4.py-2.border.border-transparent.text-base.font-medium.rounded-md.shadow-sm.text-white.bg-blue-600.hover\\:bg-blue-700.focus\\:outline-none.focus\\:ring-2.focus\\:ring-offset-2.focus\\:ring-blue-500.disabled\\:bg-gray-400.gap-2');
            if (doneButton) {
                doneButton.click();
                console.log('Clicked Done button');
            } else {
                console.log('Done button not found');
            }
        } else {
            console.log('No assistant messages found to simulate hover');
        }
    } catch (error) {
        console.error('Error in toggling auto play setting:', error);
    }
}

// Function to check if the New Chat button does nothing
function isAgentSelectedWithoutChat() {
    const newChatButton = document.querySelector('button[data-element-id="new-chat-button-in-side-bar"]');
    return newChatButton && newChatButton.disabled;
}

// Function to click the Reset Character button
function clickResetCharacterButton() {
    const resetButton = document.querySelector('button[data-element-id="reset-character-button"]');
    if (resetButton) {
        resetButton.click();
        console.log('Clicked reset character button');
    } else {
        console.log('Reset character button not found');
    }
}

// Function to click the New Chat button
function clickNewChatButton() {
    const newChatButton = document.querySelector('button[data-element-id="new-chat-button-in-side-bar"]');
    if (newChatButton) {
        newChatButton.click();
        console.log('Clicked new chat button');
    } else {
        console.log('New chat button not found');
    }
}

// Function to click the second-to-newest Edit Message button
function clickSecondToNewestEditMessageButton() {
    const editButtons = document.querySelectorAll('button[data-element-id="edit-message-button"]');
    if (editButtons.length > 1) {
        editButtons[editButtons.length - 2].click();
        console.log('Clicked the second-to-newest edit message button');
    } else {
        console.log('Not enough edit message buttons found');
    }
}

// Event listener for keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.metaKey) {
        switch (event.key) {
            case 'k':
                event.preventDefault();
                if (isAgentSelectedWithoutChat()) {
                    clickResetCharacterButton();
                } else {
                    clickNewChatButton();
                }
                break;
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

console.log('Full enhanced script loaded with all functionalities, including Manage Plugins (Cmd+O), Edit second-to-newest Message (Cmd+3), model menu height adjustment, and various keyboard shortcuts. Additionally, TTS settings toggled with Cmd+U.');
