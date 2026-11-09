export const pluginInfo = {
  id: "ai-chat",
  name: "Mindustry AI",
  description: "An expert Mindustry assistant. Ask about ratios, logic, or strategies.",
  author: "Ovx",
  category: "utility"
};

export function mount(container) {
  // 🚨 MAKE SURE YOUR CLOUDFLARE URL IS HERE
  const BACKEND_URL = "https://mindustry-ai.bobosawnthet.workers.dev/";

  container.innerHTML = `
    <div class="card" style="display: flex; flex-direction: column; height: 400px; padding: 0; overflow: hidden;">
      <div id="chat-history" style="flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
        <div style="background: var(--bg-overlay); padding: 12px; border-radius: var(--radius-sm); font-size: 13px; color: var(--fg-muted);">
          Hello! I am your Mindustry AI assistant. Ask me anything about factory ratios, logic, or unit stats!
        </div>
      </div>
      <div style="display: flex; gap: 8px; padding: 12px; border-top: 1px solid var(--border-default); background: var(--bg-subtle);">
        <input id="chat-input" class="input" type="text" placeholder="Type a message..." style="flex: 1; min-height: 36px;">
        <button id="send-btn" class="btn btn-primary" style="padding: 0 16px;">Send</button>
      </div>
    </div>
  `;

  const history = container.querySelector('#chat-history');
  const input = container.querySelector('#chat-input');
  const sendBtn = container.querySelector('#send-btn');

  function addMessage(text, isUser) {
    const msg = document.createElement('div');
    msg.style.maxWidth = '85%';
    msg.style.padding = '10px 14px';
    msg.style.borderRadius = 'var(--radius-md)';
    msg.style.fontSize = '14px';
    msg.style.lineHeight = '1.5';
    
    if (isUser) {
      msg.style.alignSelf = 'flex-end';
      msg.style.background = 'var(--accent-blue)';
      msg.style.color = '#fff';
      msg.style.borderBottomRightRadius = '2px';
      msg.textContent = text;
    } else {
      msg.style.alignSelf = 'flex-start';
      msg.style.background = 'var(--bg-overlay)';
      msg.style.color = 'var(--fg-default)';
      msg.style.borderBottomLeftRadius = '2px';
      
      // 🪄 ADVANCED MARKDOWN PARSER
      // 1. Escape HTML for security
      let tempText = text
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      // 2. Extract code blocks (```code```) and hide them
      let codeBlocks = [];
      tempText = tempText.replace(/```[a-zA-Z]*\n?([\s\S]*?)```/g, (match, code) => {
        codeBlocks.push(code.trim());
        return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
      });

      // 3. Format bold, italics, inline code, and line breaks
      tempText = tempText
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/`([^`]+)`/g, "<code style='background:rgba(0,0,0,0.3);padding:2px 4px;border-radius:4px;font-family:var(--font-mono);font-size:12px;'>$1</code>")
        .replace(/\n/g, "<br>");

      // 4. Put the beautifully styled code blocks back in
      codeBlocks.forEach((code, index) => {
        const blockHtml = `<pre style="background: #000; border: 1px solid var(--border-muted); padding: 10px; border-radius: 6px; overflow-x: auto; font-family: var(--font-mono); font-size: 12px; margin: 8px 0; white-space: pre-wrap; word-break: break-all; text-align: left;">${code}</pre>`;
        tempText = tempText.replace(`__CODE_BLOCK_${index}__`, blockHtml);
      });
      
      msg.innerHTML = tempText;
    }

    history.appendChild(msg);
    history.scrollTop = history.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, true);
    input.value = '';
    sendBtn.disabled = true;
    sendBtn.textContent = '...';

    const loadingMsg = document.createElement('div');
    loadingMsg.style.alignSelf = 'flex-start';
    loadingMsg.style.color = 'var(--fg-muted)';
    loadingMsg.style.fontSize = '13px';
    loadingMsg.textContent = 'AI is thinking...';
    history.appendChild(loadingMsg);
    history.scrollTop = history.scrollHeight;

    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      history.removeChild(loadingMsg);

      if (data.reply) {
        addMessage(data.reply, false);
      } else {
        addMessage("Error: " + (data.error || "Unknown error"), false);
      }
    } catch (err) {
      history.removeChild(loadingMsg);
      addMessage("Failed to connect to AI server.", false);
    }

    sendBtn.disabled = false;
    sendBtn.textContent = 'Send';
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}
