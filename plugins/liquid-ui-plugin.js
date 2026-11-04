export const pluginInfo = {
  id: "glass-ui",
  name: "Liquid Glass UI",
  description: "Transforms the entire app into a modern frosted glass interface.",
  author: "Ovx",
  category: "utility"
};

export function mount(container) {
  // Check if it's already enabled
  const isEnabled = localStorage.getItem('glass_plugin_enabled') === 'true';

  container.innerHTML = `
    <div class="card" style="text-align: center; margin-top: 24px; padding: 32px 20px;">
      <div style="font-size: 48px; margin-bottom: 16px;">🪟</div>
      <h2 style="margin: 0 0 8px 0;">Liquid Glass UI</h2>
      <p style="color: var(--fg-muted); margin-bottom: 24px; font-size: 14px; line-height: 1.5;">
        Apply a stunning frosted glass effect and animated background to the entire app.
      </p>
      
      <button class="btn ${isEnabled ? 'btn-secondary' : 'btn-primary'}" id="glass-toggle-btn" style="width: 100%; padding: 12px; font-size: 16px;">
        ${isEnabled ? 'Disable Glass UI' : 'Enable Glass UI'}
      </button>
    </div>
  `;

  const toggleBtn = container.querySelector('#glass-toggle-btn');

  // Inject the CSS into the document head
  function applyGlassUI() {
    // If it's already there, don't add it again
    if (document.getElementById('liquid-glass-plugin-styles')) return;
const style = document.createElement('style');
style.id = 'liquid-glass-plugin-styles';
style.innerHTML = `
  /* 1. Dynamic, Flowing Liquid Background */
  html, body {
    background: #0f172a !important;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(255, 0, 127, 0.8) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(0, 240, 255, 0.8) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.8) 0%, transparent 50%) !important;
    background-size: 150% 150% !important;
    /* Faster animation for a liquid feel */
    animation: liquid-bg 8s ease-in-out infinite alternate !important;
    background-attachment: fixed !important;
  }

  @keyframes liquid-bg {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
  }

  /* 2. The Liquid Glass Elements */
  .app-header, 
  .card, 
  .modal-content, 
  .menu-dropdown, 
  .tool-list, 
  .recipe-card,
  .profile-header {
    /* Barely visible background, highly saturated blur */
    background: rgba(255, 255, 255, 0.03) !important; 
    backdrop-filter: blur(30px) saturate(250%) brightness(1.1) !important;
    -webkit-backdrop-filter: blur(30px) saturate(250%) brightness(1.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    
    /* THE LIQUID EDGE: This inset shadow creates a thick, warped glass edge */
    box-shadow: 
      inset 0 0 20px rgba(255, 255, 255, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.2),
      0 10px 40px 0 rgba(0, 0, 0, 0.4) !important;
    
    position: relative;
  }

  /* 3. Inner elements (Inputs, Toggles) */
  .mode-toggle, .input, .custom-select-btn {
    background: rgba(0, 0, 0, 0.15) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2) !important;
    color: #ffffff !important;
  }

  /* 4. Home Menu rows */
  .tool-row {
    background: transparent !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
  }
  .tool-row:hover {
    background: rgba(255, 255, 255, 0.08) !important;
  }

  /* 5. Text Overrides */
  * {
    color: #ffffff !important;
  }
  .text-muted, .setting-desc, .empty-text, p {
    color: rgba(255, 255, 255, 0.6) !important;
  }

  /* 6. Glowing Liquid Buttons */
  .btn-primary {
    background: rgba(0, 240, 255, 0.9) !important;
    color: #000000 !important;
    border: none !important;
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.4), inset 0 0 10px rgba(255,255,255,0.5) !important;
  }
  
  .mode-btn.active {
    background: rgba(255, 255, 255, 0.15) !important;
    color: #ffffff !important;
    box-shadow: inset 0 0 10px rgba(255,255,255,0.2) !important;
  }

  /* 7. The Liquid Sheen Sweep (Only on main cards) */
  .card::after, .profile-header::after {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    transform: skewX(-20deg);
    animation: liquid-sheen 4s infinite;
    pointer-events: none;
    border-radius: inherit;
  }
  
  @keyframes liquid-sheen {
    0% { left: -100%; }
    50%, 100% { left: 200%; }
  }
`;
document.head.appendChild(style);
