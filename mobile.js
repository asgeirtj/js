(function() {
    'use strict';

    function clickPlayButton() {
        const playButton = document.querySelector('button.tts-play-button[data-element-id="in-message-play-button"]');
        if (playButton) {
            playButton.click();
            console.log('Play button clicked!');
        } else {
            console.log('Play button not found. Retrying...');
            setTimeout(clickPlayButton, 500); // Retry after 500ms
        }
    }

    // Run when the page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', clickPlayButton);
    } else {
        clickPlayButton();
    }

    // Also try again after a short delay, in case the button loads late
    setTimeout(clickPlayButton, 1000);
})();
