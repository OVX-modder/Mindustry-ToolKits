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
      /* Animated Background */
      body {
        background: #0f172a !important;
        background-image: 
          radial-gradient(circle at 10% 20%, rgba(255, 0, 127, 0.6) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(0, 240, 255, 0.6) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.6) 0%, transparent 50%) !important;
        background-size: 200% 200% !important;
        animation: glass-bg-anim 15s ease infinite !important;
        background-attachment: fixed !important;
      }

      @keyframes glass-bg-anim {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* Glass Overrides */
      .app-header, .card, .modal-content, .menu-dropdown, .tool-list {
        background: rgba(255, 255, 255, 0.08) !important;
        backdrop-filter: blur(20px) saturate(150%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(150%) !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3) !important;
        color: #ffffff !important;
      }

      .tool-row {
        background: transparent !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
      }

      .tool-row:hover {
        background: rgba(255, 255, 255, 0.1) !important;
      }

      .input, .custom-select-btn {
        background: rgba(0, 0, 0, 0.2) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        color: #ffffff !important;
      }

      /* Text Colors */
      h1, h2, h3, h4, .app-title, .recipe-name, .hero-title, .tool-row span {
        color: #ffffff !important;
      }

      .text-muted, p, .setting-desc, .empty-text {
        color: rgba(255, 255, 255, 0.7) !important;
      }

      /* Buttons */
      .btn-primary {
        background: #00f0ff !important;
        color: #000000 !important;
        border: none !important;
      }
      .btn-secondary {
        border-color: rgba(255, 255, 255, 0.3) !important;
        color: #ffffff !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Remove the CSS
  function removeGlassUI() {
    const style = document.getElementById('liquid-glass-plugin-styles');
    if (style) style.remove();
  }

  // Apply on load if it was previously enabled
  if (isEnabled) applyGlassUI();

  // Toggle Button Logic
  toggleBtn.addEventListener('click', () => {
    const currentlyEnabled = localStorage.getItem('glass_plugin_enabled') === 'true';
    
    if (currentlyEnabled) {
      localStorage.setItem('glass_plugin_enabled', 'false');
      removeGlassUI();
      toggleBtn.textContent = 'Enable Glass UI';
      toggleBtn.className = 'btn btn-primary';
    } else {
      localStorage.setItem('glass_plugin_enabled', 'true');
      applyGlassUI();
      toggleBtn.textContent = 'Disable Glass UI';
      toggleBtn.className = 'btn btn-secondary';
    }
  });
}
