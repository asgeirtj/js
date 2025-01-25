// gpt_style_theme.js
// TypingMind.com extension
// GitHub Pages link: https://asgeirtj.github.io/js/gpt_style_theme.js
// Source: https://github.com/shaggy2626/typingmind-themes-extensions/tree/master/themes/gpt_style_theme
// Source: https://cdn.jsdelivr.net/gh/shaggy2626/typingmind-themes-extensions/themes/gpt_style_theme/gpt_style_theme.js
// Version: 1.0
// Remember to increment version number when making changes

/****************************************************************************
 * typingmind-custom-with-sidebar.js
 *
 * Multi-step parse approach for user messages:
 *  - <test>...</test> => entire inside bold (with code blocks inside)
 *  - triple backticks => <pre> with rounded corners
 *  - single backticks => bold
 *  - single quotes => bold
 *  - other tags remain literal
 * 
 * Also includes:
 *  - Sidebar UI color/style overrides
 *  - Main chat area overrides
 *  - Input area styling customization
 ****************************************************************************/
(function() {
  /**************************************************************
   * A) SIDEBAR MODIFICATIONS
   **************************************************************/
  if (!document.getElementById('typingmindSidebarFixMerged')) {
    const sidebarStyle = document.createElement('style');
    sidebarStyle.id = 'typingmindSidebarFixMerged';
    sidebarStyle.type = 'text/css';

    sidebarStyle.innerHTML = `
      /* -----------------------------------------------
         1) Light BG for main sidebar containers
         ----------------------------------------------- */
      [data-element-id="workspace-bar"],
      [data-element-id="side-bar-background"],
      [data-element-id="sidebar-beginning-part"],
      [data-element-id="sidebar-middle-part"] {
        background-color: #F9F9F9 !important;
      }

      /* -----------------------------------------------
         2) New Chat Button: #E3E3E3 background, black text
         ----------------------------------------------- */
      [data-element-id="new-chat-button-in-side-bar"] {
        background-color: #E3E3E3 !important; 
        color: #000 !important;
      }
      [data-element-id="new-chat-button-in-side-bar"] * {
        color: #000 !important;
      }

      /* -----------------------------------------------
         3) Search bar: white BG, black text,
            black placeholder, subtle border
         ----------------------------------------------- */
      [data-element-id="search-chats-bar"] {
        background-color: #fff !important;
        color: #000 !important;
        border: 1px solid #ccc !important;
      }
      [data-element-id="search-chats-bar"][placeholder]::placeholder,
      [data-element-id="search-chats-bar"].placeholder\\:text-white\\/70::placeholder,
      [data-element-id="search-chats-bar"].jsx-7078ffb922cb3c38::placeholder {
        color: rgba(0, 0, 0, 0.6) !important;
        opacity: 1 !important;
        -webkit-text-fill-color: rgba(0, 0, 0, 0.6) !important;
      }
      [data-element-id="search-chats-bar"]::-webkit-input-placeholder {
        color: rgba(0, 0, 0, 0.6) !important;
        opacity: 1 !important;
        -webkit-text-fill-color: rgba(0, 0, 0, 0.6) !important;
      }
      [data-element-id="search-chats-bar"]::-moz-placeholder {
        color: rgba(0, 0, 0, 0.6) !important;
        opacity: 1 !important;
      }
      [data-element-id="search-chats-bar"]:-ms-input-placeholder {
        color: rgba(0, 0, 0, 0.6) !important;
        opacity: 1 !important;
      }

      /* -----------------------------------------------
         4) Force black text for conversation items
         ----------------------------------------------- */
      [data-element-id="workspace-bar"] *:not(svg):not(path)[class*="text-white"],
      [data-element-id="workspace-bar"] *:not(svg):not(path)[class*="text-white/"],
      [data-element-id="workspace-bar"] *:not(svg):not(path)[class*="text-gray-"],
      [data-element-id="workspace-bar"] *:not(svg):not(path)[class*="dark:text-white"],
      [data-element-id="side-bar-background"] *:not(svg):not(path)[class*="text-white"],
      [data-element-id="side-bar-background"] *:not(svg):not(path)[class*="text-white/"],
      [data-element-id="side-bar-background"] *:not(svg):not(path)[class*="text-gray-"],
      [data-element-id="side-bar-background"] *:not(svg):not(path)[class*="dark:text-white"] {
        color: #000 !important;
        opacity: 1 !important;
        --tw-text-opacity: 1 !important;
      }

      /* -----------------------------------------------
         5) Hover highlight for custom chat items
         and "selected" chat item
         ----------------------------------------------- */
      [data-element-id="custom-chat-item"]:hover {
        background-color: #E3E3E3 !important;
      }
      [data-element-id="selected-chat-item"] {
        background-color: #E3E3E3 !important;
      }

      /* -----------------------------------------------
         6) 3-dot menu & trash icon: hide by default,
            show on hover, keep menu visible when open
         ----------------------------------------------- */
      [data-element-id="custom-chat-item"] button[aria-label="Delete Chat"],
      [data-element-id="custom-chat-item"] button[aria-label="Favorite Chat"],
      [data-element-id="custom-chat-item"] button[aria-label="Chat settings"],
      [data-element-id="selected-chat-item"] button[aria-label="Delete Chat"],
      [data-element-id="selected-chat-item"] button[aria-label="Favorite Chat"],
      [data-element-id="selected-chat-item"] button[aria-label="Chat settings"] {
        display: none !important;
      }
      [data-element-id="custom-chat-item"]:hover button[aria-label="Delete Chat"],
      [data-element-id="custom-chat-item"]:hover button[aria-label="Favorite Chat"],
      [data-element-id="custom-chat-item"]:hover button[aria-label="Chat settings"],
      [data-element-id="selected-chat-item"]:hover button[aria-label="Delete Chat"],
      [data-element-id="selected-chat-item"]:hover button[aria-label="Favorite Chat"],
      [data-element-id="selected-chat-item"]:hover button[aria-label="Chat settings"],
      [data-element-id="custom-chat-item"] button[aria-expanded="true"],
      [data-element-id="selected-chat-item"] button[aria-expanded="true"] {
        display: inline-block !important;
      }
      #headlessui-portal-root {
        display: block !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }
      #headlessui-portal-root [role="menu"] {
        display: block !important;
        visibility: visible !important;
        background-color: white !important;
        color: black !important;
        pointer-events: auto !important;
      }
      #headlessui-portal-root [role="menuitem"] {
        display: flex !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }

      /* -----------------------------------------------
         7) "Filter by tags" popup color fix
         ----------------------------------------------- */
      [data-element-id="tag-search-panel"] {
        background-color: #F9F9F9 !important; 
        border: 1px solid #ccc !important;
        color: #000 !important;
      }
      [data-element-id="tag-search-panel"] input[type="search"] {
        background-color: #fff !important;
        border: 1px solid #ccc !important;
        color: #000 !important;
      }
      [data-element-id="tag-search-panel"] input[type="checkbox"] {
        appearance: none !important;
        -webkit-appearance: none !important;
        width: 16px !important;
        height: 16px !important;
        border: 1px solid #ccc !important;
        border-radius: 3px !important;
        background-color: #fff !important;
        position: relative !important;
        cursor: pointer !important;
      }
      [data-element-id="tag-search-panel"] input[type="checkbox"]:checked {
        background-color: #2563eb !important;
        border-color: #2563eb !important;
      }
      [data-element-id="tag-search-panel"] input[type="checkbox"]:checked::after {
        content: '' !important;
        position: absolute !important;
        left: 5px !important;
        top: 2px !important;
        width: 4px !important;
        height: 8px !important;
        border: solid white !important;
        border-width: 0 2px 2px 0 !important;
        transform: rotate(45deg) !important;
      }
      [data-element-id="tag-search-panel"] label,
      [data-element-id="tag-search-panel"] p,
      [data-element-id="tag-search-panel"] span,
      [data-element-id="tag-search-panel"] button {
        color: #000 !important;
      }
      [data-element-id="tag-search-panel"] .overflow-auto::-webkit-scrollbar {
        width: 8px !important;
      }
      [data-element-id="tag-search-panel"] .overflow-auto::-webkit-scrollbar-track {
        background: #f1f1f1 !important;
        border-radius: 4px !important;
      }
      [data-element-id="tag-search-panel"] .overflow-auto::-webkit-scrollbar-thumb {
        background: #c1c1c1 !important;
        border-radius: 4px !important;
      }
      [data-element-id="tag-search-panel"] .overflow-auto::-webkit-scrollbar-thumb:hover {
        background: #a1a1a1 !important;
      }
      [data-element-id="tag-search-panel"] .overflow-auto {
        scrollbar-width: thin !important;
        scrollbar-color: #c1c1c1 #f1f1f1 !important;
      }

      /* -----------------------------------------------
         8) Text editing areas
         ----------------------------------------------- */
      [data-element-id="chat-folder"] textarea,
      [data-element-id="custom-chat-item"] textarea,
      [data-element-id="selected-chat-item"] textarea,
      [data-element-id="side-bar-background"] textarea {
        background-color: #fff !important;
        color: #000 !important;
        border: 1px solid #ccc !important;
      }
      [data-element-id="chat-folder"] textarea:focus,
      [data-element-id="custom-chat-item"] textarea:focus,
      [data-element-id="selected-chat-item"] textarea:focus,
      [data-element-id="side-bar-background"] textarea:focus {
        background-color: #fff !important;
        color: #000 !important;
        border-color: #2563eb !important;
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2) !important;
      }

      /* -----------------------------------------------
         9) Workspace icon hover effects
         ----------------------------------------------- */
      [data-element-id="workspace-bar"] button span.hover\\:bg-white\\/20:hover,
      [data-element-id="workspace-bar"] button:hover span.text-white\\/70,
      [data-element-id="workspace-profile-button"]:hover {
        background-color: rgba(0, 0, 0, 0.1) !important;
      }
    `;

    document.head.appendChild(sidebarStyle);

    // Monitor for re-apply if <style> is removed
    const obs = new MutationObserver(() => {
      if (!document.getElementById('typingmindSidebarFixMerged')) {
        document.head.appendChild(sidebarStyle);
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });

    // Ensure the sidebar search input has a placeholder
    function fixSearchPlaceholder() {
      const searchInput = document.querySelector('[data-element-id="search-chats-bar"]');
      if (searchInput && !searchInput.placeholder) {
        searchInput.setAttribute('placeholder', 'Search chats');
      }
    }
    document.addEventListener('DOMContentLoaded', fixSearchPlaceholder);
    fixSearchPlaceholder();

    console.log("TypingMind Sidebar Mods loaded.");
  }

  /***********************************************************
   * B) Main Chat Customization
   ***********************************************************/
  const SELECTORS = {
    CODE_BLOCKS: 'pre code',
    RESULT_BLOCKS: 'details pre',
    USER_MESSAGE_BLOCK: 'div[data-element-id="user-message"]',
    CHAT_SPACE: '[data-element-id="chat-space-middle-part"]'
  };

  // Main chat styling
  const mainStyleEl = document.createElement('style');
  mainStyleEl.textContent = `
    /************************************************
     * 1. ChatGPT-like font for user & AI 
     *    skipping code blocks + file attachments
     ************************************************/
    [data-element-id="chat-space-middle-part"] .prose.max-w-full *:not(
      pre, pre *, code, code *,
      .flex.items-start.justify-center.flex-col.gap-2 *,
      .text-xs.text-gray-500.truncate,
      .italic.truncate.hover\\:underline,
      h1, h2, h3, h4, h5, h6
    ),
    [data-element-id="chat-space-middle-part"] [data-element-id="user-message"] > div {
      font-family: ui-sans-serif, -apple-system, system-ui,
                   "Segoe UI", Helvetica, "Apple Color Emoji",
                   Arial, sans-serif, "Segoe UI Emoji",
                   "Segoe UI Symbol" !important;
      font-size: 14px !important;
      line-height: 28px !important;
      color: rgb(13, 13, 13) !important;
    }

    /* .prose and user-message root styling, except certain classes */
    [data-element-id="chat-space-middle-part"] .prose.max-w-full,
    [data-element-id="chat-space-middle-part"] [data-element-id="user-message"] {
      font-family: ui-sans-serif, -apple-system, system-ui,
                   "Segoe UI", Helvetica, "Apple Color Emoji",
                   Arial, sans-serif, "Segoe UI Emoji",
                   "Segoe UI Symbol" !important;
      font-size: 14px !important;
      line-height: 28px !important;
      color: rgb(13, 13, 13) !important;
    }

    [data-element-id="chat-space-middle-part"] .text-xs.text-gray-500.truncate,
    [data-element-id="chat-space-middle-part"] .italic.truncate.hover\\:underline {
      font-size: unset !important;
      line-height: unset !important;
      font-family: unset !important;
    }

    [data-element-id="chat-space-middle-part"] .flex.items-start.justify-center.flex-col.gap-2 {
      font-size: unset !important;
      line-height: unset !important;
      font-family: unset !important;
      color: unset !important;
    }

    /************************************************
     * 2. Hide user avatar + right-align user bubble
     ************************************************/
    [data-element-id="chat-space-middle-part"] [data-element-id="response-block"]:has([data-element-id="user-message"]) [data-element-id="chat-avatar-container"] {
      display: none !important;
    }
    [data-element-id="chat-space-middle-part"] [data-element-id="user-message"] {
      margin-left: auto !important;
      margin-right: 0 !important;
      display: block !important;
      max-width: 70% !important;
      border-radius: 1.5rem !important;
    }

    /************************************************
     * 3. Code blocks: #F9F9F9 background, 
     *    slim border, round corners
     ************************************************/
    [data-element-id="chat-space-middle-part"] pre:has(div.relative) {
      background-color: #F9F9F9 !important;
      border: 1px solid #ccc !important;
      border-radius: 0.5rem !important; /* Round corners */
    }

    [data-element-id="chat-space-middle-part"] pre.mb-2.overflow-auto.text-sm.border.border-gray-200.rounded.bg-gray-100 {
      background-color: #000 !important;
      color: #fff !important;
      border: none !important;
      padding: 8px !important;
      border-radius: 4px !important;
      white-space: pre-wrap !important;
      word-wrap: break-word !important;
      overflow-x: hidden !important;
    }

    [data-element-id="chat-space-middle-part"] pre > div.relative {
      position: relative !important;
    }

    [data-element-id="chat-space-middle-part"] pre > div.relative > div.sticky {
      position: sticky !important;
      top: 0 !important;
      z-index: 10 !important;
      background-color: #F9F9F9 !important;
      border-radius: 0.5rem 0.5rem 0 0 !important; /* Round top corners */
      border-bottom: 1px solid #ccc !important;
    }

    [data-element-id="chat-space-middle-part"] pre > div.relative > div > pre {
      border: none !important;
      background: transparent !important;
      margin: 0 !important;
    }

    /************************************************
     * 4. Remove hover background on conversation area
     ************************************************/
    [data-element-id="chat-space-middle-part"] [data-element-id="response-block"]:hover {
      background-color: transparent !important;
    }

    /************************************************
     * 5. Bullet points & numbered lists
     ************************************************/
    [data-element-id="chat-space-middle-part"] .prose.max-w-full ul,
    [data-element-id="chat-space-middle-part"] .prose.max-w-full ol {
      margin-top: 0.5rem !important;
      margin-bottom: 0.5rem !important;
    }
    [data-element-id="chat-space-middle-part"] .prose.max-w-full li {
      margin-top: 0.3rem !important;
      margin-bottom: 0.3rem !important;
    }
    [data-element-id="chat-space-middle-part"] .prose.max-w-full li::marker {
      color: rgb(13, 13, 13) !important;
      font-weight: bold !important;
    }
    [data-element-id="chat-space-middle-part"] .prose.max-w-full ul > li {
      list-style-type: disc !important;
      padding-left: 0.5rem !important;
    }
    [data-element-id="chat-space-middle-part"] .prose.max-w-full ol > li {
      list-style-type: decimal !important;
      padding-left: 0.5rem !important;
    }

    /* Header styling */
    [data-element-id="chat-space-middle-part"] .prose.max-w-full h1 {
      font-size: 2em !important;
      line-height: 1.3 !important;
      margin-top: 0.5em !important;
      margin-bottom: 0.5em !important;
    }

    [data-element-id="chat-space-middle-part"] .prose.max-w-full h2 {
      font-size: 1.5em !important;
      line-height: 1.3 !important;
      margin-top: 0.5em !important;
      margin-bottom: 0.5em !important;
    }

    [data-element-id="chat-space-middle-part"] .prose.max-w-full h3 {
      font-size: 1.25em !important;
      line-height: 1.3 !important;
      margin-top: 0.5em !important;
      margin-bottom: 0.5em !important;
    }
  `;
  document.head.appendChild(mainStyleEl);

  // Input bar styling
  const inputStyleEl = document.createElement('style');
  inputStyleEl.textContent = `
    /* Input container styling */
    [data-element-id="chat-space-end-part"] [role="presentation"] {
      background-color: #f4f4f4 !important;
      border-radius: 1.5rem !important;
      margin-bottom: 1rem !important;
    }

    /* Textarea styling */
    #chat-input-textbox {
      font-family: ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol" !important;
      font-size: 16px !important;
      line-height: 24px !important;
      min-height: 44px !important;
      padding: 0.75rem 1rem !important;
      border-radius: 1.5rem !important;
      color: rgb(13, 13, 13) !important;
      border: 0 solid rgb(227, 227, 227) !important;
      outline: 0 solid rgba(0, 0, 0, 0) !important;
      outline-offset: 2px !important;
      margin: 8px 0 !important;
      overflow-wrap: break-word !important;
      tab-size: 4 !important;
      text-size-adjust: 100% !important;
      white-space-collapse: break-spaces !important;
      font-variant-ligatures: none !important;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
    }

    #chat-input-textbox::placeholder {
      color: rgb(142, 142, 142) !important;
      opacity: 1 !important;
    }

    /* Action buttons styling (excluding send and more-options) */
    [data-element-id="chat-input-actions"] button:not([data-element-id="send-button"]):not([data-element-id="more-options-button"]) {
      transition: all 0.2s ease !important;
      color: rgb(13, 13, 13) !important;
    }
    [data-element-id="chat-input-actions"] button:not([data-element-id="send-button"]):not([data-element-id="more-options-button"]) svg {
      width: 20px !important;
      height: 20px !important;
      vertical-align: middle !important;
    }
    [data-element-id="chat-input-actions"] button:not([data-element-id="send-button"]):not([data-element-id="more-options-button"]):hover {
      background-color: rgba(0, 0, 0, 0.1) !important;
      border-radius: 0.5rem !important;
    }

    /* Bottom actions container spacing */
    [data-element-id="chat-input-actions"] {
      padding: 0.5rem 0.75rem !important;
    }

    /* Send and More Options buttons styling */
    [data-element-id="send-button"] {
      background-color: rgb(13, 13, 13) !important;
      border-color: rgb(13, 13, 13) !important;
    }
    [data-element-id="send-button"]:hover {
      background-color: rgba(13, 13, 13, 0.8) !important;
      border-color: rgba(13, 13, 13, 0.8) !important;
    }
    [data-element-id="more-options-button"] {
      background-color: rgb(13, 13, 13) !important;
      border-color: rgb(13, 13, 13) !important;
    }
    [data-element-id="more-options-button"]:hover {
      background-color: rgba(13, 13, 13, 0.8) !important;
      border-color: rgba(13, 13, 13, 0.8) !important;
    }
  `;
  document.head.appendChild(inputStyleEl);

  /***********************************************************
   * F) JS logic for user messages, code blocks, etc.
   ***********************************************************/

  /** Escapes < > ' " & so tags remain literal. */
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * multiStepParse:
   *  - Triple backticks => <pre> (rounded corners)
   *  - Single backticks => bold
   *  - Single quotes => bold
   */
  function multiStepParse(escapedText) {
    let result = escapedText;

    // (1) Triple backticks => <pre>
    const tripleRegex = /```\s*([\s\S]*?)\s*```/g;
    result = result.replace(tripleRegex, (match, code) => {
      return `<pre style="
        background:#F9F9F9; 
        border:1px solid #ccc; 
        padding:6px; 
        border-radius:0.5rem; 
        overflow-x: auto;
        margin: 0;
      "><code style="
        font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace; 
        font-size: 13px; 
        line-height: 20px;
        white-space: pre;
        display: block;
        overflow-wrap: normal;
        word-break: normal;
      ">${code}</code></pre>`;
    });

    // (2) Single backticks => bold
    const singleBacktickRegex = /`([^`]+)`/g;
    result = result.replace(singleBacktickRegex, (_, inlineCode) => {
      return `<span style="font-weight:bold;">${inlineCode}</span>`;
    });

    // (3) Single quotes => bold
    const singleQuoteRegex = /&#039;([^&#]+)&#039;/g;
    result = result.replace(singleQuoteRegex, (match, contentInside) => {
      return `<span style="font-weight:bold;">${contentInside}</span>`;
    });

    return result;
  }

  /**
   * styleUserMessageEl():
   *  Actually styles a single user message element, 
   *  sets data-processed so we don't re-do it in an infinite loop
   */
  function styleUserMessageEl(msgEl) {
    // Mark as processed to avoid repeated styling
    msgEl.setAttribute('data-processed', 'true');

    // Light gray bubble
    Object.assign(msgEl.style, {
      backgroundColor: '#F4F4F4',
      color: '#000',
      padding: '8px',
      borderRadius: '1.5rem',
      marginBottom: '8px',
      display: 'block'
    });

    const rawText = msgEl.textContent || '';
    // Only parse if we have some < or backtick or single-quote
    if (!rawText.match(/[<`']/)) return;

    // Escape everything
    let safe = escapeHtml(rawText);

    // Extract <test> blocks
    const testMarkers = [];
    const testRegex = /(&lt;test&gt;)([\s\S]*?)(&lt;\/test&gt;)/g;
    let extracted = safe.replace(testRegex, (m, openTag, inner, closeTag) => {
      const placeholder = `__TEST_SECTION_${testMarkers.length}__`;
      testMarkers.push({ placeholder, openTag, inner, closeTag });
      return placeholder;
    });

    // Parse triple backticks, single backticks, single quotes outside <test>
    extracted = multiStepParse(extracted);

    // Re-inject <test> blocks
    testMarkers.forEach((tm) => {
      const parsedInner = multiStepParse(tm.inner);
      const replaced = `${tm.openTag}<span style="font-weight:bold;">${parsedInner}</span>${tm.closeTag}`;
      extracted = extracted.replace(tm.placeholder, replaced);
    });

    // Insert final HTML
    const container = msgEl.querySelector('div');
    if (container) {
      container.innerHTML = extracted;
    } else {
      msgEl.innerHTML = `<div>${extracted}</div>`;
    }
  }

  /**
   * styleUserMessages():
   *  applies styleUserMessageEl to all user messages
   *  skipping ones with data-processed="true"
   */
  function styleUserMessages() {
    const userMessages = document.querySelectorAll(SELECTORS.USER_MESSAGE_BLOCK);
    userMessages.forEach((msgEl) => {
      // skip if in editing mode or already processed
      if (msgEl.closest('.editing')) return;
      if (msgEl.hasAttribute('data-processed')) return;

      styleUserMessageEl(msgEl);
    });
  }

  /**
   * handleJsonCodeBlocks():
   *  if <code> includes "code", parse JSON
   */
  function handleJsonCodeBlocks() {
    const codeEls = document.querySelectorAll(SELECTORS.CODE_BLOCKS);
    codeEls.forEach(codeEl => {
      if (codeEl.closest('.editing')) return;

      if (codeEl.textContent.includes('"code"')) {
        try {
          const jsonContent = JSON.parse(codeEl.textContent);
          let cleanCode = jsonContent.code;
          cleanCode = cleanCode.replace(/\\n/g, '\n');
          cleanCode = cleanCode.replace(/^"|"$/g, '');
          codeEl.textContent = cleanCode;

          Object.assign(codeEl.style, {
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          });

          const preEl = codeEl.closest('pre');
          if (preEl) {
            Object.assign(preEl.style, {
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            });
          }
        } catch (err) {
          console.error('Error parsing JSON code:', err);
        }
      }
    });
  }

  /**
   * styleSandboxOutputs():
   *  If text includes SANDBOX_ID or STANDARD_OUTPUT, style them
   */
  function styleSandboxOutputs() {
    const preEls = document.querySelectorAll(SELECTORS.RESULT_BLOCKS);
    preEls.forEach(preEl => {
      if (preEl.closest('.editing')) return;

      if (preEl.textContent.includes('SANDBOX_ID') || preEl.textContent.includes('STANDARD_OUTPUT')) {
        Object.assign(preEl.style, {
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          overflowX: 'hidden',
          background: '#000',
          color: '#fff',
          padding: '8px',
          borderRadius: '4px'
        });
        const container = preEl.closest('.pb-6');
        if (container) {
          container.style.overflowX = 'hidden';
        }
      }
    });
  }

  /**
   * improveTextDisplay():
   *  main function to style user messages + other code blocks
   */
  function improveTextDisplay() {
    styleUserMessages();
    handleJsonCodeBlocks();
    styleSandboxOutputs();
  }

  /***********************************************************
   * G) Observe DOM Changes
   ***********************************************************/
  document.addEventListener('DOMContentLoaded', improveTextDisplay);

  const observer = new MutationObserver((mutations) => {
    let reapply = false;
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        reapply = true;
        break;
      }
      if (
        mutation.type === 'characterData' ||
        (mutation.type === 'childList' &&
         mutation.target.matches &&
         mutation.target.matches(SELECTORS.USER_MESSAGE_BLOCK))
      ) {
        reapply = true;
        break;
      }
    }
    if (reapply) {
      setTimeout(improveTextDisplay, 0);
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true
  });

  console.log("typingmind-custom-with-sidebar.js: Loaded.");

})();
