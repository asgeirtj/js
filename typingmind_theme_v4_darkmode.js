// TypingMind GPT-Style Theme v4.1 (System Dark Mode)
// Description: Feature-rich ChatGPT-style theme for TypingMind with system dark mode support, date/time formatting, and thought styling.
// Origin: Based on shaggy2626's v4 theme, converted to support system dark mode by Ásgeir.
// Version: 4.1

(function () {
  'use strict';

  /**
   * TypingMind GPT-Style Theme v4.1 (System Dark Mode)
   * Configuration and selector definitions
   */
  const CONFIG = {
    light: { // Original Light Mode Colors
      background: '#F9F9F9',
      text: '#000000', // Pure black
      textSecondary: '#555555', // Darker gray for secondary text
      border: '#CCCCCC',
      borderSubtle: '#E0E0E0', // Lighter border
      accent: '#E3E3E3', // Accent background (buttons, highlights)
      accentText: '#000000',
      input: {
        background: '#F4F4F4',
        text: '#0D0D0D', // rgb(13, 13, 13)
        placeholder: '#8E8E8E', // rgb(142, 142, 142)
        border: '#CCCCCC', // Use main border color for input border consistency
      },
      button: {
        primary: '#0D0D0D', // rgb(13, 13, 13)
        primaryText: '#FFFFFF',
        primaryHover: 'rgba(13, 13, 13, 0.8)',
        secondary: 'rgba(0, 0, 0, 0.1)', // Generic hover/secondary button bg
      },
      code: {
        background: '#f6f8fa', // Light gray for inline code
        text: '#24292E',      // Dark text for inline code
        blockBackground: '#F9F9F9',
        blockText: '#24292E',
        blockBorder: '#CCCCCC',
      },
      thought: {
        text: '#00529B', // Darker Blue color for thought sections
        background: '#BDE5F8', // Light blue background
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
      chatAreaBackground: '#FFFFFF', // Explicit white for light chat area
      userMessageBackground: '#F4F4F4',
      userMessageText: '#0D0D0D',
      sidebarTextOverride: '#000000', // Force black text in light sidebar
      sidebarHoverBackground: 'rgba(0, 0, 0, 0.1)',

    },
    dark: { // Dark Mode Colors
      background: '#2D2D2D', // Dark gray main background
      text: '#EAEAEA', // Off-white text
      textSecondary: '#AAAAAA', // Lighter gray for secondary text
      border: '#404040', // Darker border
      borderSubtle: '#353535', // Very dark subtle border
      accent: '#3D3D3D', // Darker accent background
      accentText: '#FFFFFF',
      input: {
        background: '#2D2D2D', // Dark input background
        text: '#FFFFFF',
        placeholder: 'rgba(255, 255, 255, 0.6)',
        border: '#404040', // Use main dark border color
      },
      button: {
        primary: '#4A5568', // Grayish-blue primary button
        primaryText: '#FFFFFF',
        primaryHover: '#2D3748', // Darker hover for primary
        secondary: 'rgba(255, 255, 255, 0.1)', // Generic hover/secondary button bg
      },
      code: {
        background: '#1E1E1E', // Very dark background for inline code
        text: '#D4D4D4',      // Light gray text for inline code
        blockBackground: '#1E1E1E',
        blockText: '#D4D4D4',
        blockBorder: '#404040',
      },
      thought: {
        text: '#90CAF9', // Lighter Blue color for thought sections
        background: '#1E3A5F', // Dark blue background
      },
      sandbox: {
        background: '#1E1E1E', // Consistent dark code bg
        text: '#D4D4D4',     // Consistent dark code text
      },
      menu: {
          background: '#2d2d2d',
          text: '#FFFFFF',
      },
      tagPanel: {
          background: '#2d2d2d',
          border: '#404040',
          text: '#FFFFFF',
          inputBackground: '#1e1e1e',
          inputBorder: '#404040',
          inputText: '#FFFFFF',
      },
       scrollbar: {
          track: '#353535',
          thumb: '#555555',
          thumbHover: '#666666',
      },
       chatAreaBackground: '#1b1d21', // Specific dark chat area bg
       userMessageBackground: '#2D2D2D',
       userMessageText: '#EAEAEA',
       sidebarTextOverride: '#EAEAEA', // Force light text in dark sidebar
       sidebarHoverBackground: 'rgba(255, 255, 255, 0.1)',
    },
    fonts: {
      primary: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
      code: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
      thought: {
        size: '12px',
        lineHeight: '20px'
      }
    },
    spacing: { small: '8px', medium: '1rem', large: '1.5rem' }, // Use px for small spacing consistency
    borderRadius: { small: '0.5rem', medium: '1rem', large: '1.5rem' },
    formats: {
      months: { 'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December' },
      daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      daysAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  };

  const SELECTORS = {
    CODE_BLOCKS: 'pre code', // Includes inline and block code within pre
    INLINE_CODE: ':not(pre) > code', // Attempt to select only inline code
    RESULT_BLOCKS: 'details pre',
    USER_MESSAGE_BLOCK: 'div[data-element-id="user-message"]',
    CHAT_SPACE: '[data-element-id="chat-space-middle-part"]',
    THOUGHT_DETAILS: 'details summary:has(span:contains("Thought for"))', // Target summary for check
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
      TEXTAREA: 'textarea', // General selector for textareas in sidebar context
      PROFILE_BUTTON: '[data-element-id="workspace-profile-button"]'
    },
    CHAT_AREA: {
        RESPONSE_BLOCK: '[data-element-id="response-block"]',
        AVATAR_CONTAINER_USER: '[data-element-id="response-block"]:has([data-element-id="user-message"]) [data-element-id="chat-avatar-container"]',
        PROSE_TEXT: '.prose.max-w-full *:not(pre, pre *, code, code *, .flex.items-start.justify-center.flex-col.gap-2 *, .text-xs.text-gray-500.truncate, .italic.truncate.hover\\:underline, h1, h2, h3, h4, h5, h6)',
        USER_MESSAGE_DIV: '[data-element-id="user-message"] > div',
        PROSE_ROOT: '.prose.max-w-full',
        CODE_BLOCK_WRAPPER: 'pre:has(div.relative)',
        SANDBOX_PRE: 'pre.mb-2.overflow-auto.text-sm.border.border-gray-200.rounded.bg-gray-100', // Selector for sandbox pre blocks
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
                  /* Dark Mode Variables */
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
                  --tm-button-primary-bg: ${CONFIG.dark.button.primary};
                  --tm-button-primary-text: ${CONFIG.dark.button.primaryText};
                  --tm-button-primary-hover-bg: ${CONFIG.dark.button.primaryHover};
                  --tm-button-secondary-hover-bg: ${CONFIG.dark.button.secondary};
                  --tm-code-inline-bg: ${CONFIG.dark.code.background};
                  --tm-code-inline-text: ${CONFIG.dark.code.text};
                  --tm-code-block-bg: ${CONFIG.dark.code.blockBackground};
                  --tm-code-block-text: ${CONFIG.dark.code.blockText};
                  --tm-code-block-border: ${CONFIG.dark.code.blockBorder};
                  --tm-thought-text: ${CONFIG.dark.thought.text};
                  --tm-thought-bg: ${CONFIG.dark.thought.background};
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

      /* New chat button */
      ${SELECTORS.SIDEBAR.NEW_CHAT} { background-color: var(--tm-accent-bg) !important; color: var(--tm-accent-text) !important; }
      ${SELECTORS.SIDEBAR.NEW_CHAT} * { color: var(--tm-accent-text) !important; }

      /* Search bar */
      ${SELECTORS.SIDEBAR.SEARCH} {
         background-color: var(--tm-menu-bg) !important; /* Use menu bg for contrast */
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
      ${SELECTORS.SIDEBAR.CHAT_ITEM}:hover,
      ${SELECTORS.SIDEBAR.SELECTED_CHAT_ITEM} { background-color: var(--tm-accent-bg) !important; }

      /* Chat item buttons (hide by default, show on hover) */
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
      ${SELECTORS.HEADLESS_UI_PORTAL} ${SELECTORS.MENU_ITEM}:hover { background-color: var(--tm-accent-bg) !important; }


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
      ${SELECTORS.SIDEBAR.TAG_PANEL} input[type="checkbox"]:checked { background-color: #2563eb !important; border-color: #2563eb !important; }
      ${SELECTORS.SIDEBAR.TAG_PANEL} input[type="checkbox"]:checked::after {
         content: '' !important; position: absolute !important;
         left: 5px !important; top: 2px !important; width: 4px !important; height: 8px !important;
         border: solid white !important; border-width: 0 2px 2px 0 !important; transform: rotate(45deg) !important;
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
            font-family: ${CONFIG.fonts.primary}; font-size: 14px !important; line-height: 28px !important; color: var(--tm-text) !important;
        }
        ${SELECTORS.CHAT_AREA.PROSE_ROOT},
        ${SELECTORS.USER_MESSAGE_BLOCK} {
            font-family: ${CONFIG.fonts.primary}; font-size: 14px !important; line-height: 28px !important; color: var(--tm-text) !important;
        }
        /* Reset excluded elements */
        ${SELECTORS.CHAT_SPACE} .text-xs.text-gray-500.truncate,
        ${SELECTORS.CHAT_SPACE} .italic.truncate.hover\\:underline,
        ${SELECTORS.CHAT_SPACE} .flex.items-start.justify-center.flex-col.gap-2 {
            font-size: unset !important; line-height: unset !important; font-family: unset !important; color: unset !important;
        }

        /* User Message Layout & Styling */
        ${SELECTORS.CHAT_AREA.AVATAR_CONTAINER_USER} { display: none !important; }
        ${SELECTORS.USER_MESSAGE_BLOCK} {
            margin-left: auto !important; margin-right: 0 !important; display: block !important; max-width: 70% !important;
            border-radius: ${CONFIG.borderRadius.large} !important; background-color: var(--tm-user-msg-bg) !important;
            color: var(--tm-user-msg-text) !important; padding: ${CONFIG.spacing.small} !important; margin-bottom: ${CONFIG.spacing.small} !important;
        }
         /* Ensure inner div text color matches */
        ${SELECTORS.CHAT_AREA.USER_MESSAGE_DIV} {
             background-color: transparent !important; /* Make inner div transparent */
             color: var(--tm-user-msg-text) !important;
        }


        /* Code Blocks */
        ${SELECTORS.CHAT_AREA.CODE_BLOCK_WRAPPER} {
            background-color: var(--tm-code-block-bg) !important; border: 1px solid var(--tm-code-block-border) !important; border-radius: ${CONFIG.borderRadius.small} !important;
        }
         /* Ensure inner code elements use correct text color */
        ${SELECTORS.CHAT_AREA.CODE_BLOCK_WRAPPER} code {
             color: var(--tm-code-block-text) !important;
             background-color: transparent !important; /* Ensure no extra background */
             font-family: ${CONFIG.fonts.code} !important; /* Ensure code font */
        }
        ${SELECTORS.CHAT_AREA.CODE_BLOCK_STICKY_HEADER} {
            position: sticky !important; top: 0 !important; z-index: 10 !important; background-color: var(--tm-code-block-bg) !important;
            border-radius: ${CONFIG.borderRadius.small} ${CONFIG.borderRadius.small} 0 0 !important; border-bottom: 1px solid var(--tm-code-block-border) !important;
        }
         /* Ensure inner pre has no border/bg and correct padding */
         ${SELECTORS.CHAT_AREA.CODE_BLOCK_INNER_PRE} {
            border: none !important; background: transparent !important; margin: 0 !important; padding: ${CONFIG.spacing.small} !important; /* Add padding here */
         }

         /* Inline Code Styling */
         ${SELECTORS.INLINE_CODE} {
             background-color: var(--tm-code-inline-bg) !important;
             color: var(--tm-code-inline-text) !important;
             padding: 0.2em 0.4em !important;
             border-radius: 3px !important;
             font-family: ${CONFIG.fonts.code} !important;
             font-size: 90% !important;
             border: 1px solid var(--tm-border-subtle) !important; /* Add subtle border */
         }


        /* Sandbox output styling */
         ${SELECTORS.CHAT_AREA.SANDBOX_PRE} {
            background-color: var(--tm-sandbox-bg) !important; color: var(--tm-sandbox-text) !important; border: none !important; padding: ${CONFIG.spacing.small} !important; border-radius: 4px !important;
            white-space: pre-wrap !important; word-wrap: break-word !important; overflow-x: hidden !important;
            font-family: ${CONFIG.fonts.code} !important; /* Use code font */
        }

        /* General Chat Area */
        ${SELECTORS.CHAT_SPACE} { background-color: var(--tm-chat-bg) !important; }
        ${SELECTORS.CHAT_AREA.RESPONSE_BLOCK}:hover { background-color: transparent !important; }

        /* Lists */
        ${SELECTORS.CHAT_AREA.LIST} { margin: ${CONFIG.spacing.small} 0 !important; }
        ${SELECTORS.CHAT_AREA.LIST_ITEM} { margin: 0.3rem 0 !important; }
        ${SELECTORS.CHAT_AREA.LIST_ITEM}::marker { color: var(--tm-text) !important; font-weight: bold !important; }
        ${SELECTORS.CHAT_AREA.UL_ITEM} { list-style-type: disc !important; padding-left: ${CONFIG.spacing.medium} !important; } /* Slightly more padding for lists */
        ${SELECTORS.CHAT_AREA.OL_ITEM} { list-style-type: decimal !important; padding-left: ${CONFIG.spacing.medium} !important; }

        /* Headers */
        ${SELECTORS.CHAT_AREA.H1} { font-size: 2em !important; line-height: 1.3 !important; margin: 0.5em 0 !important; border-bottom: 1px solid var(--tm-border-subtle); padding-bottom: 0.3em; }
        ${SELECTORS.CHAT_AREA.H2} { font-size: 1.5em !important; line-height: 1.3 !important; margin: 0.5em 0 !important; border-bottom: 1px solid var(--tm-border-subtle); padding-bottom: 0.3em; }
        ${SELECTORS.CHAT_AREA.H3} { font-size: 1.25em !important; line-height: 1.3 !important; margin: 0.5em 0 !important; }

        /* Thought section styling */
        details[open] summary:has(span:contains('Thought for')) + div,
        details.text-slate-900 summary:has(span:contains('Thought for')) + div, /* Original selector for safety */
        details[open] summary:has(span:contains('Thought for')) ~ div:not(summary), /* Target following divs */
        details[open] div.border-l-2 { /* Target the div directly too */
            color: var(--tm-thought-text) !important;
            background-color: var(--tm-thought-bg) !important;
            padding: ${CONFIG.spacing.small} ${CONFIG.spacing.medium} !important; /* More padding */
            border-left: 3px solid var(--tm-thought-text) !important; /* Thicker border */
            margin-left: 0 !important; /* Override default margin */
            margin-top: ${CONFIG.spacing.small} !important;
            border-radius: ${CONFIG.borderRadius.small} !important;
            font-style: italic !important; /* Apply italic to container */
        }
         /* Style text elements inside thoughts, excluding code */
        details:has(summary span:contains('Thought for')) div *:not(code):not(pre):not(summary) {
            color: var(--tm-thought-text) !important;
            font-size: ${CONFIG.fonts.thought.size} !important;
            line-height: ${CONFIG.fonts.thought.lineHeight} !important;
            font-style: italic !important;
            background-color: transparent !important; /* Prevent background inheritance */
        }
         /* Ensure code inside thoughts retains code styling */
         details:has(summary span:contains('Thought for')) code {
             /* Inherit code styles or define specifically */
             font-style: normal !important;
             font-size: inherit !important; /* Or specific code size */
             line-height: inherit !important;
             background-color: var(--tm-code-inline-bg) !important; /* Use inline code style */
             color: var(--tm-code-inline-text) !important;
             padding: 0.1em 0.3em !important;
             border-radius: 3px !important;
         }
         /* Style the summary toggle itself */
         ${SELECTORS.THOUGHT_DETAILS} summary {
              color: var(--tm-text-secondary) !important;
              font-style: italic !important;
              cursor: pointer;
              padding: 2px 4px;
              border-radius: 3px;
              display: inline-block; /* Prevent full width */
         }
         ${SELECTORS.THOUGHT_DETAILS} summary:hover {
             background-color: var(--tm-accent-bg);
         }
         details[open] > summary:has(span:contains('Thought for')) {
              margin-bottom: ${CONFIG.spacing.small} !important;
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
            border-radius: ${CONFIG.borderRadius.large} !important;
            margin-bottom: ${CONFIG.spacing.medium} !important;
            border: 1px solid var(--tm-border) !important; /* Add border */
            padding: 2px; /* Add slight padding around inner elements */
        }
        ${SELECTORS.CHAT_AREA.INPUT_TEXTBOX} {
            font-family: ${CONFIG.fonts.primary} !important;
            font-size: 16px !important; line-height: 24px !important; min-height: 44px !important;
            padding: 0.75rem 1rem !important; /* Standard padding */
            border-radius: ${CONFIG.borderRadius.large} !important; /* Match container */
            color: var(--tm-input-text) !important;
            background-color: transparent !important; /* Make textarea bg transparent */
            border: none !important; /* Remove inner border */
            outline: none !important;
            margin: 0 !important; /* Remove default margins */
            /* Adjust margin within the input-row instead if needed */
             padding-top: ${CONFIG.spacing.small} !important; /* Add padding top/bottom */
             padding-bottom: ${CONFIG.spacing.small} !important;
            overflow-wrap: break-word !important; tab-size: 4 !important; text-size-adjust: 100% !important;
            white-space: pre-wrap !important; font-variant-ligatures: none !important; -webkit-tap-highlight-color: transparent !important;
        }
        ${SELECTORS.CHAT_AREA.INPUT_TEXTBOX}::placeholder { color: var(--tm-input-placeholder) !important; opacity: 1 !important; }

        /* Action buttons styling (excluding send, more-options, replace-only) */
        ${SELECTORS.CHAT_AREA.INPUT_ACTION_BUTTONS} {
            transition: all 0.2s ease !important; color: var(--tm-text-secondary) !important; /* Use secondary text color */
        }
        ${SELECTORS.CHAT_AREA.INPUT_ACTION_BUTTONS} svg {
            width: 20px !important; height: 20px !important; vertical-align: middle !important;
        }
        ${SELECTORS.CHAT_AREA.INPUT_ACTION_BUTTONS}:hover {
            background-color: var(--tm-button-secondary-hover-bg) !important;
            color: var(--tm-text) !important; /* Darken text on hover */
            border-radius: ${CONFIG.borderRadius.small} !important;
        }
        ${SELECTORS.CHAT_AREA.INPUT_ACTIONS} { padding: ${CONFIG.spacing.small} 0.75rem !important; border-top: 1px solid var(--tm-border-subtle); margin-top: ${CONFIG.spacing.small}; } /* Add border top */

        /* Send and More Options buttons */
        ${SELECTORS.CHAT_AREA.SEND_BUTTON},
        ${SELECTORS.CHAT_AREA.MORE_OPTIONS_BUTTON} {
            background-color: var(--tm-button-primary-bg) !important;
            border-color: transparent !important; /* Remove border */
            color: var(--tm-button-primary-text) !important;
            border-radius: ${CONFIG.borderRadius.medium} !important; /* Slightly less round than container */
            height: 36px !important; /* Standard height */
            padding: 0 ${CONFIG.spacing.medium} !important;
        }
        ${SELECTORS.CHAT_AREA.SEND_BUTTON}:hover,
        ${SELECTORS.CHAT_AREA.MORE_OPTIONS_BUTTON}:hover {
            background-color: var(--tm-button-primary-hover-bg) !important;
            border-color: transparent !important;
        }

         /* Position send button slightly better */
         ${SELECTORS.CHAT_AREA.SEND_BUTTON} {
              position: absolute;
              right: 10px; /* Adjust as needed */
              bottom: 10px; /* Adjust as needed */
         }
         /* Adjust textarea padding to avoid send button overlap */
          ${SELECTORS.CHAT_AREA.INPUT_TEXTBOX} {
               padding-right: 50px !important; /* Space for the send button */
          }
      `;
      document.head.appendChild(inputStyle);
  }

  /* ---------------- Text Parsing & Formatting ---------------- */
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
               // Apply basic styling even if no parsing needed
               msgEl.style.fontFamily = CONFIG.fonts.primary;
               return;
          }

          const safeText = Utils.escapeHtml(raw);
          const processed = processMessageContent(safeText);
          const container = msgEl.querySelector('div');

          let targetContainer = container;
          if (!targetContainer) {
              msgEl.innerHTML = ''; // Clear existing potentially incorrect structure
              targetContainer = document.createElement('div');
              // Ensure container gets base text styles if it's newly created
              targetContainer.style.fontFamily = CONFIG.fonts.primary;
              targetContainer.style.fontSize = '14px';
              targetContainer.style.lineHeight = '28px';
              targetContainer.style.color = 'var(--tm-user-msg-text)';
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
    // CSS rules are now in applyMainStyles, this function focuses on dynamic elements if needed
    function styleThoughtSections() {
      Utils.safe(() => {
        document.querySelectorAll('details:has(summary span:contains("Thought for"))').forEach(details => {
           if (details.hasAttribute('data-thought-styled')) return; // Skip if already processed

            // Ensure the main content div gets the styles applied via CSS rules in applyMainStyles
            // We might need to add a class for more reliable CSS targeting
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
                  if (!code.closest('.editing') && !code.closest(SELECTORS.RESULT_BLOCKS)) { // Avoid double-processing sandbox code if it uses <code>
                       handleJsonCodeBlock(code);
                  }
              });

              // Style only inline code blocks (outside pre)
              document.querySelectorAll(SELECTORS.INLINE_CODE).forEach(inlineCode => {
                  // Check it's not already handled by multiStepParse or inside a pre/thought block
                  if (!inlineCode.closest('pre') && !inlineCode.closest('details:has(summary span:contains("Thought for"))') && !inlineCode.hasAttribute('data-styled')) {
                      inlineCode.style.backgroundColor = 'var(--tm-code-inline-bg)';
                      inlineCode.style.color = 'var(--tm-code-inline-text)';
                      inlineCode.style.padding = '0.2em 0.4em';
                      inlineCode.style.borderRadius = '3px';
                      inlineCode.style.fontFamily = CONFIG.fonts.code;
                      inlineCode.style.fontSize = '90%';
                      inlineCode.style.border = '1px solid var(--tm-border-subtle)';
                      inlineCode.setAttribute('data-styled', 'true');
                  }
              });

              // Apply other display enhancements
              styleSandboxOutputs(); // Styles specific <pre> blocks in <details>
              styleThoughtSections(); // Adds classes/attributes to thought sections for CSS
              formatTimestamps();
              reformatDateDisplays();
          }, 'improveTextDisplay'),
      150 // Slightly increased debounce
  );

  /* ---------------- Initialization ---------------- */
  function initTheme() {
    console.log('TypingMind GPT-Style Theme v4.1 (Dark Mode): Initializing...');
    injectCssVariables(); // Inject variables first
    applySidebarStyles();
    fixSearchPlaceholder();
    applyMainStyles();
    applyInputStyles();

    const observeDomChanges = () => {
      Utils.safe(() => {
        const observer = new MutationObserver(mutations => {
          // More robust check: Check if relevant nodes were added/changed
          // Optimize: Check only necessary mutation types and targets
          let needsUpdate = false;
          for (const mutation of mutations) {
              if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                  // Check if added nodes contain elements we care about
                   for (const node of mutation.addedNodes) {
                       if (node.nodeType === 1) { // ELEMENT_NODE
                           if (node.matches || node.querySelector) { // Check if node supports matches/querySelector
                                if (node.matches(SELECTORS.USER_MESSAGE_BLOCK) ||
                                    node.querySelector(SELECTORS.USER_MESSAGE_BLOCK) ||
                                    node.matches(SELECTORS.CHAT_SPACE) || // Chat space itself added
                                    node.querySelector(SELECTORS.CHAT_SPACE) ||
                                    node.matches(SELECTORS.SIDEBAR.MIDDLE) || // Sidebar content added
                                    node.querySelector(SELECTORS.SIDEBAR.MIDDLE) ||
                                    node.matches('pre') || node.querySelector('pre') || // Any code block added
                                    node.matches('details') || node.querySelector('details') || // Any details added
                                    node.matches(SELECTORS.TIMESTAMP_BUTTONS) || node.querySelector(SELECTORS.TIMESTAMP_BUTTONS) ||
                                    node.matches(SELECTORS.DATE_SPANS) || node.querySelector(SELECTORS.DATE_SPANS)
                                    ) {
                                    needsUpdate = true;
                                    break;
                                }
                           }
                       }
                   }
              } else if (mutation.type === 'characterData' && mutation.target.parentNode?.closest(SELECTORS.CHAT_SPACE)) {
                   // Update if text content changes within the chat space (might affect parsing)
                   needsUpdate = true;
              } else if (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
                   // Update if class/style attributes change, might affect layout/visibility
                   needsUpdate = true;
              }
              if (needsUpdate) break;
          }


          if (needsUpdate) {
            improveTextDisplay(); // Use debounced function
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true, // Observe attributes
          characterData: true, // Observe text changes
          attributeFilter: ['style', 'class', 'id', 'data-processed'] // More specific attribute filter
        });
        console.log('TypingMind Theme: MutationObserver started.');
      }, 'observeDomChanges');
    };

    // Run initial styling and start observing
    if (document.readyState === 'loading') {
       console.log('TypingMind Theme: DOM not ready, adding listener.');
       document.addEventListener('DOMContentLoaded', () => {
            console.log('TypingMind Theme: DOMContentLoaded fired.');
            improveTextDisplay(); // Run initial processing
            observeDomChanges();
       });
    } else {
       console.log('TypingMind Theme: DOM already ready, running now.');
       improveTextDisplay(); // Run initial processing
       observeDomChanges();
    }

    console.log('TypingMind GPT-Style Theme v4.1 (Dark Mode): Initialized.');
  }

  // --- Start the theme ---
  initTheme();

})();
