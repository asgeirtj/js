// Source: https://asgeirtj.github.io/js/deepseek-collapsible-reasoning.js
// Version: 1.0
// Remember to increment version number when making changes

(function() {
    /**
     * ------------------------------------------------------
     * 1. Preserve the original fetch for fallback behavior.
     * ------------------------------------------------------
     */
    const originalFetch = window.fetch;
  
    /**
     * ------------------------------------------------------
     * 2. Deepseek API endpoint to intercept.
     * ------------------------------------------------------
     */
    const DEEPSEEK_API_URL = 'api.deepseek.com/v1/chat/completions';
  
    /**
     * ------------------------------------------------------
     * 3. Add styles for collapsible thinking blocks
     * ------------------------------------------------------
     */
    const thinkingStyles = document.createElement('style');
    thinkingStyles.textContent = `
      .thinking-block.expanded > div:last-child {
        display: block !important;
      }
      .thinking-block.expanded > div:first-child > span:last-child {
        transform: rotate(180deg);
      }
      .thinking-block {
        transition: all 0.2s ease-in-out;
      }
      .thinking-block > div:first-child {
        transition: background-color 0.2s ease-in-out;
      }
      .thinking-block > div:first-child:hover {
        background-color: #f0f0f0;
      }
    `;
    document.head.appendChild(thinkingStyles);

    /**
     * ------------------------------------------------------
     * Helper Function: Check if a given URL is the Deepseek endpoint.
     * @param {string} url - The request URL (args[0] from fetch).
     * @returns {boolean} - True if the URL includes the Deepseek API endpoint.
     * ------------------------------------------------------
     */
    function isDeepseekURL(url) {
      return url && url.includes(DEEPSEEK_API_URL);
    }
  
    /**
     * ------------------------------------------------------
     * Helper Function: Check if the request body references a Deepseek model.
     * @param {Object} body - Parsed JSON request body.
     * @returns {boolean} - True if the model field includes 'deepseek'.
     * ------------------------------------------------------
     */
    function isDeepseekModel(body) {
      return !!body.model && body.model.includes('deepseek');
    }
  
    /**
     * ------------------------------------------------------
     * Helper Function: Check if the request is a title generation request.
     * @param {Object} body - Parsed JSON request body.
     * @returns {boolean} - True if the last message prompts for a short/relevant title.
     * ------------------------------------------------------
     */
    function isTitleRequest(body) {
      if (!body.messages || body.messages.length === 0) return false;
      const lastMessage = body.messages[body.messages.length - 1];
      return (
        !!lastMessage.content &&
        lastMessage.content.startsWith('What would be a short and relevant title for this chat?')
      );
    }
  
    /**
     * ------------------------------------------------------
     * Function: Process a streaming text/event-stream response from Deepseek,
     *   intercepting "reasoning_content" and measuring how long
     *   the "thinking" phase lasted.
     * @param {Response} response - The original response from fetch.
     * @returns {Promise<Response>}
     * ------------------------------------------------------
     */
    async function processStreamingResponse(response) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
  
      let buffer = '';
      let contentStarted = false;
      let reasoningEnded = false;
      let lastWasNewline = false;
      let startThinkingTime = null;
      let thinkingBlockId = `thinking-${Date.now()}`;
  
      const stream = new ReadableStream({
        async start(controller) {
          const textEncoder = new TextEncoder();
  
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
  
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() || '';
  
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  if (line.includes('[DONE]')) {
                    controller.enqueue(textEncoder.encode(`${line}\n`));
                    continue;
                  }
  
                  try {
                    const data = JSON.parse(line.slice(6));
  
                    if (data?.choices?.[0]?.delta) {
                      const delta = data.choices[0].delta;
  
                      if (delta.reasoning_content) {
                        if (!contentStarted) {
                          startThinkingTime = performance.now();
                          const thinkingHeader = {
                            ...data,
                            choices: [{
                              ...data.choices[0],
                              delta: { content: '▼ 💭 Thinking...\n\n> ' }
                            }]
                          };
                          controller.enqueue(
                            textEncoder.encode(`data: ${JSON.stringify(thinkingHeader)}\n\n`)
                          );
                          contentStarted = true;
                        }
  
                        let content = delta.reasoning_content;
  
                        if (lastWasNewline && content.trim()) {
                          content = `> ${content}`;
                        }
                        lastWasNewline = content.endsWith('\n');
  
                        const modifiedData = {
                          ...data,
                          choices: [{
                            ...data.choices[0],
                            delta: { content }
                          }]
                        };
                        controller.enqueue(
                          textEncoder.encode(`data: ${JSON.stringify(modifiedData)}\n\n`)
                        );
                      }
                      else if (delta.content && !reasoningEnded) {
                        reasoningEnded = true;
                        const thinkingDuration = Math.round(
                          (performance.now() - (startThinkingTime || performance.now())) / 1000
                        );
  
                        const separatorData = {
                          ...data,
                          choices: [{
                            ...data.choices[0],
                            delta: {
                              content: `\n\n▲ 💡 Thought for ${thinkingDuration} seconds\n\n---\n\n`
                            }
                          }]
                        };
                        controller.enqueue(
                          textEncoder.encode(`data: ${JSON.stringify(separatorData)}\n\n`)
                        );
  
                        controller.enqueue(textEncoder.encode(`${line}\n`));
                      } else {
                        controller.enqueue(textEncoder.encode(`${line}\n`));
                      }
                    } else {
                      controller.enqueue(textEncoder.encode(`${line}\n`));
                    }
                  } catch (parseError) {
                    console.error('Error parsing streaming data:', parseError);
                    controller.enqueue(textEncoder.encode(`${line}\n`));
                  }
                } else {
                  controller.enqueue(textEncoder.encode(`${line}\n`));
                }
              }
            }
  
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        }
      });
  
      return new Response(stream, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText
      });
    }
  
    /**
     * ------------------------------------------------------
     * Function: Process a non-streaming JSON response from Deepseek.
     * If we see 'reasoning_content' in the JSON body, prefix each line
     * with '>' and insert a separator (---) before the original content.
     * @param {Response} response - The original fetch response.
     * @returns {Promise<Response>}
     * ------------------------------------------------------
     */
    async function processNonStreamingResponse(response) {
      try {
        const cloned = response.clone();
        const data = await cloned.json();
  
        if (data?.choices?.[0]?.message?.reasoning_content) {
          const message = data.choices[0].message;
          const thinkingBlockId = `thinking-${Date.now()}`;
          
          const quotedReasoning = `<div id="${thinkingBlockId}" class="thinking-block" style="
            background-color: #F9F9F9;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            margin: 8px 0;
          ">
          <div style="
            padding: 8px;
            cursor: pointer;
            user-select: none;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ccc;
          " onclick="this.parentElement.classList.toggle('expanded')">
            <span style="margin-right: 8px;">💭</span>
            <span>Thinking...</span>
            <span style="margin-left: auto;">▼</span>
          </div>
          <div style="
            padding: 8px;
            display: none;
          ">
          ${message.reasoning_content
            .split('\n')
            .map(line => (line.trim() ? `> ${line}` : '>'))
            .join('\n')}
          </div>
          </div>`;
  
          message.content = `${quotedReasoning}\n\n---\n\n${message.content}`;
  
          return new Response(JSON.stringify(data), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
        }
      } catch (error) {
        console.error('Error in Deepseek reasoning extension (non-streaming):', error);
      }
  
      return response;
    }
  
    /**
     * ------------------------------------------------------
     * Main override: window.fetch
     * Intercepts calls to the Deepseek endpoint and modifies
     * reasoning content in streaming/non-streaming responses.
     * ------------------------------------------------------
     */
    window.fetch = async function(...args) {
      try {
        const [url, options] = args;
        const requestBody = options?.body;
  
        if (!isDeepseekURL(url)) {
          return originalFetch.apply(this, args);
        }
  
        if (!requestBody) {
          return originalFetch.apply(this, args);
        }
  
        let parsedBody;
        try {
          parsedBody = JSON.parse(requestBody);
        } catch {
          return originalFetch.apply(this, args);
        }
  
        if (!isDeepseekModel(parsedBody) || isTitleRequest(parsedBody)) {
          return originalFetch.apply(this, args);
        }
  
        const response = await originalFetch.apply(this, args);
  
        if (response.headers.get('content-type')?.includes('text/event-stream')) {
          return processStreamingResponse(response);
        }
  
        return processNonStreamingResponse(response);
      } catch (error) {
        console.error('Error in fetch interceptor:', error);
        return originalFetch.apply(this, args);
      }
    };
  
    console.log('Deepseek reasoning extension loaded (with collapsible thinking blocks)!');
})();
