// ==UserScript==
// @name         Typing Mind Extension Script
// @namespace    http://your-namespace.com/
// @version      1.5
// @description  Enhance Typing Mind with various shortcuts and functionalities.
// @author
// @match        *://www.typingmind.com/*
// @grant        none
// @downloadURL  https://update.greasyfork.org/scripts/your-script.user.js
// @updateURL    https://update.greasyfork.org/scripts/your-script.meta.js
// ==/UserScript==

/*
 * Typing Mind Extension Script - Version 1.5
 * Date Updated: Updated on 2024-10-06
 *
 * Updates in this version:
 * - Adjusted selectors for auto-play toggle switch to match the given button elements.
 * - Ensured correct targeting of "Auto play assistant messages" switch.
 * - Reintroduced missing functions for voice input, playing latest message, managing plugins, stopping, and editing messages.
 *
 * Shortcuts include:
 * - Cmd+K: Reset character or start a new chat
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

// Function to toggle auto-play setting without hovering
async function toggleAutoPlaySetting() {
    try {
        // Directly select the Settings button
        const settingsButton = document.querySelector('button.group-hover\\:inline-block.sm\\:hidden.font-semibold.text-gray-500.hover\\:underline');

        if (settingsButton) {
            settingsButton.click();
            console.log('Clicked Settings button');

            // Wait for the modal to appear
            const modal = await waitForElement('[data-element-id="pop-up-modal"]');
            console.log('Modal appeared:', modal);

            // Locate the "Auto play assistant messages" switch
            const sections = Array.from(document.querySelectorAll('button[data-element-id="plugins-switch-disabled"], button[data-element-id="plugins-switch-enabled"]')).filter(button => {
                return button.nextElementSibling && button.nextElementSibling.textContent.includes('Auto play assistant messages');
            });

            if (sections.length > 0) {
                const toggleButton = sections[0];
                console.log('Auto play switch found:', toggleButton);
                toggleButton.click();

                // Click the "Done" button
                const doneButton = await waitForElement('button[type="submit"].inline-flex.items-center.px-4.py-2.border.border-transparent.text-base.font-medium.rounded-md.shadow-sm.text-white.bg-blue-600.hover\\:bg-blue-700.focus\\:outline-none.focus\\:ring-2.focus\\:ring-offset-2.focus\\:ring-blue-500.disabled\\:bg-gray-400.gap-2');
                console.log('Done button found:', doneButton);
                doneButton.click();
            } else {
                console.log('Auto play switch not found');
            }
        } else {
            console.log('Settings button not found');
        }
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

// Function to toggle voice input
function toggleVoiceInput() {
    const finishButton = Array.from(document.querySelectorAll('button'))
        .find(button => button.textContent.includes('Finish'));
    if (finishButton) {
        finishButton.click();
    } else {
        clickElementBySelector('button[data-element-id="voice-input-button"]');
    }
}

// Function to click latest play button
function clickLatestPlayButton() {
    const playButtons = document.querySelectorAll('button[data-element-id="in-message-play-button"]');
    if (playButtons.length > 0) {
        playButtons[playButtons.length - 1].click();
        console.log("Clicked the latest play button");
    } else {
        console.log("No play buttons found");
    }
}

// Function to click manage plugins button
async function clickManagePluginsButton() {
    console.log('Cmd+O pressed, attempting to open Manage Plugins');

    const pluginsButton = document.querySelector('button svg.w-6.h-6.text-blue-500').closest('button');

    if (pluginsButton) {
        pluginsButton.click();
        console.log('Clicked plugins button');

        await new Promise(resolve => setTimeout(resolve, 100));

        const menuItems = document.querySelectorAll('div[role="menuitem"]');
        const managePluginsItem = Array.from(menuItems).find(item => {
            const truncateDiv = item.querySelector('div.truncate');
            return truncateDiv && truncateDiv.textContent.trim() === 'Manage Plugins';
        });

        if (managePluginsItem) {
            managePluginsItem.click();
            console.log('Clicked Manage Plugins option');
        } else {
            console.log('Manage Plugins option not found in menu');
        }
    } else {
        console.log('Plugins button not found');
    }
}

// Function to click stop button
function clickStopButton() {
    const stopButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === "Stop");
    if (stopButton) {
        stopButton.click();
    } else {
        console.log("Stop button not found");
    }
}

// Function to click second-to-newest edit message button
function clickEditMessageButton() {
    const editButton = document.querySelector('button[data-element-id="edit-message-button"]');
    if (editButton) {
        editButton.click();
        console.log('Clicked edit message button');
    } else {
        console.log('Edit message button not found');
    }
}

// Additional supporting functions
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
                clickEditMessageButton();
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

// Adjust model menu height
const menuObserver = new MutationObserver(() => {
    const modelMenu = document.querySelector('div[role="menu"] .py-2.max-h-\\[300px\\].overflow-auto');
    if (modelMenu) {
        modelMenu.style.maxHeight = '500px';
    }
});
menuObserver.observe(document.body, { childList: true, subtree: true });

console.log('Full enhanced script loaded with all functionalities, including Manage Plugins (Cmd+O), Edit Message (Cmd+3), model menu height adjustment, and various keyboard shortcuts.');
