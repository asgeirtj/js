// TypingMind GPT-Style Theme v4.2 (Native Dark Mode Colors)
// Description: Feature-rich ChatGPT-style theme for TypingMind with system dark mode support (using native TM colors), date/time formatting, and thought styling.
// Origin: Based on shaggy2626's v4 theme, dark mode colors adjusted by Magnanimous Overlord AI based on user preference.
// Version: 4.2

(function () {
  'use strict';

  /**
   * TypingMind GPT-Style Theme v4.2 (Native Dark Mode Colors)
   * Configuration and selector definitions
   */
  const CONFIG = {
    light: { // shaggy2626 v4 Light Mode Colors (Unchanged)
      background: '#F9F9F9',
      text: '#000000',
      textSecondary: '#555555',
      border: '#CCCCCC',
      borderSubtle: '#E0E0E0',
      accent: '#E3E3E3', // Used for sidebar hover/selected
      accentText: '#000000',
      input: {
        background: '#F4F4F4',
        text: '#0D0D0D',
        placeholder: '#8E8E8E',
        border: '#CCCCCC',
      },
      button: {
        primary: '#0D0D0D', // Dark Send/More button background
        primaryText: '#FFFFFF',
        primaryHover: 'rgba(13, 13, 13, 0.8)',
        secondary: 'rgba(0, 0, 0, 0.1)', // Generic hover/secondary button bg
      },
      code: {
        background: '#f6f8fa', // Inline code bg
        text: '#24292E',      // Inline code text
        blockBackground: '#F9F9F9',
        blockText: '#24292E',
        blockBorder: '#CCCCCC',
      },
      thought: {
        text: '#00529B',
        background: '#BDE5F8',
      },
      sandbox: {
        background: '#000000',
        text: '#FFFFFF',
      },
      menu: {
          background: '#FFFFFF',
          text: '#000000',
      },
      tagPanel: {
          background: '#F9F9F9',
          border: '#CCCCCC',
          text: '#000000',
          inputBackground: '#FFFFFF',
          inputBorder: '#CCCCCC',
          inputText: '#000000',
      },
      scrollbar: {
          track: '#f1f1f1',
          thumb: '#c1c1c1',
          thumbHover: '#a1a1a1',
      },
      chatAreaBackground: '#FFFFFF',
      userMessageBackground: '#F4F4F4', // User msg bubble bg
      userMessageText: '#0D0D0D',     // User msg text
      sidebarTextOverride: '#000000',   // Force black text in light sidebar
      sidebarHoverBackground: 'rgba(0, 0, 0, 0.1)',

    },
    dark: { // Native TypingMind Dark Mode Colors (Adjusted)
      background: '#181A1D', // Very dark sidebar background (approximated)
      text: '#EAEAEA',       // General light text
      textSecondary: '#AAAAAA', // Dimmer text
      border: '#404040',       // Subtle border for elements needing it
      borderSubtle: '#353535',
      accent: 'rgba(255, 255, 255, 0.2)', // Sidebar selected item background (bg-white/20)
      accentText: '#FFFFFF',
      input: {
        background: '#2D2D2D', // Input area background (slightly lighter than chat bg)
        text: '#FFFFFF',
        placeholder: 'rgba(255, 255, 255, 0.6)',
        border: '#404040', // Match main border
      },
      button: {
        primary: '#2563eb', // Native blue send button
        primaryText: '#FFFFFF',
        primaryHover: '#1d4ed8', // Darker blue on hover
        secondary: 'rgba(255, 255, 255, 0.1)', // Hover for other input buttons
      },
      code: {
        background: '#2D2D2D', // Inline code bg (matches input bg)
        text: '#EAEAEA',      // Inline code text
        blockBackground: '#1E1E1E', // Darker code block background
        blockText: '#D4D4D4',
        blockBorder: '#404040',
      },
      thought: { // Revert thought styling to be less distinct in native dark
        text: '#AAAAAA', // Use secondary text color
        background: '#242629', // Slightly different dark background
      },
      sandbox: { // Match code block style
        background: '#1E1E1E',
        text: '#D4D4D4',
      },
      menu: { // Dropdown menus
          background: '#2d2d2d',
          text: '#FFFFFF',
      },
      tagPanel: { // Tag filter panel
          background: '#181A1D', // Match sidebar
          border: '#404040',
          text: '#FFFFFF',
          inputBackground: '#2D2D2D', // Match input bg
          inputBorder: '#404040',
          inputText: '#FFFFFF',
      },
      scrollbar: { // Match dark scrollbar appearance
          track: '#2D2D2D',
          thumb: '#555555',
          thumbHover: '#666666',
      },
       chatAreaBackground: '#1b1d21', // Main chat area background (from HTML)
       userMessageBackground: '#2D2D2D', // Darker gray user bubble (matches input area)
       userMessageText: '#EAEAEA',     // Light text in user bubble
       sidebarTextOverride: '#EAEAEA',   // Force light text in dark sidebar
       sidebarHoverBackground: 'rgba(255, 255, 255, 0.1)', // Hover for sidebar items

    },
    fonts: { // Fonts remain the same as shaggy2626 v4
      primary: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
      code: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
      thought: {
        size: '12px',
        lineHeight: '20px'
      }
    },
    spacing: { small: '8px', medium: '1rem', large: '1.5rem' },
    borderRadius: { small: '0.5rem', medium: '1rem', large: '1.5rem' },
    formats: {
      months: { 'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December' },
      daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      daysAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  };

  // SELECTORS and Utils remain the same as the previous version...
  const SELECTORS = {
    CODE_BLOCKS: 'pre code',
    INLINE_CODE: ':not(pre) > code',
    RESULT_BLOCKS: 'details pre',
    USER_MESSAGE_BLOCK: 'div[data-element-id="user-message"]',
    CHAT_SPACE: '[data-element-id="chat-space-middle-part"]',
    THOUGHT_DETAILS: 'details summary:has(span:contains("Thought for"))',
    TIMESTAMP_BUTTONS: 'button[id^="message-timestamp-"]',
    DATE_SPANS: '[data-element-id="chat-date-info"] span',
    SIDEBAR: {
      WORKSPACE: '[data-element-id="workspace-bar"]',
      BACKGROUND: '[data-element-id="side-bar-background"]',
      BEGINNING: '[data-element-id="sidebar-beginning-part"]',
      MIDDLE: '[data-element-id="sidebar-middle-part"]',
      SEARCH: '[data-element-id="search-chats-bar"]',
      NEW_CHAT: '[data-element-id="new-chat-button-in-side-bar"]',
      CHAT_ITEM: '[data-element-id="custom-chat-item"]',
      SELECTED_CHAT_ITEM: '[data-element-id="selected-chat-item"]',
      TAG_PANEL: '[data-element-id="tag-search-panel"]',
      TAG_PANEL_INPUT: '[data-element-id="tag-search-panel"] input[type="search"]',
      TEXTAREA: 'textarea',
      PROFILE_BUTTON: '[data-element-id="workspace-profile-button"]'
    },
    CHAT_AREA: {
        RESPONSE_BLOCK: '[data-element-id="response-block"]',
        AVATAR_CONTAINER_USER: '[data-element-id="response-block"]:has([data-element-id="user-message"]) [data-element-id="chat-avatar-container"]',
        PROSE_TEXT: '.prose.max-w-full *:not(pre, pre *, code, code *, .flex.items-start.justify-center.flex-col.gap-2 *, .text-xs.text-gray-500.truncate, .italic.truncate.hover\\:underline, h1, h2, h3, h4, h5, h6)',
        USER_MESSAGE_DIV: '[data-element-id="user-message"] > div',
        PROSE_ROOT: '.prose.max-w-full',
        CODE_BLOCK_WRAPPER: 'pre:has(div.relative)',
        SANDBOX_PRE: 'pre.mb-2.overflow-auto.text-sm.border.border-gray-200.rounded.bg-gray-100',
        CODE_BLOCK_STICKY_HEADER: 'pre > div.relative > div.sticky',
        CODE_BLOCK_INNER_PRE: 'pre > div.relative > div > pre',
        LIST: '.prose.max-w-full ul, .prose.max-w-full ol',
        LIST_ITEM: '.prose.max-w-full li',
        UL_ITEM: '.prose.max-w-full ul > li',
        OL_ITEM: '.prose.max-w-full ol > li',
        H1: '.prose.max-w-full h1', H2: '.prose.max-w-full h2', H3: '.prose.max-w-full h3',
        INPUT_CONTAINER: '[data-element-id="chat-space-end-part"] [role="presentation"]',
        INPUT_TEXTBOX: '#chat-input-textbox',
        INPUT_ACTIONS: '[data-element-id="chat-input-actions"]',
        INPUT_ACTION_BUTTONS: '[data-element-id="chat-input-actions"] button:not([data-element-id="send-button"]):not([data-element-id="more-options-button"]):not([data-element-id="replace-only-button"])',
        SEND_BUTTON: '[data-element-id="send-button"]',
        MORE_OPTIONS_BUTTON: '[data-element-id="more-options-button"]',
    },
    HEADLESS_UI_PORTAL: '#headlessui-portal-root',
    MENU: '[role="menu"]',
    MENU_ITEM: '[role="menuitem"]',
  };

  const Utils = {
    debounce: (fn, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
      };
    },
    safe: (fn, context = 'unknown') => {
      try {
        return fn();
      } catch (e) {
        console.error(`TypingMind Theme Error in ${context}:`, e);
        return null;
      }
    },
    escapeHtml: str =>
      typeof str !== 'string'
        ? ''
        : str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
  };

  /* ---------------- CSS Variable Setup ---------------- */
  function injectCssVariables() {
      if (document.getElementById('typingmind-theme-variables')) return;

      const style = document.createElement('style');
      style.id = 'typingmind-theme-variables';
      style.textContent = `
          :root {
              color-scheme: light dark; /* Enable system light/dark detection */

              /* Light Mode Variables */
              --tm-bg: ${CONFIG.light.background};
              --tm-text: ${CONFIG.light.text};
              --tm-text-secondary: ${CONFIG.light.textSecondary};
              --tm-border: ${CONFIG.light.border};
              --tm-border-subtle: ${CONFIG.light.borderSubtle};
              --tm-accent-bg: ${CONFIG.light.accent};
              --tm-accent-text: ${CONFIG.light.accentText};
              --tm-input-bg: ${CONFIG.light.input.background};
              --tm-input-text: ${CONFIG.light.input.text};
              --tm-input-placeholder: ${CONFIG.light.input.placeholder};
              --tm-input-border: ${CONFIG.light.input.border};
              --tm-button-primary-bg: ${CONFIG.light.button.primary};
              --tm-button-primary-text: ${CONFIG.light.button.primaryText};
              --tm-button-primary-hover-bg: ${CONFIG.light.button.primaryHover};
              --tm-button-secondary-hover-bg: ${CONFIG.light.button.secondary};
              --tm-code-inline-bg: ${CONFIG.light.code.background};
              --tm-code-inline-text: ${CONFIG.light.code.text};
              --tm-code-block-bg: ${CONFIG.light.code.blockBackground};
              --tm-code-block-text: ${CONFIG.light.code.blockText};
              --tm-code-block-border: ${CONFIG.light.code.blockBorder};
              --tm-thought-text: ${CONFIG.light.thought.text};
              --tm-thought-bg: ${CONFIG.light.thought.background};
              --tm-sandbox-bg: ${CONFIG.light.sandbox.background};
              --tm-sandbox-text: ${CONFIG.light.sandbox.text};
              --tm-menu-bg: ${CONFIG.light.menu.background};
              --tm-menu-text: ${CONFIG.light.menu.text};
              --tm-tag-panel-bg: ${CONFIG.light.tagPanel.background};
              --tm-tag-panel-border: ${CONFIG.light.tagPanel.border};
              --tm-tag-panel-text: ${CONFIG.light.tagPanel.text};
              --tm-tag-panel-input-bg: ${CONFIG.light.tagPanel.inputBackground};
              --tm-tag-panel-input-border: ${CONFIG.light.tagPanel.inputBorder};
              --tm-tag-panel-input-text: ${CONFIG.light.tagPanel.inputText};
              --tm-scrollbar-track: ${CONFIG.light.scrollbar.track};
              --tm-scrollbar-thumb: ${CONFIG.light.scrollbar.thumb};
              --tm-scrollbar-thumb-hover: ${CONFIG.light.scrollbar.thumbHover};
              --tm-user-msg-bg: ${CONFIG.light.userMessageBackground};
              --tm-user-msg-text: ${CONFIG.light.userMessageText};
              --tm-chat-bg: ${CONFIG.light.chatAreaBackground};
              --tm-sidebar-text-override: ${CONFIG.light.sidebarTextOverride};
              --tm-sidebar-hover-bg: ${CONFIG.light.sidebarHoverBackground};
          }

          @media (prefers-color-scheme: dark) {
              :root {
                  /* Dark Mode Variables (Native TM Look) */
                  --tm-bg: ${CONFIG.dark.background};
                  --tm-text: ${CONFIG.dark.text};
                  --tm-text-secondary: ${CONFIG.dark.textSecondary};
                  --tm-border: ${CONFIG.dark.border};
                  --tm-border-subtle: ${CONFIG.dark.borderSubtle};
                  --tm-accent-bg: ${CONFIG.dark.accent};
                  --tm-accent-text: ${CONFIG.dark.accentText};
                  --tm-input-bg: ${CONFIG.dark.input.background};
                  --tm-input-text: ${CONFIG.dark.input.text};
                  --tm-input-placeholder: ${CONFIG.dark.input.placeholder};
                  --tm-input-border: ${CONFIG.dark.input.border};
                  --tm-button-primary-bg: ${CONFIG.dark.button.primary}; /* Blue send button */
                  --tm-button-primary-text: ${CONFIG.dark.button.primaryText};
                  --tm-button-primary-hover-bg: ${CONFIG.dark.button.primaryHover};
                  --tm-button-secondary-hover-bg: ${CONFIG.dark.button.secondary};
                  --tm-code-inline-bg: ${CONFIG.dark.code.background};
                  --tm-code-inline-text: ${CONFIG.dark.code.text};
                  --tm-code-block-bg: ${CONFIG.dark.code.blockBackground};
                  --tm-code-block-text: ${CONFIG.dark.code.blockText};
                  --tm-code-block-border: ${CONFIG.dark.code.blockBorder};
                  --tm-thought-text: ${CONFIG.dark.thought.text}; /* Subtle thought text */
                  --tm-thought-bg: ${CONFIG.dark.thought.background};   /* Subtle thought background */
                  --tm-sandbox-bg: ${CONFIG.dark.sandbox.background};
                  --tm-sandbox-text: ${CONFIG.dark.sandbox.text};
                  --tm-menu-bg: ${CONFIG.dark.menu.background};
                  --tm-menu-text: ${CONFIG.dark.menu.text};
                  --tm-tag-panel-bg: ${CONFIG.dark.tagPanel.background};
                  --tm-tag-panel-border: ${CONFIG.dark.tagPanel.border};
                  --tm-tag-panel-text: ${CONFIG.dark.tagPanel.text};
                  --tm-tag-panel-input-bg: ${CONFIG.dark.tagPanel.inputBackground};
                  --tm-tag-panel-input-border: ${CONFIG.dark.tagPanel.inputBorder};
                  --tm-tag-panel-input-text: ${CONFIG.dark.tagPanel.inputText};
                  --tm-scrollbar-track: ${CONFIG.dark.scrollbar.track};
                  --tm-scrollbar-thumb: ${CONFIG.dark.scrollbar.thumb};
                  --tm-scrollbar-thumb-hover: ${CONFIG.dark.scrollbar.thumbHover};
                  --tm-user-msg-bg: ${CONFIG.dark.userMessageBackground};
                  --tm-user-msg-text: ${CONFIG.dark.userMessageText};
                  --tm-chat-bg: ${CONFIG.dark.chatAreaBackground};
                  --tm-sidebar-text-override: ${CONFIG.dark.sidebarTextOverride};
                  --tm-sidebar-hover-bg: ${CONFIG.dark.sidebarHoverBackground};
              }
          }
      `;
      document.head.appendChild(style);
  }


  /* ---------------- Sidebar Modifications ---------------- */
  function applySidebarStyles() {
    if (document.getElementById('typingmindSidebarFixMerged')) return;

    const sidebarStyle = document.createElement('style');
    sidebarStyle.id = 'typingmindSidebarFixMerged';
    sidebarStyle.type = 'text/css';

    // Use CSS variables for colors
    const styles = `
      /* Main sidebar containers */
      ${SELECTORS.SIDEBAR.WORKSPACE},
      ${SELECTORS.SIDEBAR.BACKGROUND},
      ${SELECTORS.SIDEBAR.BEGINNING},
      ${SELECTORS.SIDEBAR.MIDDLE} { background-color: var(--tm-bg) !important; }

      /* New chat button - Keep consistent look or use native blue in dark? */
      /* Option 1: Keep Theme's Look (light/dark accent) */
      /* ${SELECTORS.SIDEBAR.NEW_CHAT} { background-color: var(--tm-accent-bg) !important; color: var(--tm-accent-text) !important; } */
      /* ${SELECTORS.SIDEBAR.NEW_CHAT} * { color: var(--tm-accent-text) !important; } */

       /* Option 2: Use Native Blue in Dark Mode (Like Default) */
        ${SELECTORS.SIDEBAR.NEW_CHAT} {
            background-color: var(--tm-accent-bg) !important; /* Light mode accent */
            color: var(--tm-accent-text) !important; /* Light mode text */
         }
         ${SELECTORS.SIDEBAR.NEW_CHAT} * {
            color: var(--tm-accent-text) !important; /* Light mode text */
         }
        @media (prefers-color-scheme: dark) {
             ${SELECTORS.SIDEBAR.NEW_CHAT} {
                 background-color: ${CONFIG.dark.button.primary} !important; /* Use native blue */
                 color: ${CONFIG.dark.button.primaryText} !important;
             }
             ${SELECTORS.SIDEBAR.NEW_CHAT} * {
                 color: ${CONFIG.dark.button.primaryText} !important;
             }
        }


      /* Search bar */
      ${SELECTORS.SIDEBAR.SEARCH} {
         background-color: var(--tm-input-bg) !important; /* Use input background for contrast */
         color: var(--tm-text) !important;
         border: 1px solid var(--tm-border) !important;
      }
      /* Search placeholder text */
      ${SELECTORS.SIDEBAR.SEARCH}::placeholder { color: var(--tm-input-placeholder) !important; opacity: 1 !important; -webkit-text-fill-color: var(--tm-input-placeholder) !important; }
      ${SELECTORS.SIDEBAR.SEARCH}::-webkit-input-placeholder { color: var(--tm-input-placeholder) !important; opacity: 1 !important; -webkit-text-fill-color: var(--tm-input-placeholder) !important; }
      ${SELECTORS.SIDEBAR.SEARCH}::-moz-placeholder { color: var(--tm-input-placeholder) !important; opacity: 1 !important; }
      ${SELECTORS.SIDEBAR.SEARCH}:-ms-input-placeholder { color: var(--tm-input-placeholder) !important; opacity: 1 !important; }


      /* Text colors for sidebar elements - Overridden by mode */
      ${SELECTORS.SIDEBAR.WORKSPACE} *:not(svg):not(path)[class*="text-white"],
      ${SELECTORS.SIDEBAR.WORKSPACE} *:not(svg):not(path)[class*="text-white/"],
      ${SELECTORS.SIDEBAR.WORKSPACE} *:not(svg):not(path)[class*="text-gray-"],
      ${SELECTORS.SIDEBAR.WORKSPACE} *:not(svg):not(path)[class*="dark:text-white"],
      ${SELECTORS.SIDEBAR.BACKGROUND} *:not(svg):not(path)[class*="text-white"],
      ${SELECTORS.SIDEBAR.BACKGROUND} *:not(svg):not(path)[class*="text-white/"],
      ${SELECTORS.SIDEBAR.BACKGROUND} *:not(svg):not(path)[class*="text-gray-"],
      ${SELECTORS.SIDEBAR.BACKGROUND} *:not(svg):not(path)[class*="dark:text-white"]
      { color: var(--tm-sidebar-text-override) !important; opacity: 1 !important; --tw-text-opacity: 1 !important; }

      /* Chat item styling */
      ${SELECTORS.SIDEBAR.CHAT_ITEM}:hover { background-color: var(--tm-sidebar-hover-bg) !important; } /* Use specific hover variable */
      ${SELECTORS.SIDEBAR.SELECTED_CHAT_ITEM} { background-color: var(--tm-accent-bg) !important; } /* Use accent for selected */

      /* Chat item buttons (hide by default, show on hover) - Behavior remains */
      ${SELECTORS.SIDEBAR.CHAT_ITEM} button[aria-label="Delete Chat"],
      ${SELECTORS.SIDEBAR.CHAT_ITEM} button[aria-label="Favorite Chat"],
      ${SELECTORS.SIDEBAR.CHAT_ITEM} button[aria-label="Chat settings"],
      ${SELECTORS.SIDEBAR.SELECTED_CHAT_ITEM} button[aria-label="Delete Chat"],
      ${SELECTORS.SIDEBAR.SELECTED_CHAT_ITEM} button[aria-label="Favorite Chat"],
      ${SELECTORS.SIDEBAR.SELECTED_CHAT_ITEM} button[aria-label="Chat settings"] { display: none !important; }

      ${SELECTORS.SIDEBAR.CHAT_ITEM}:hover button[aria-label="Delete Chat"],
      ${SELECTORS.SIDEBAR.CHAT_ITEM}:hover button[aria-label="Favorite Chat"],
      ${SELECTORS.SIDEBAR.CHAT_ITEM}:hover button[aria-label="Chat settings"],
      ${SELECTORS.SIDEBAR.SELECTED_CHAT_ITEM}:hover button[aria-label="Delete Chat"],
      ${SELECTORS.SIDEBAR.SELECTED_CHAT_ITEM}:hover button[aria-label="Favorite Chat"],
      ${SELECTORS.SIDEBAR.SELECTED_CHAT_ITEM}:hover button[aria-label="Chat settings"],
      ${SELECTORS.SIDEBAR.CHAT_ITEM} button[aria-expanded="true"],
      ${SELECTORS.SIDEBAR.SELECTED_CHAT_ITEM} button[aria-expanded="true"] { display: inline-block !important; }

      /* Headless UI Portal (dropdown menus) */
      ${SELECTORS.HEADLESS_UI_PORTAL} { display: block !important; visibility: visible !important; pointer-events: auto !important; }
      ${SELECTORS.HEADLESS_UI_PORTAL} ${SELECTORS.MENU} { display: block !important; visibility: visible !important; background-color: var(--tm-menu-bg) !important; color: var(--tm-menu-text) !important; pointer-events: auto !important; border: 1px solid var(--tm-border) !important; border-radius: 0.5rem; }
      ${SELECTORS.HEADLESS_UI_PORTAL} ${SELECTORS.MENU_ITEM} { display: flex !important; visibility: visible !important; pointer-events: auto !important; color: var(--tm-menu-text) !important; }
       /* Explicit hover for menu items using appropriate hover color */
      ${SELECTORS.HEADLESS_UI_PORTAL} ${SELECTORS.MENU_ITEM}:hover { background-color: var(--tm-sidebar-hover-bg) !important; }


      /* Tag search panel */
      ${SELECTORS.SIDEBAR.TAG_PANEL} { background-color: var(--tm-tag-panel-bg) !important; border: 1px solid var(--tm-tag-panel-border) !important; color: var(--tm-tag-panel-text) !important; }
      ${SELECTORS.SIDEBAR.TAG_PANEL_INPUT} { background-color: var(--tm-tag-panel-input-bg) !important; border: 1px solid var(--tm-tag-panel-input-border) !important; color: var(--tm-tag-panel-input-text) !important; }

      /* Checkbox styling */
      ${SELECTORS.SIDEBAR.TAG_PANEL} input[type="checkbox"] {
         appearance: none !important; -webkit-appearance: none !important;
         width: 16px !important; height: 16px !important;
         border: 1px solid var(--tm-border) !important; border-radius: 3px !important;
         background-color: var(--tm-menu-bg) !important; /* Use menu bg */
         position: relative !important; cursor: pointer !important;
      }
       /* Use primary button color for checked state for consistency */
      ${SELECTORS.SIDEBAR.TAG_PANEL} input[type="checkbox"]:checked { background-color: var(--tm-button-primary-bg) !important; border-color: var(--tm-button-primary-bg) !important; }
      ${SELECTORS.SIDEBAR.TAG_PANEL} input[type="checkbox"]:checked::after {
         content: '' !important; position: absolute !important;
         left: 5px !important; top: 2px !important; width: 4px !important; height: 8px !important;
         border: solid var(--tm-button-primary-text) !important; /* Use button text color for checkmark */
         border-width: 0 2px 2px 0 !important; transform: rotate(45deg) !important;
      }
      /* Text colors for tag panel */
      ${SELECTORS.SIDEBAR.TAG_PANEL} label, ${SELECTORS.SIDEBAR.TAG_PANEL} p,
      ${SELECTORS.SIDEBAR.TAG_PANEL} span, ${SELECTORS.SIDEBAR.TAG_PANEL} button { color: var(--tm-tag-panel-text) !important; }

      /* Scrollbar styling */
      ${SELECTORS.SIDEBAR.TAG_PANEL} .overflow-auto::-webkit-scrollbar { width: 8px !important; }
      ${SELECTORS.SIDEBAR.TAG_PANEL} .overflow-auto::-webkit-scrollbar-track { background: var(--tm-scrollbar-track) !important; border-radius: 4px !important; }
      ${SELECTORS.SIDEBAR.TAG_PANEL} .overflow-auto::-webkit-scrollbar-thumb { background: var(--tm-scrollbar-thumb) !important; border-radius: 4px !important; }
      ${SELECTORS.SIDEBAR.TAG_PANEL} .overflow-auto::-webkit-scrollbar-thumb:hover { background: var(--tm-scrollbar-thumb-hover) !important; }
      ${SELECTORS.SIDEBAR.TAG_PANEL} .overflow-auto { scrollbar-width: thin !important; scrollbar-color: var(--tm-scrollbar-thumb) var(--tm-scrollbar-track) !important; }

      /* Textarea styling */
      [data-element-id="chat-folder"] ${SELECTORS.SIDEBAR.TEXTAREA},
      ${SELECTORS.SIDEBAR.CHAT_ITEM} ${SELECTORS.SIDEBAR.TEXTAREA},
      ${SELECTORS.SIDEBAR.SELECTED_CHAT_ITEM} ${SELECTORS.SIDEBAR.TEXTAREA},
      ${SELECTORS.SIDEBAR.BACKGROUND} ${SELECTORS.SIDEBAR.TEXTAREA} {
         background-color: var(--tm-menu-bg) !important; /* White/Darker Contrast */
         color: var(--tm-text) !important;
         border: 1px solid var(--tm-border) !important;
      }
      [data-element-id="chat-folder"] ${SELECTORS.SIDEBAR.TEXTAREA}:focus,
      ${SELECTORS.SIDEBAR.CHAT_ITEM} ${SELECTORS.SIDEBAR.TEXTAREA}:focus,
      ${SELECTORS.SIDEBAR.SELECTED_CHAT_ITEM} ${SELECTORS.SIDEBAR.TEXTAREA}:focus,
      ${SELECTORS.SIDEBAR.BACKGROUND} ${SELECTORS.SIDEBAR.TEXTAREA}:focus {
         border-color: #2563eb !important; box-shadow: 0 0 0 2px rgba(37,99,235,0.2) !important;
      }

      /* Hover effects */
      ${SELECTORS.SIDEBAR.WORKSPACE} button span.hover\\:bg-white\\/20:hover,
      ${SELECTORS.SIDEBAR.WORKSPACE} button:hover span.text-white\\/70,
      ${SELECTORS.SIDEBAR.PROFILE_BUTTON}:hover { background-color: var(--tm-sidebar-hover-bg) !important; }
    `;

    sidebarStyle.innerHTML = styles;
    document.head.appendChild(sidebarStyle);

    // Set up observer to ensure styles persist
    new MutationObserver(() => {
      if (!document.getElementById('typingmindSidebarFixMerged'))
        document.head.appendChild(sidebarStyle);
    }).observe(document.body, { childList: true, subtree: true });

    console.log('TypingMind Sidebar Mods loaded.');
  }

  function fixSearchPlaceholder() {
      Utils.safe(() => {
          const input = document.querySelector(SELECTORS.SIDEBAR.SEARCH);
          if (input && !input.placeholder) input.setAttribute('placeholder', 'Search chats');
      }, 'fixSearchPlaceholder');
  }

  /* ---------------- Main Chat & Input Styles ---------------- */
  function applyMainStyles() {
      if (document.getElementById('typingmind-main-style')) return;

      const mainStyle = document.createElement('style');
      mainStyle.id = 'typingmind-main-style';
      mainStyle.textContent = `
        /* Base Font Styling */
        ${SELECTORS.CHAT_AREA.PROSE_TEXT},
        ${SELECTORS.CHAT_AREA.USER_MESSAGE_DIV} {
            font-family: ${CONFIG.fonts.primary} !important; font-size: 14px !important; line-height: 28px !important; color: var(--tm-text) !important;
        }
        ${SELECTORS.CHAT_AREA.PROSE_ROOT},
        ${SELECTORS.USER_MESSAGE_BLOCK} {
            font-family: ${CONFIG.fonts.primary} !important; font-size: 14px !important; line-height: 28px !important; color: var(--tm-text) !important;
        }
        /* Reset excluded elements */
        ${SELECTORS.CHAT_SPACE} .text-xs.text-gray-500.truncate,
        ${SELECTORS.CHAT_SPACE} .italic.truncate.hover\\:underline,
        ${SELECTORS.CHAT_SPACE} .flex.items-start.justify-center.flex-col.gap-2 {
            font-size: unset !important; line-height: unset !important; font-family: unset !important; color: unset !important;
        }

        /* User Message Layout & Styling */
        ${SELECTORS.CHAT_AREA.AVATAR_CONTAINER_USER} { display: none !important; } /* Hide user avatar */
        ${SELECTORS.USER_MESSAGE_BLOCK} {
            margin-left: auto !important; margin-right: 0 !important; display: block !important; max-width: 70% !important; /* Right align */
            border-radius: ${CONFIG.borderRadius.large} !important; background-color: var(--tm-user-msg-bg) !important;
            color: var(--tm-user-msg-text) !important; padding: ${CONFIG.spacing.small} !important; margin-bottom: ${CONFIG.spacing.small} !important;
        }
         /* Ensure inner div text color matches and background is transparent */
        ${SELECTORS.CHAT_AREA.USER_MESSAGE_DIV} {
             background-color: transparent !important;
             color: var(--tm-user-msg-text) !important;
        }


        /* Code Blocks */
        ${SELECTORS.CHAT_AREA.CODE_BLOCK_WRAPPER} {
            background-color: var(--tm-code-block-bg) !important; border: 1px solid var(--tm-code-block-border) !important; border-radius: ${CONFIG.borderRadius.small} !important;
            margin-top: ${CONFIG.spacing.small} !important; margin-bottom: ${CONFIG.spacing.small} !important; /* Add margins */
        }
         /* Ensure inner code elements use correct text color and font */
        ${SELECTORS.CHAT_AREA.CODE_BLOCK_WRAPPER} code {
             color: var(--tm-code-block-text) !important;
             background-color: transparent !important;
             font-family: ${CONFIG.fonts.code} !important;
        }
        ${SELECTORS.CHAT_AREA.CODE_BLOCK_STICKY_HEADER} {
            position: sticky !important; top: 0 !important; z-index: 10 !important; background-color: var(--tm-code-block-bg) !important;
            border-radius: ${CONFIG.borderRadius.small} ${CONFIG.borderRadius.small} 0 0 !important; border-bottom: 1px solid var(--tm-code-block-border) !important;
            padding: 4px 8px !important; /* Add padding to header */
        }
         /* Ensure inner pre has no border/bg and correct padding */
         ${SELECTORS.CHAT_AREA.CODE_BLOCK_INNER_PRE} {
            border: none !important; background: transparent !important; margin: 0 !important; padding: ${CONFIG.spacing.small} !important;
         }

         /* Inline Code Styling */
         ${SELECTORS.INLINE_CODE} { /* Target only inline code */
             background-color: var(--tm-code-inline-bg) !important;
             color: var(--tm-code-inline-text) !important;
             padding: 0.2em 0.4em !important;
             margin: 0 0.2em; /* Add slight margin */
             border-radius: 3px !important;
             font-family: ${CONFIG.fonts.code} !important;
             font-size: 90% !important;
             border: 1px solid var(--tm-border-subtle) !important;
             word-break: break-all; /* Allow breaking long inline code */
         }
         /* Ensure inline code within user messages also gets styled */
         ${SELECTORS.USER_MESSAGE_BLOCK} ${SELECTORS.INLINE_CODE} {
              color: var(--tm-code-inline-text) !important; /* May need different color than user msg text */
         }


        /* Sandbox output styling */
         ${SELECTORS.CHAT_AREA.SANDBOX_PRE} {
            background-color: var(--tm-sandbox-bg) !important; color: var(--tm-sandbox-text) !important; border: none !important; padding: ${CONFIG.spacing.small} !important; border-radius: 4px !important;
            white-space: pre-wrap !important; word-wrap: break-word !important; overflow-x: hidden !important;
            font-family: ${CONFIG.fonts.code} !important; /* Use code font */
        }

        /* General Chat Area */
        ${SELECTORS.CHAT_SPACE} { background-color: var(--tm-chat-bg) !important; }
        ${SELECTORS.CHAT_AREA.RESPONSE_BLOCK}:hover { background-color: transparent !important; } /* Remove hover bg */

        /* Lists */
        ${SELECTORS.CHAT_AREA.LIST} { margin: ${CONFIG.spacing.small} 0 !important; }
        ${SELECTORS.CHAT_AREA.LIST_ITEM} { margin: 0.3rem 0 !important; }
        ${SELECTORS.CHAT_AREA.LIST_ITEM}::marker { color: var(--tm-text) !important; font-weight: bold !important; }
        ${SELECTORS.CHAT_AREA.UL_ITEM} { list-style-type: disc !important; padding-left: ${CONFIG.spacing.medium} !important; }
        ${SELECTORS.CHAT_AREA.OL_ITEM} { list-style-type: decimal !important; padding-left: ${CONFIG.spacing.medium} !important; }

        /* Headers */
        ${SELECTORS.CHAT_AREA.H1} { font-size: 2em !important; line-height: 1.3 !important; margin: 0.5em 0 !important; border-bottom: 1px solid var(--tm-border-subtle); padding-bottom: 0.3em; color: var(--tm-text) !important; }
        ${SELECTORS.CHAT_AREA.H2} { font-size: 1.5em !important; line-height: 1.3 !important; margin: 0.5em 0 !important; border-bottom: 1px solid var(--tm-border-subtle); padding-bottom: 0.3em; color: var(--tm-text) !important; }
        ${SELECTORS.CHAT_AREA.H3} { font-size: 1.25em !important; line-height: 1.3 !important; margin: 0.5em 0 !important; color: var(--tm-text) !important; }

        /* Thought section styling - Rely on classes added by JS */
        .tm-thought-content {
            color: var(--tm-thought-text) !important;
            background-color: var(--tm-thought-bg) !important;
            padding: ${CONFIG.spacing.small} ${CONFIG.spacing.medium} !important;
            border-left: 3px solid var(--tm-thought-text) !important;
            margin-left: 0 !important;
            margin-top: ${CONFIG.spacing.small} !important;
            border-radius: ${CONFIG.borderRadius.small} !important;
            font-style: normal !important; /* Remove italics from container */
        }
         /* Style text elements inside thoughts */
        .tm-thought-content *:not(code):not(pre):not(summary) {
            color: var(--tm-thought-text) !important;
            font-size: ${CONFIG.fonts.thought.size} !important;
            line-height: ${CONFIG.fonts.thought.lineHeight} !important;
            font-style: normal !important; /* Use normal style in native dark */
            background-color: transparent !important;
        }
         /* Style the summary toggle itself */
         .tm-thought-summary {
              color: var(--tm-text-secondary) !important;
              font-style: normal !important; /* No italics for native dark */
              cursor: pointer;
              padding: 2px 4px;
              border-radius: 3px;
              display: inline-block;
              margin-bottom: 2px; /* Add space below summary when open */
         }
         .tm-thought-summary:hover {
             background-color: var(--tm-accent-bg);
         }
         details[open] > .tm-thought-summary {
              margin-bottom: ${CONFIG.spacing.small} !important;
         }
          /* Code inside thoughts - inherit inline style */
         .tm-thought-content code {
             font-style: normal !important;
             font-size: 90% !important; /* Match inline code */
             line-height: inherit !important;
             background-color: var(--tm-code-inline-bg) !important;
             color: var(--tm-code-inline-text) !important;
             padding: 0.1em 0.3em !important;
             border-radius: 3px !important;
             border: 1px solid var(--tm-border-subtle) !important;
         }
      `;
      document.head.appendChild(mainStyle);
  }

  function applyInputStyles() {
      if (document.getElementById('typingmind-input-style')) return;

      const inputStyle = document.createElement('style');
      inputStyle.id = 'typingmind-input-style';
      inputStyle.textContent = `
        ${SELECTORS.CHAT_AREA.INPUT_CONTAINER} {
            background-color: var(--tm-input-bg) !important;
            border-radius: ${CONFIG.borderRadius.medium} !important; /* Less rounded like native */
            margin-bottom: ${CONFIG.spacing.medium} !important;
            border: 1px solid var(--tm-border) !important;
            padding: 2px;
        }
        ${SELECTORS.CHAT_AREA.INPUT_TEXTBOX} {
            font-family: ${CONFIG.fonts.primary} !important;
            font-size: 16px !important; line-height: 24px !important; min-height: 44px !important;
            padding: 0.75rem 1rem !important;
            border-radius: ${CONFIG.borderRadius.medium} !important; /* Match container */
            color: var(--tm-input-text) !important;
            background-color: transparent !important;
            border: none !important;
            outline: none !important;
            margin: 0 !important;
            padding-top: ${CONFIG.spacing.small} !important;
            padding-bottom: ${CONFIG.spacing.small} !important;
            padding-right: 55px !important; /* Increased padding for Send button */
            overflow-wrap: break-word !important; tab-size: 4 !important; text-size-adjust: 100% !important;
            white-space: pre-wrap !important; font-variant-ligatures: none !important; -webkit-tap-highlight-color: transparent !important;
        }
        ${SELECTORS.CHAT_AREA.INPUT_TEXTBOX}::placeholder { color: var(--tm-input-placeholder) !important; opacity: 1 !important; }

        /* Action buttons styling (excluding send, more-options, replace-only) */
        ${SELECTORS.CHAT_AREA.INPUT_ACTION_BUTTONS} {
            transition: all 0.2s ease !important; color: var(--tm-text-secondary) !important; /* Dimmer icons like native */
        }
        ${SELECTORS.CHAT_AREA.INPUT_ACTION_BUTTONS} svg {
            width: 20px !important; height: 20px !important; vertical-align: middle !important;
        }
        ${SELECTORS.CHAT_AREA.INPUT_ACTION_BUTTONS}:hover {
            background-color: var(--tm-button-secondary-hover-bg) !important;
            color: var(--tm-text) !important;
            border-radius: ${CONFIG.borderRadius.small} !important;
        }
         /* Remove top border for native look */
        ${SELECTORS.CHAT_AREA.INPUT_ACTIONS} { padding: ${CONFIG.spacing.small} 0.75rem !important; border-top: none; margin-top: 0; }

        /* Send button (Native Blue in Dark Mode) */
        ${SELECTORS.CHAT_AREA.SEND_BUTTON} {
            background-color: var(--tm-button-primary-bg) !important;
            border-color: transparent !important;
            color: var(--tm-button-primary-text) !important;
            border-radius: ${CONFIG.borderRadius.medium} !important;
            height: 36px !important;
            min-width: 44px; /* Ensure minimum width */
            padding: 0 12px !important;
            position: absolute !important;
            right: 10px !important;
            bottom: 10px !important;
            box-shadow: none !important; /* Remove potential theme shadows */
        }
        ${SELECTORS.CHAT_AREA.SEND_BUTTON}:hover {
            background-color: var(--tm-button-primary-hover-bg) !important;
            border-color: transparent !important;
        }

        /* More Options button - make it look like other action buttons */
         ${SELECTORS.CHAT_AREA.MORE_OPTIONS_BUTTON} {
             background-color: transparent !important;
             border-color: transparent !important;
             color: var(--tm-text-secondary) !important;
             transition: all 0.2s ease !important;
             box-shadow: none !important;
             padding: 0 !important; /* Reset padding */
             width: 36px !important; /* Match other action buttons size */
             height: 36px !important;
         }
         ${SELECTORS.CHAT_AREA.MORE_OPTIONS_BUTTON}:hover {
             background-color: var(--tm-button-secondary-hover-bg) !important;
             color: var(--tm-text) !important;
             border-radius: ${CONFIG.borderRadius.small} !important;
         }
         ${SELECTORS.CHAT_AREA.MORE_OPTIONS_BUTTON} svg { /* Ensure icon size matches */
             width: 20px !important; height: 20px !important;
         }

         /* Adjust layout for better button alignment */
         ${SELECTORS.CHAT_AREA.INPUT_ACTIONS} > div:last-child { /* Target right-side button container */
              position: absolute;
              right: 58px; /* Position it next to Send button */
              bottom: 10px;
              gap: 4px !important; /* Reduce gap */
         }
      `;
      document.head.appendChild(inputStyle);
  }

  // Text Parsing & Formatting functions (multiStepParse, processMessageContent, styleUserMessageEl, handleJsonCodeBlock, styleSandboxOutputs) remain the same as v4.1...
   const multiStepParse = txt =>
      Utils.safe(() => {
          let res = txt;
          // Triple backticks with optional language
          res = res.replace(/```(\w+)?\s*([\s\S]*?)\s*```/g, (_, lang, code) => {
              lang = lang ? lang.toLowerCase() : '';
              // Use CSS variables for styling
              return `<pre style="background:var(--tm-code-block-bg); border:1px solid var(--tm-code-block-border); padding:6px; border-radius:${CONFIG.borderRadius.small}; overflow-x:auto; margin:0;" class="code-block${lang ? ' language-' + lang : ''}"><code style="font-family:${CONFIG.fonts.code}; font-size:13px; line-height:20px; white-space:pre; display:block; overflow-wrap:normal; word-break:normal; color: var(--tm-code-block-text); background: transparent;">${Utils.escapeHtml(code) /* Escape inner code */}</code></pre>`;
          });
          // Inline code (backticks)
          res = res.replace(/`([^`]+)`/g, (_, inline) =>
              `<code class="inline-code" style="background-color:var(--tm-code-inline-bg); color: var(--tm-code-inline-text); border: 1px solid var(--tm-border-subtle); padding:0.2em 0.4em; border-radius:3px; font-family:${CONFIG.fonts.code}; font-size:90%;">${Utils.escapeHtml(inline)}</code>`
          );
          // Encoded single quotes (treat like inline code)
          res = res.replace(/&#039;([^&#]+)&#039;/g, (_, content) =>
              `<code class="inline-code" style="background-color:var(--tm-code-inline-bg); color: var(--tm-code-inline-text); border: 1px solid var(--tm-border-subtle); padding:0.2em 0.4em; border-radius:3px; font-family:${CONFIG.fonts.code}; font-size:90%;">${Utils.escapeHtml(content)}</code>`
          );
          return res;
      }, 'multiStepParse');

  const processMessageContent = safeTxt =>
      Utils.safe(() => {
          const tests = [];
          let proc = safeTxt.replace(/(&lt;test&gt;)([\s\S]*?)(&lt;\/test&gt;)/g, (m, open, inner, close) => {
              const ph = `__TEST_${tests.length}__`;
              tests.push({ open, inner, close });
              return ph;
          });
          proc = multiStepParse(proc); // Parse outer content first
          tests.forEach(({ open, inner, close }, i) => {
               // Parse inner content of test tag separately
              const parsedInner = multiStepParse(Utils.escapeHtml(inner)); // Escape inner HTML *before* parsing
              // Style test content like inline code
              proc = proc.replace(
                  `__TEST_${i}__`,
                  // Re-insert original tags, wrap parsed content in a styled code tag
                  `${open}<code class="inline-code test-content" style="background-color:var(--tm-code-inline-bg); color: var(--tm-code-inline-text); border: 1px solid var(--tm-border-subtle); padding:0.2em 0.4em; border-radius:3px; font-family:${CONFIG.fonts.code}; font-size:90%;">${parsedInner}</code>${close}`
              );
          });
          return proc;
      }, 'processMessageContent');

  function styleUserMessageEl(msgEl) {
      Utils.safe(() => {
          if (msgEl.hasAttribute('data-processed')) return; // Check first
          msgEl.setAttribute('data-processed', 'true');

          const raw = msgEl.textContent || '';
           // Only process if there are special chars OR <test> tag might exist
          if (!/[<`']/.test(raw) && !raw.includes('<test>')) {
               // Apply basic styling even if no parsing needed (font applied by CSS)
               // msgEl.style.fontFamily = CONFIG.fonts.primary; // Handled by CSS
               return;
          }

          const safeText = Utils.escapeHtml(raw);
          const processed = processMessageContent(safeText);
          const container = msgEl.querySelector('div');

          let targetContainer = container;
          if (!targetContainer) {
              msgEl.innerHTML = ''; // Clear existing potentially incorrect structure
              targetContainer = document.createElement('div');
              // Basic styles inherited via CSS, no need to set inline here usually
              msgEl.appendChild(targetContainer);
          }

           // Apply processed HTML safely
           targetContainer.innerHTML = processed || ''; // Use empty string if processed is null/undefined

      }, 'styleUserMessageEl');
  }

  function handleJsonCodeBlock(codeEl) {
      Utils.safe(() => {
          const content = codeEl.textContent.trim();
          if (
              !(content.startsWith('{') && content.endsWith('}') && content.includes('"code"'))
          )
              return;
          try {
              let json = JSON.parse(content);
              if (typeof json.code !== 'string') return;
              let clean = json.code.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
              codeEl.textContent = clean; // Set the cleaned code

              // Apply styles using CSS variables via parent pre's class or direct style
               codeEl.style.whiteSpace = 'pre-wrap';
               codeEl.style.wordWrap = 'break-word';
               codeEl.style.fontFamily = CONFIG.fonts.code;
               codeEl.style.color = 'var(--tm-code-block-text)'; // Ensure text color is set
               codeEl.style.background = 'transparent'; // No background on code itself

              const pre = codeEl.closest('pre');
              if (pre) {
                   pre.style.whiteSpace = 'pre-wrap';
                   pre.style.wordWrap = 'break-word';
                   pre.style.backgroundColor = 'var(--tm-code-block-bg)';
                   pre.style.border = `1px solid var(--tm-code-block-border)`;
                   pre.style.borderRadius = CONFIG.borderRadius.small;
                   pre.style.color = 'var(--tm-code-block-text)'; // Also set on pre for safety
                   pre.style.padding = CONFIG.spacing.small; // Add padding to pre
              }
          } catch (e) {
              console.error('TypingMind Theme: Error parsing JSON code block:', e, content.substring(0, 100) + '...');
          }
      }, 'handleJsonCodeBlock');
  }

  function styleSandboxOutputs() {
       Utils.safe(() => {
            document.querySelectorAll(SELECTORS.RESULT_BLOCKS).forEach(preEl => {
                if (preEl.closest('.editing') || preEl.hasAttribute('data-sandbox-styled')) return; // Skip if already styled
                if (
                    preEl.textContent.includes('SANDBOX_ID') ||
                    preEl.textContent.includes('STANDARD_OUTPUT')
                ) {
                     // Apply styles using CSS variables
                     preEl.style.whiteSpace = 'pre-wrap';
                     preEl.style.wordWrap = 'break-word';
                     preEl.style.overflowX = 'hidden';
                     preEl.style.background = 'var(--tm-sandbox-bg)';
                     preEl.style.color = 'var(--tm-sandbox-text)';
                     preEl.style.padding = CONFIG.spacing.small;
                     preEl.style.borderRadius = '4px';
                     preEl.style.border = 'none'; // Override default borders if any
                     preEl.style.fontFamily = CONFIG.fonts.code; // Use code font
                     preEl.setAttribute('data-sandbox-styled', 'true'); // Mark as styled

                    const container = preEl.closest('.pb-6');
                    if (container) container.style.overflowX = 'hidden';
                }
            });
       }, 'styleSandboxOutputs');
  }


  /* ---------------- Thought Section Styling ---------------- */
    // JS part just adds classes/attributes for CSS targeting
    function styleThoughtSections() {
      Utils.safe(() => {
        document.querySelectorAll('details:has(summary span:contains("Thought for"))').forEach(details => {
           if (details.hasAttribute('data-thought-styled')) return; // Skip if already processed

            const contentDiv = details.querySelector('div:not(summary)');
            if (contentDiv) {
                contentDiv.classList.add('tm-thought-content'); // Add class for CSS
            }
            const summary = details.querySelector('summary');
             if (summary) {
                 summary.classList.add('tm-thought-summary'); // Add class for CSS
             }

             details.setAttribute('data-thought-styled', 'true');
        });
      }, 'styleThoughtSections');
    }


  /* ---------------- Date and Time Formatting ---------------- */
  // DateTimeFormatters, formatTimestamps, reformatDateDisplays remain the same as v4.1...
  const DateTimeFormatters = {
      convertTo12HourFormat: (timeStr) => {
          return Utils.safe(() => {
              const [hoursStr, minutes] = timeStr.split(':');
              if (hoursStr === undefined || minutes === undefined) return timeStr; // Invalid format
              const hours = parseInt(hoursStr, 10);
              if (isNaN(hours)) return timeStr; // Invalid hours

              const period = hours >= 12 ? 'PM' : 'AM';
              const hours12 = hours % 12 || 12;
              const today = new Date();
              const dayAbbr = CONFIG.formats.daysAbbr[today.getDay()];
              return `${hours12}:${minutes.padStart(2, '0')} ${period} ${dayAbbr}`; // Pad minutes
          }, 'convertTo12HourFormat') || timeStr; // Return original on error
      },
      formatFullDate: (dateStr) => {
         return Utils.safe(() => {
              const parts = dateStr.trim().split(' ');
              if (parts.length !== 3) return dateStr;

              const day = parseInt(parts[0], 10);
              const monthAbbr = parts[1];
              const year = parseInt(parts[2], 10); // Parse year as int
              if (isNaN(day) || isNaN(year)) return dateStr; // Validate parts


              const fullMonth = CONFIG.formats.months[monthAbbr];
              if (!fullMonth) return dateStr; // Invalid month

              const monthIndex = Object.keys(CONFIG.formats.months).indexOf(monthAbbr);
              if (monthIndex === -1) return dateStr;

              const dateObj = new Date(year, monthIndex, day);
               // Check if date is valid after creation
               if (isNaN(dateObj.getTime())) return dateStr;

              const dayOfWeek = CONFIG.formats.daysOfWeek[dateObj.getDay()];
              return `${fullMonth} ${day}, ${year} ${dayOfWeek}`;
          }, 'formatFullDate') || dateStr; // Return original on error
      }
  };

  function formatTimestamps() {
      Utils.safe(() => {
          document.querySelectorAll(SELECTORS.TIMESTAMP_BUTTONS).forEach(button => {
              const currentText = button.textContent.trim();
              const hasDay = new RegExp(`\\b(${CONFIG.formats.daysAbbr.join('|')})\\b`).test(currentText);
              const isProcessed = button.hasAttribute('data-time-processed');

              if (!isProcessed) {
                  if (/^\d{1,2}:\d{2}$/.test(currentText)) { // Match HH:MM
                      const time12Hour = DateTimeFormatters.convertTo12HourFormat(currentText);
                      if (time12Hour !== currentText) { // Only update if format changed
                          button.textContent = time12Hour;
                          button.setAttribute('data-time-processed', 'true');
                      }
                  } else if (currentText.match(/^\d{1,2}:\d{2}\s(AM|PM)$/) && !hasDay) {
                       // Already 12hr format but missing day
                       const today = new Date();
                       const dayAbbr = CONFIG.formats.daysAbbr[today.getDay()];
                       button.textContent = `${currentText} ${dayAbbr}`;
                       button.setAttribute('data-time-processed', 'true'); // Mark it now
                  }
                  // If already has day, assume it's fine or handled by previous logic
              } else if (isProcessed && !hasDay && currentText.match(/^\d{1,2}:\d{2}\s(AM|PM)$/)) {
                   // Was processed to 12hr but day was missing (e.g., loaded later)
                   const today = new Date();
                   const dayAbbr = CONFIG.formats.daysAbbr[today.getDay()];
                   button.textContent = `${currentText} ${dayAbbr}`;
              }
          });
      }, 'formatTimestamps');
  }

  function reformatDateDisplays() {
      Utils.safe(() => {
          document.querySelectorAll(SELECTORS.DATE_SPANS).forEach(span => {
              if (span.hasAttribute('data-date-processed')) return;
              const dateText = span.textContent.trim();
              if (/^\d{1,2}\s[A-Za-z]{3}\s\d{4}$/.test(dateText)) { // Matches "DD MMM YYYY"
                  const formattedDate = DateTimeFormatters.formatFullDate(dateText);
                   if (formattedDate !== dateText) { // Only update if format changed
                       span.textContent = formattedDate;
                       span.setAttribute('data-date-processed', 'true');
                   }
              }
          });
      }, 'reformatDateDisplays');
  }

  /* ---------------- Main Display Handler ---------------- */
  const improveTextDisplay = Utils.debounce(
      () =>
          Utils.safe(() => {
              // Process user messages
              document.querySelectorAll(SELECTORS.USER_MESSAGE_BLOCK).forEach(msg => {
                  if (msg.closest('.editing') || msg.hasAttribute('data-processed')) return;
                  styleUserMessageEl(msg);
              });

              // Process code blocks (incl JSON)
              document.querySelectorAll(SELECTORS.CODE_BLOCKS).forEach(code => {
                  if (!code.closest('.editing') && !code.closest(SELECTORS.RESULT_BLOCKS)) {
                       handleJsonCodeBlock(code);
                  }
              });

              // Style only inline code blocks (outside pre)
              document.querySelectorAll(SELECTORS.INLINE_CODE).forEach(inlineCode => {
                  if (!inlineCode.closest('pre') && !inlineCode.closest('.tm-thought-content') && !inlineCode.hasAttribute('data-styled')) {
                       // Style using CSS variables defined in applyMainStyles
                       inlineCode.classList.add('inline-code'); // Add class if needed by CSS
                       // Inline styles are less preferred now if CSS handles it
                       inlineCode.setAttribute('data-styled', 'true');
                  }
              });

              // Apply other display enhancements
              styleSandboxOutputs();
              styleThoughtSections();
              formatTimestamps();
              reformatDateDisplays();
          }, 'improveTextDisplay'),
      150 // Debounce time
  );

  /* ---------------- Initialization ---------------- */
  function initTheme() {
    console.log('TypingMind GPT-Style Theme v4.2 (Native Dark): Initializing...');
    injectCssVariables();
    applySidebarStyles();
    fixSearchPlaceholder();
    applyMainStyles();
    applyInputStyles();

    const observeDomChanges = () => {
      Utils.safe(() => {
        const observer = new MutationObserver(mutations => {
          let needsUpdate = false;
          for (const mutation of mutations) {
              if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                   for (const node of mutation.addedNodes) {
                       if (node.nodeType === 1) {
                           if (node.matches || node.querySelector) {
                                if (node.matches(SELECTORS.USER_MESSAGE_BLOCK) || node.querySelector(SELECTORS.USER_MESSAGE_BLOCK) ||
                                    node.matches(SELECTORS.CHAT_SPACE) || node.querySelector(SELECTORS.CHAT_SPACE) ||
                                    node.matches(SELECTORS.SIDEBAR.MIDDLE) || node.querySelector(SELECTORS.SIDEBAR.MIDDLE) ||
                                    node.matches('pre') || node.querySelector('pre') ||
                                    node.matches('details') || node.querySelector('details') ||
                                    node.matches(SELECTORS.TIMESTAMP_BUTTONS) || node.querySelector(SELECTORS.TIMESTAMP_BUTTONS) ||
                                    node.matches(SELECTORS.DATE_SPANS) || node.querySelector(SELECTORS.DATE_SPANS)) {
                                    needsUpdate = true; break;
                                }
                           }
                       }
                   }
              } else if (mutation.type === 'characterData' && mutation.target.parentNode?.closest(SELECTORS.CHAT_SPACE)) {
                   needsUpdate = true;
              } else if (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
                   // Check if the target is relevant before triggering update
                   if (mutation.target.closest(SELECTORS.CHAT_SPACE) || mutation.target.closest(SELECTORS.SIDEBAR.BACKGROUND)) {
                       needsUpdate = true;
                   }
              }
              if (needsUpdate) break;
          }

          if (needsUpdate) {
            improveTextDisplay();
          }
        });

        observer.observe(document.body, {
          childList: true, subtree: true, attributes: true, characterData: true,
          attributeFilter: ['style', 'class', 'id', 'data-processed']
        });
        console.log('TypingMind Theme: MutationObserver started.');
      }, 'observeDomChanges');
    };

    if (document.readyState === 'loading') {
       console.log('TypingMind Theme: DOM not ready, adding listener.');
       document.addEventListener('DOMContentLoaded', () => {
            console.log('TypingMind Theme: DOMContentLoaded fired.');
            improveTextDisplay();
            observeDomChanges();
       });
    } else {
       console.log('TypingMind Theme: DOM already ready, running now.');
       improveTextDisplay();
       observeDomChanges();
    }

    console.log('TypingMind GPT-Style Theme v4.2 (Native Dark): Initialized.');
  }

  // --- Start the theme ---
  initTheme();

})();
