// Function to wait for an element to appear
function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        setTimeout(() => {
            observer.disconnect();
            resolve(null);
        }, timeout);
    });
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

// Function to click stop button
function clickStopButton() {
    const stopButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === "Stop");
    if (stopButton) {
        stopButton.click();
    } else {
        console.log("Stop button not found");
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

// Adjust model menu height
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
                clickSettingsAndPreferences('button[data-element-id="settings-button"]', "Plugins");
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
async function clickSettingsAndPreferences(settingsButtonSelector, preferencesText) {
    try {
        const settingsButton = await waitForElement(settingsButtonSelector);
        if (!settingsButton) throw new Error('Settings button not found');

        settingsButton.click();
        console.log('Clicked settings button');

        const preferencesOption = await waitForElement(`button:contains("${preferencesText}"), div[role="menuitem"]:contains("${preferencesText}")`);
        if (!preferencesOption) throw new Error(`${preferencesText} option not found`);

        preferencesOption.click();
        console.log(`Clicked ${preferencesText} option`);
    } catch (error) {
        console.error(`Error in clickSettingsAndPreferences:`, error.message);
    }
}

console.log('Full enhanced script loaded with all functionalities, including Plugins (Cmd+O), model menu height adjustment, and various keyboard shortcuts.');
