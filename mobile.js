(function() {
    'use strict';

    // Function to find and play the audio
    function playAudio() {
        // Look for the audio element or the play button
        const audioElement = document.querySelector('audio') || document.querySelector('video');
        const playButton = document.querySelector('button[aria-label="Play"], .play-button, [aria-label="Play"]');

        if (audioElement) {
            // If we found an audio element, try to play it
            audioElement.play().catch(e => console.error('Auto-play failed:', e));
        } else if (playButton) {
            // If we found a play button, click it
            playButton.click();
        }
    }

    // Run the function when the page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', playAudio);
    } else {
        playAudio();
    }

    // Also try again after a short delay, in case the audio loads late
    setTimeout(playAudio, 1000);
})();
