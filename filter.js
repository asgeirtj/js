/****************************************************************************
 * remove-workspace-button.js
 * 
 * Removes Teams button from workspace bar
 * Works on mobile and desktop
 * Persists across navigation and DOM updates
 ****************************************************************************/

(function() {
    // Create and inject CSS
    const buttonRemovalStyle = document.createElement('style');
    buttonRemovalStyle.id = 'button-removal-style';
    buttonRemovalStyle.innerHTML = `
        /* Hide Teams button specifically */
        button[data-element-id="workspace-tab-teams"] {
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
            width: 0 !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            opacity: 0 !important;
        }
    `;

    // Add style to head if not already present
    if (!document.getElementById('button-removal-style')) {
        document.head.appendChild(buttonRemovalStyle);
    }

    // Function to remove the Teams button
    function removeTeamsButton() {
        const teamsButton = document.querySelector('button[data-element-id="workspace-tab-teams"]');
        if (teamsButton) {
            teamsButton.remove();
            console.log('Teams button removed successfully');
        }
    }

    // Initial removal
    removeTeamsButton();

    // Monitor for DOM changes
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                removeTeamsButton();
            }
        }
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Monitor for style removal
    const styleObserver = new MutationObserver(() => {
        if (!document.getElementById('button-removal-style')) {
            document.head.appendChild(buttonRemovalStyle.cloneNode(true));
            console.log('Button removal style re-added');
        }
    });

    // Start observing document head
    styleObserver.observe(document.head, {
        childList: true,
        subtree: true
    });

    // Handle page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeTeamsButton);
    }

    console.log('remove-workspace-button.js: Loaded successfully');
})();
