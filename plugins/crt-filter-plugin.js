export const pluginInfo = {
  id: "crt-filter",
  name: "CRT Retro Filter",
  description: "Adds scanlines, phosphor glow, and a vignette for a retro monitor look.",
  author: "Ovx",
  category: "utility"
};

export function mount(container) {
  const isEnabled = localStorage.getItem('crt_filter_enabled') === 'true';

  container.innerHTML = `
    <div class="card" style="text-align: center; margin-top: 24px; padding: 32px 20px;">
      <div style="font-size: 48px; margin-bottom: 16px;">📺</div>
      <h2 style="margin: 0 0 8px 0; font-family: var(--font-mono);">CRT Filter</h2>
      <p style="color: var(--fg-muted); margin-bottom: 24px; font-size: 14px; line-height: 1.5;">
        Apply a retro 90s monitor effect to the entire app. Includes scanlines and a phosphor glow.
      </p>
      
      <button class="btn ${isEnabled ? 'btn-secondary' : 'btn-primary'}" id="crt-toggle-btn" style="width: 100%; padding: 12px; font-size: 16px;">
        ${isEnabled ? 'Disable Filter' : 'Enable Filter'}
      </button>
    </div>
  `;

  const toggleBtn = container.querySelector('#crt-toggle-btn');

  function applyCRT() {
    if (document.getElementById('crt-overlay')) return;

    // 1. Create the overlay elements
    const overlay = document.createElement('div');
    overlay.id = 'crt-overlay';
    
    const vignette = document.createElement('div');
    vignette.id = 'crt-vignette';

    document.body.appendChild(overlay);
    document.body.appendChild(vignette);

    // 2. Inject the styles
    const style = document.createElement('style');
    style.id = 'crt-styles';
    style.innerHTML = `
      /* Scanlines */
      #crt-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none;
        z-index: 9998;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        background-size: 100% 3px, 3px 100%;
        animation: crt-flicker 0.15s infinite;
      }

      /* Vignette (Dark Corners) */
      #crt-vignette {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none;
        z-index: 9999;
        box-shadow: inset 0 0 120px rgba(0,0,0,0.8);
      }

      /* Flicker Animation */
      @keyframes crt-flicker {
        0% { opacity: 0.95; }
        50% { opacity: 1; }
        100% { opacity: 0.95; }
      }

      /* Phosphor Text Glow */
      body {
        text-shadow: 0 0 2px rgba(16, 185, 129, 0.6) !important;
      }
      
      /* Force monospace font for the retro feel */
      h1, h2, h3, h4, p, span, button, input, .app-title {
        font-family: var(--font-mono) !important;
      }

      /* Give the app a green tint */
      body::before {
        content: '';
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(16, 185, 129, 0.05);
        pointer-events: none;
        z-index: 9997;
      }
    `;
    document.head.appendChild(style);
  }

  function removeCRT() {
    const overlay = document.getElementById('crt-overlay');
    const vignette = document.getElementById('crt-vignette');
    const style = document.getElementById('crt-styles');
    
    if (overlay) overlay.remove();
    if (vignette) vignette.remove();
    if (style) style.remove();
  }

  // Apply on load if it was previously enabled
  if (isEnabled) applyCRT();

  // Toggle Button Logic
  toggleBtn.addEventListener('click', () => {
    const currentlyEnabled = localStorage.getItem('crt_filter_enabled') === 'true';
    
    if (currentlyEnabled) {
      localStorage.setItem('crt_filter_enabled', 'false');
      removeCRT();
      toggleBtn.textContent = 'Enable Filter';
      toggleBtn.className = 'btn btn-primary';
    } else {
      localStorage.setItem('crt_filter_enabled', 'true');
      applyCRT();
      toggleBtn.textContent = 'Disable Filter';
      toggleBtn.className = 'btn btn-secondary';
    }
  });
}
