// Function to wait for an element to appear
function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver((mutations, observer) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// Function to click the settings button and manage plugins option
async function clickManagePluginsButton() {
    console.log('Cmd+O pressed, opening Manage Plugins');

    // Using a class-based selector for the dropdown button
    const dropdownButtonSelector = 'button[id^="headlessui-menu-button"]'; // Adjusted selector

    try {
        const dropdownButton = await waitForElement(dropdownButtonSelector);
        if (dropdownButton) {
            console.log('Dropdown button found:', dropdownButton);
            dropdownButton.click();
            console.log('Dropdown button clicked');
            
            // Wait for 500ms to make sure the dropdown menu has appeared
            setTimeout(async () => {
                // The "Manage Plugins" item within the role="menuitem"
                const managePluginsItemSelector = 'div[role="menuitem"] div.truncate';
                
                const menuItems = document.querySelectorAll(managePluginsItemSelector);
                const managePluginsItem = Array.from(menuItems).find(item => item.textContent.trim() === "Manage Plugins");

                if (managePluginsItem) {
                    managePluginsItem.click();
                    console.log('Manage Plugins item clicked');
                } else {
                    console.log('Manage Plugins item not found');
                }
            }, 500); // Increased the delay to 500ms
        } else {
            console.log('Dropdown button not found');
        }
    } catch (err) {
        console.error("Error finding the dropdown button: ", err);
    }
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

// Function to adjust model menu height
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
        clickElementBySelector('button[data-element-id="voice-input-button"]');
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
