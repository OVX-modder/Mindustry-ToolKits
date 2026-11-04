// --- 3. MOUNT ENABLED PLUGINS ON STARTUP ---
async function mountEnabledPlugins() {
  if (enabledPlugins.length === 0) return;

  for (const pluginData of enabledPlugins) {
    try {
      // --- THE FIX: Bypass GitHub's security restriction ---
      const response = await fetch(pluginData.url);
      const codeText = await response.text();
      
      // Create a virtual file in the browser memory
      const blob = new Blob([codeText], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);
      
      // Import the virtual file instead of the raw URL
      const module = await import(blobUrl);
      // ----------------------------------------------------
      
      if (!module.pluginInfo || !module.mount) continue;

      const info = module.pluginInfo;
      const panelId = `plugin-${info.id}`;

      // Create the Panel
      const newPanel = document.createElement('section');
      newPanel.className = 'panel';
      newPanel.dataset.panel = panelId;
      newPanel.innerHTML = `
        <button class="back-btn" data-target="home">← Back to Home</button>
        <div id="plugin-content-${info.id}"></div>
      `;
      outlet.appendChild(newPanel);

      // Create the Home Menu Button
      const menuBtn = document.createElement('button');
      menuBtn.className = 'tool-row';
      menuBtn.dataset.target = panelId;
      menuBtn.innerHTML = `
        <div class="tool-left">
          <div class="tool-icon info" style="border-radius: 50%;"></div>
          <span>${info.name}</span>
        </div>
        <span class="chevron">›</span>
      `;
      
      menuBtn.addEventListener('click', () => {
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('is-active'));
        newPanel.classList.add('is-active');
        window.scrollTo(0, 0);
      });
      
      toolList.appendChild(menuBtn);

      // Mount the UI
      const container = newPanel.querySelector(`#plugin-content-${info.id}`);
      module.mount(container);

    } catch (error) {
      console.error(`Failed to load plugin: ${pluginData.url}`, error);
    }
  }
}
