export const pluginInfo = {
  id: "liquid-glass",
  name: "Liquid Glass Studio",
  description: "A playground for the modern frosted glass UI effect.",
  author: "Ovx",
  category: "utility"
};

export function mount(container) {
  // We use a scoped style block to handle the complex animations and pseudo-elements
  container.innerHTML = `
    <style>
      .glass-playground {
        position: relative;
        width: 100%;
        height: 400px;
        border-radius: var(--radius-md);
        overflow: hidden;
        background: #0f172a;
        margin-bottom: 20px;
        touch-action: none; /* Prevents scrolling while dragging */
      }
      
      /* The colorful background blobs */
      .glass-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(40px);
        opacity: 0.8;
        animation: float 6s ease-in-out infinite;
      }
      .blob-1 { width: 200px; height: 200px; background: #ff007f; top: -20px; left: -20px; }
      .blob-2 { width: 250px; height: 250px; background: #00f0ff; bottom: -50px; right: -20px; animation-delay: -2s; }
      .blob-3 { width: 180px; height: 180px; background: #8a2be2; top: 40%; left: 30%; animation-delay: -4s; }

      @keyframes float {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(20px, -20px) scale(1.1); }
        100% { transform: translate(0, 0) scale(1); }
      }

      /* The Draggable Glass Card */
      .glass-card {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: grab;
        user-select: none;
        
        /* The Magic Glass Effect */
        background: rgba(255, 255, 255, var(--glass-opacity, 0.1));
        backdrop-filter: blur(var(--glass-blur, 12px));
        -webkit-backdrop-filter: blur(var(--glass-blur, 12px));
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: var(--glass-radius, 24px);
        box-shadow: 
          0 8px 32px 0 rgba(0, 0, 0, 0.37),
          inset 0 0 0 1px rgba(255, 255, 255, 0.1);
      }
      
      .glass-card:active { cursor: grabbing; }
      
      .glass-card h3 { margin: 0; font-size: 24px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
      .glass-card p { margin: 8px 0 0 0; font-size: 12px; opacity: 0.8; }

      /* Controls */
      .glass-controls {
        background: var(--bg-subtle);
        padding: 16px;
        border-radius: var(--radius-md);
        border: 1px solid var(--border-default);
      }
      .control-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 13px;
        color: var(--fg-muted);
      }
      .control-row input[type="range"] {
        width: 50%;
        accent-color: var(--accent-blue);
      }
    </style>

    <div class="glass-playground" id="playground">
      <div class="glass-blob blob-1"></div>
      <div class="glass-blob blob-2"></div>
      <div class="glass-blob blob-3"></div>
      
      <div class="glass-card" id="glass-card">
        <h3>Glass</h3>
        <p>Drag me around!</p>
      </div>
    </div>

    <div class="glass-controls">
      <div class="control-row">
        <span>Blur</span>
        <input type="range" id="ctrl-blur" min="0" max="30" value="12">
        <span id="val-blur">12px</span>
      </div>
      <div class="control-row">
        <span>Opacity</span>
        <input type="range" id="ctrl-opacity" min="0" max="100" value="10">
        <span id="val-opacity">0.1</span>
      </div>
      <div class="control-row" style="margin-bottom: 0;">
        <span>Radius</span>
        <input type="range" id="ctrl-radius" min="0" max="50" value="24">
        <span id="val-radius">24px</span>
      </div>
    </div>
  `;

  const card = container.querySelector('#glass-card');
  const playground = container.querySelector('#playground');

  // --- 1. Slider Logic ---
  const blurSlider = container.querySelector('#ctrl-blur');
  const opacitySlider = container.querySelector('#ctrl-opacity');
  const radiusSlider = container.querySelector('#ctrl-radius');

  blurSlider.addEventListener('input', (e) => {
    card.style.setProperty('--glass-blur', `${e.target.value}px`);
    container.querySelector('#val-blur').textContent = `${e.target.value}px`;
  });

  opacitySlider.addEventListener('input', (e) => {
    const opacity = (e.target.value / 100).toFixed(2);
    card.style.setProperty('--glass-opacity', opacity);
    container.querySelector('#val-opacity').textContent = opacity;
  });

  radiusSlider.addEventListener('input', (e) => {
    card.style.setProperty('--glass-radius', `${e.target.value}px`);
    container.querySelector('#val-radius').textContent = `${e.target.value}px`;
  });

  // --- 2. Drag Logic (Mobile Touch & Mouse) ---
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;

  function startDrag(e) {
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Get current position relative to playground
    const rect = card.getBoundingClientRect();
    const parentRect = playground.getBoundingClientRect();
    
    initialLeft = rect.left - parentRect.left;
    initialTop = rect.top - parentRect.top;
    
    startX = clientX;
    startY = clientY;
    
    card.style.transform = 'none'; // Remove the centering transform
    card.style.left = `${initialLeft}px`;
    card.style.top = `${initialTop}px`;
  }

  function onDrag(e) {
    if (!isDragging) return;
    e.preventDefault(); // Stop page scrolling

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    card.style.left = `${initialLeft + dx}px`;
    card.style.top = `${initialTop + dy}px`;
  }

  function stopDrag() {
    isDragging = false;
  }

  // Attach events
  card.addEventListener('touchstart', startDrag, { passive: false });
  card.addEventListener('mousedown', startDrag);
  
  document.addEventListener('touchmove', onDrag, { passive: false });
  document.addEventListener('mousemove', onDrag);
  
  document.addEventListener('touchend', stopDrag);
  document.addEventListener('mouseup', stopDrag);
  }
