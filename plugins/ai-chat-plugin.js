export const pluginInfo = {
  id: "ai-chat",
  name: "AI Assistant",
  description: "Ask AI for Mindustry tips, ratios, or logic help.",
  author: "Ovx",
  category: "utility"
};

export function mount(container);
  const BACKEND_URL = "https://mindustry-ai.bobosawnthet.workers.dev/";

  container.innerHTML = `
    <div class="card" style="display: flex; flex-direction: column; height: 400px; padding: 0; overflow: hidden;">
      
      <!-- Chat History -->
      <div id="chat-history" style="flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
        <div style="background: var(--bg-overlay); padding: 12px; border-radius: var(--radius-sm); font-size: 13px; color: var(--fg-muted);">
          Hello! I am your Mindustry AI assistant. Ask me anything about factory ratios, logic, or unit stats!
        </div>
      </div>

      <!-- Input Area -->
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
    msg.style.whiteSpace = 'pre-wrap';

    if (isUser) {
      msg.style.alignSelf = 'flex-end';
      msg.style.background = 'var(--accent-blue)';
      msg.style.color = '#fff';
      msg.style.borderBottomRightRadius = '2px';
    } else {
      msg.style.alignSelf = 'flex-start';
      msg.style.background = 'var(--bg-overlay)';
      msg.style.color = 'var(--fg-default)';
      msg.style.borderBottomLeftRadius = '2px';
    }

    msg.textContent = text;
    history.appendChild(msg);
    history.scrollTop = history.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Add user message to chat
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
    msg.textContent = text; // User text stays plain
  } else {
    msg.style.alignSelf = 'flex-start';
    msg.style.background = 'var(--bg-overlay)';
    msg.style.color = 'var(--fg-default)';
    msg.style.borderBottomLeftRadius = '2px';
    
    // 🪄 THE FIX: Convert Markdown to HTML
    let formattedText = text
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") // Security first
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italics
      .replace(/`([^`]+)`/g, "<code style='background:rgba(0,0,0,0.3);padding:2px 4px;border-radius:4px;font-family:var(--font-mono);'>$1</code>") // Inline code
      .replace(/\n/g, "<br>"); // Line breaks
    
    msg.innerHTML = formattedText;
  }

  history.appendChild(msg);
  history.scrollTop = history.scrollHeight;
    }

    // Add loading message
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
      
      // Remove loading message
      history.removeChild(loadingMsg);

      if (data.reply) {
        addMessage(data.reply, false);
      } else {
        addMessage("Error: " + (data.error || "Unknown error"), false);
      }

    } catch (err) {
      history.removeChild(loadingMsg);
      addMessage("Failed to connect to AI server. Check your Cloudflare URL.", false);
    }

    sendBtn.disabled = false;
    sendBtn.textContent = 'Send';
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}
