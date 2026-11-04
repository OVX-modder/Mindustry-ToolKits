export const pluginInfo = {
  id: "glass-ui",
  name: "Glass UI",
  description: "A clean, customizable glass theme with adjustable blur, opacity, and roundness.",
  author: "Ovx",
  category: "utility"
};

export function mount(container) {
  // Load saved settings or use defaults
  const settings = JSON.parse(localStorage.getItem('glass_ui_settings') || '{"opacity": 10, "blur": 16, "radius": 12}');
  const isEnabled = localStorage.getItem('glass_ui_enabled') === 'true';

  container.innerHTML = `
    <div class="card mb-4" style="text-align: center;">
      <div style="font-size: 48px; margin-bottom: 12px;">🪟</div>
      <h2 style="margin: 0 0 8px 0;">Glass UI</h2>
      <p style="color: var(--fg-muted); margin-bottom: 20px; font-size: 14px;">
        Apply a clean, frosted glass effect to the entire app.
      </p>
      
      <button class="btn ${isEnabled ? 'btn-secondary' : 'btn-primary'}" id="glass-toggle-btn" style="width: 100%; padding: 12px; font-size: 16px; margin-bottom: 24px;">
        ${isEnabled ? 'Disable Glass UI' : 'Enable Glass UI'}
      </button>

      <div id="glass-settings-panel" style="${isEnabled ? '' : 'display: none;'}">
        <div class="glass-controls" style="text-align: left; background: var(--bg-subtle); padding: 16px; border-radius: var(--radius-md);">
          
          <div class="control-row" style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 500;">Opacity</span>
            <input type="range" id="slider-opacity" min="0" max="100" value="${settings.opacity}" style="flex: 1; margin: 0 12px; accent-color: var(--accent-blue);">
            <span id="val-opacity" style="font-family: var(--font-mono); font-size: 12px;">${settings.opacity}%</span>
          </div>

          <div class="control-row" style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 500;">Smoothness</span>
            <input type="range" id="slider-blur" min="0" max="30" value="${settings.blur}" style="flex: 1; margin: 0 12px; accent-color: var(--accent-blue);">
            <span id="val-blur" style="font-family: var(--font-mono); font-size: 12px;">${settings.blur}px</span>
          </div>

          <div class="control-row" style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 500;">Roundness</span>
            <input type="range" id="slider-radius" min="0" max="32" value="${settings.radius}" style="flex: 1; margin: 0 12px; accent-color: var(--accent-blue);">
            <span id="val-radius" style="font-family: var(--font-mono); font-size: 12px;">${settings.radius}px</span>
          </div>

        </div>
      </div>
    </div>
  `;

  const toggleBtn = container.querySelector('#glass-toggle-btn');
  const settingsPanel = container.querySelector('#glass-settings-panel');
  const opacitySlider = container.querySelector('#slider-opacity');
  const blurSlider = container.querySelector('#slider-blur');
  const radiusSlider = container.querySelector('#slider-radius');

  // --- 1. Inject the CSS ---
  function applyGlassUI() {
    if (document.getElementById('glass-ui-styles')) return;

    const style = document.createElement('style');
    style.id = 'glass-ui-styles';
    style.innerHTML = `
      /* Clean, simple background that works for Dark & Light mode */
      body {
        background: var(--bg-default) !important;
        background-image: 
          radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 50% 100%, rgba(16, 185, 129, 0.05) 0%, transparent 50%) !important;
        background-attachment: fixed !important;
      }

      /* The Glass Effect */
      .app-header, .card, .modal-content, .menu-dropdown, .tool-list, .profile-header, .recipe-card, .empty {
        background: rgba(255, 255, 255, var(--g-opacity, 0.1)) !important;
        backdrop-filter: blur(var(--g-blur, 16px)) saturate(180%) !important;
        -webkit-backdrop-filter: blur(var(--g-blur, 16px)) saturate(180%) !important;
        border: 1px solid rgba(128, 128, 128, 0.2) !important;
        border-radius: var(--g-radius, 12px) !important;
        box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1) !important;
      }

      /* Fix inputs and toggles to look like glass */
      .input, .custom-select-btn, .mode-toggle, .code-block {
        background: rgba(128, 128, 128, 0.1) !important;
        border: 1px solid rgba(128, 128, 128, 0.2) !important;
        color: var(--fg-default) !important;
        border-radius: var(--g-radius, 12px) !important;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05) !important;
      }
      
      /* The code block specifically */
      html.dark-mode .code-block, body:not(.light-mode) .code-block {
          background: rgba(0, 0, 0, 0.4) !important;
      }

      /* Tab rows and hover states */
      .tool-row {
        background: transparent !important;
        border-bottom: 1px solid rgba(128, 128, 128, 0.1) !important;
        border-radius: 0 !important;
      }
      .tool-row:hover { background: rgba(128, 128, 128, 0.1) !important; }

      /* Fix Text Colors to ensure readability */
      * { color: var(--fg-default) !important; }
      .text-muted, p, .setting-desc, .empty-text { color: var(--fg-muted) !important; }
      
      /* Buttons */
      .btn-primary { 
        background: var(--accent-blue) !important; 
        color: #fff !important; 
      }
      
      /* Custom scrollbar for sliders */
      input[type=range] {
        -webkit-appearance: none;
        height: 6px;
        background: var(--border-muted);
        border-radius: 3px;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: var(--fg-default);
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }

  // --- 2. Update Variables ---
  function updateCSSVariables() {
    document.documentElement.style.setProperty('--g-opacity', (opacitySlider.value / 100).toFixed(2));
    document.documentElement.style.setProperty('--g-blur', `${blurSlider.value}px`);
    document.documentElement.style.setProperty('--g-radius', `${radiusSlider.value}px`);
    
    // Save to local storage
    localStorage.setItem('glass_ui_settings', JSON.stringify({
      opacity: opacitySlider.value,
      blur: blurSlider.value,
      radius: radiusSlider.value
    }));
  }

  // --- 3. Event Listeners ---
  toggleBtn.addEventListener('click', () => {
    const currentlyEnabled = localStorage.getItem('glass_ui_enabled') === 'true';
    
    if (currentlyEnabled) {
      localStorage.setItem('glass_ui_enabled', 'false');
      const style = document.getElementById('glass-ui-styles');
      if (style) style.remove();
      
      toggleBtn.textContent = 'Enable Glass UI';
      toggleBtn.className = 'btn btn-primary';
      settingsPanel.style.display = 'none';
    } else {
      localStorage.setItem('glass_ui_enabled', 'true');
      applyGlassUI();
      updateCSSVariables();
      
      toggleBtn.textContent = 'Disable Glass UI';
      toggleBtn.className = 'btn btn-secondary';
      settingsPanel.style.display = 'block';
    }
  });

  opacitySlider.addEventListener('input', (e) => {
    container.querySelector('#val-opacity').textContent = `${e.target.value}%`;
    updateCSSVariables();
  });
  blurSlider.addEventListener('input', (e) => {
    container.querySelector('#val-blur').textContent = `${e.target.value}px`;
    updateCSSVariables();
  });
  radiusSlider.addEventListener('input', (e) => {
    container.querySelector('#val-radius').textContent = `${e.target.value}px`;
    updateCSSVariables();
  });

  // Initialize if already enabled
  if (isEnabled) {
    applyGlassUI();
    updateCSSVariables();
  }
}
