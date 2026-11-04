# 🛠️ Mindustry Toolkits - Plugin Developer Guide

Welcome to the Mindustry Toolkits Plugin System! You can create custom tools, games, AI chatbots, or calculators that run directly inside the app. 

Because the app is a Progressive Web App (PWA), plugins are written in standard JavaScript (ES Modules) and hosted directly on GitHub.

---

## 📋 Requirements

Before you start coding, your plugin must meet these requirements:
1. **Single File:** The plugin must be a single `.js` file ending in `-plugin.js`.
2. **Vanilla JavaScript:** Do not use React, jQuery, or any external frameworks.
3. **No External Dependencies:** Do not import external libraries via CDN. The plugin must work 100% offline once loaded.
4. **Exports:** The file *must* export `pluginInfo` and a `mount(container)` function.
5. **Compatibility:** It must work in modern mobile browsers (Chrome/Safari WebKit).

---

## 🚨 Rules & Security (Zero Tolerance)

To protect the app and its users, all plugins are manually reviewed before being approved. Breaking any of these rules will result in an instant rejection.

1. **No Malicious Code:** Crypto miners, trackers, popups, or redirects to external sites are strictly banned.
2. **No API Key Theft:** Do not attempt to read, steal, or log Supabase tokens, passwords, or user data.
3. **No Global Scope Damage:** Do not attach events to `document.body`, `window`, or manipulate elements outside your `container`. You only control your own tab!
4. **No Unauthorized Network Requests:** Plugins should generally be offline. If your plugin needs to fetch data (like an AI chatbot), you must disclose the URL to the developer.
5. **Storage Privacy:** If you use `localStorage`, you **must** prefix your keys with your plugin ID (e.g., `my-plugin_score`). Do not modify the app's core storage keys.

---

## 🚀 How to Submit a Plugin

1. **Create the file:** Name it `<your-plugin-name>-plugin.js` (e.g., `wave-timer-plugin.js`).
2. **Test it locally:** Test it in the app using the local development override.
3. **Submit for Review:** 
   *   Open a Pull Request on this GitHub repository.
   *   OR contact the app developer (Ovx) on Discord with the link to your raw file.
4. **Approval:** The developer will review your code for security and performance. If approved, it will be merged, and it will automatically appear in the app's Plugin Store for everyone.

---

## 📝 The Plugin Template

Every plugin must export **two** things: `pluginInfo` and a `mount` function.

```javascript
// 1. Plugin Metadata (Required)
export const pluginInfo = {
  id: "my-plugin",             // Must be unique, lowercase, no spaces
  name: "My Cool Tool",        // The name shown in the Home menu
  description: "A short description of what this does.",
  author: "YourName",
  category: "utility"          // Filter category: "utility", "game", "logic", or "other"
};

// 2. The UI (Required)
// The app will pass a DOM element (container) to this function.
export function mount(container, appData) {
  // Build your UI inside the container
  container.innerHTML = `
    <div class="card" style="text-align: center;">
      <h2>Hello Mindustry!</h2>
      <button class="btn btn-primary" id="my-btn">Click Me</button>
    </div>
  `;

  // Add your logic
  container.querySelector('#my-btn').addEventListener('click', () => {
    alert("Plugin is working!");
  });
}
