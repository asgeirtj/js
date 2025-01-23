/****************************************************************************
 * remove-workspace-button.js
 * 
 * Removes specific button from workspace bar
 * Works on mobile and desktop
 * Persists across navigation and DOM updates
 ****************************************************************************/

(function() {
    // Create and inject CSS
    const buttonRemovalStyle = document.createElement('style');
    buttonRemovalStyle.id = 'button-removal-style';
    buttonRemovalStyle.innerHTML = `
        /* Hide specific button - multiple approaches for reliability */
        button.w-full.focus\\:text-white.focus\\:outline-0.inline-flex.items-start.justify-start.flex-col.md\\:h-\\[50px\\].h-12.cursor-default.aspect-square.sm\\:aspect-auto.sm\\:min-w-0.min-w-\\[58px\\]:nth-of-type(6),
        [data-element-id="workspace-bar"] button:nth-of-type(6) {
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
            width: 0 !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            opacity: 0 !important;
        }

        /* Ensure it stays hidden on mobile */
        @media screen and (max-width: 768px) {
            button.w-full.focus\\:text-white.focus\\:outline-0.inline-flex.items-start.justify-start.flex-col.md\\:h-\\[50px\\].h-12.cursor-default.aspect-square.sm\\:aspect-auto.sm\\:min-w-0.min-w-\\[58px\\]:nth-of-type(6),
            [data-element-id="workspace-bar"] button:nth-of-type(6) {
                display: none !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }
        }
    `;

    // Add style to head if not already present
    if (!document.getElementById('button-removal-style')) {
        document.head.appendChild(buttonRemovalStyle);
    }

    // Function to remove the button
    function removeSpecificButton() {
        const buttons = document.querySelectorAll('[data-element-id="workspace-bar"] button');
        const targetButton = Array.from(buttons).find((btn, index) => index === 5); // 6th button (0-based index)
        if (targetButton) {
            targetButton.remove();
            console.log('Workspace button removed successfully');
        }
    }

    // Initial removal
    removeSpecificButton();

    // Monitor for DOM changes to ensure button stays removed
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                removeSpecificButton();
            }
        }
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Monitor for style removal and re-add if necessary
    const styleObserver = new MutationObserver(() => {
        if (!document.getElementById('button-removal-style')) {
            document.head.appendChild(buttonRemovalStyle.cloneNode(true));
            console.log('Button removal style re-added');
        }
    });

    // Start observing document head for style changes
    styleObserver.observe(document.head, {
        childList: true,
        subtree: true
    });

    // Handle page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeSpecificButton);
    }

    // Log successful initialization
    console.log('remove-workspace-button.js: Loaded successfully');

})();
