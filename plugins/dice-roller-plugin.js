export const pluginInfo = {
  id: "dice-roller",
  name: "Dice Roller",
  description: "Roll D4, D6, D8, D10, D12, or D20. Includes history!",
  author: "Ovx"
};

export function mount(container) {
  // The new UI
  container.innerHTML = `
    <div class="card" style="text-align: center; padding: 20px;">
      
      <!-- Dice Selector -->
      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 20px;">
        <button class="btn btn-secondary dice-btn active" data-sides="4">D4</button>
        <button class="btn btn-secondary dice-btn active" data-sides="6" style="background: var(--accent-blue); color: white; border-color: var(--accent-blue);">D6</button>
        <button class="btn btn-secondary dice-btn" data-sides="8">D8</button>
        <button class="btn btn-secondary dice-btn" data-sides="10">D10</button>
        <button class="btn btn-secondary dice-btn" data-sides="12">D12</button>
        <button class="btn btn-secondary dice-btn" data-sides="20">D20</button>
      </div>

      <!-- Result Display -->
      <div style="height: 120px; display: flex; align-items: center; justify-content: center;">
        <h2 id="dice-result" style="font-size: 80px; margin: 0; color: var(--accent-blue); transition: transform 0.1s;">-</h2>
      </div>

      <!-- Roll Button -->
      <button class="btn btn-primary" id="roll-btn" style="width: 100%; font-size: 18px; padding: 14px; margin-bottom: 24px;">
        Roll Dice
      </button>

      <!-- History -->
      <div style="text-align: left; border-top: 1px solid var(--border-muted); padding-top: 16px;">
        <h4 style="margin: 0 0 10px 0; color: var(--fg-muted); font-size: 13px;">Roll History</h4>
        <div id="history-list" style="display: flex; flex-wrap: wrap; gap: 8px;">
          <span class="text-muted" style="font-size: 12px;">No rolls yet.</span>
        </div>
      </div>

    </div>
  `;

  let currentSides = 6;
  const history = [];
  
  const resultEl = container.querySelector('#dice-result');
  const historyList = container.querySelector('#history-list');
  const diceBtns = container.querySelectorAll('.dice-btn');
  const rollBtn = container.querySelector('#roll-btn');

  // Handle Dice Type Selection
  diceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Reset styles
      diceBtns.forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--fg-muted)';
        b.style.borderColor = 'var(--border-muted)';
      });
      
      // Highlight selected
      btn.style.background = 'var(--accent-blue)';
      btn.style.color = 'white';
      btn.style.borderColor = 'var(--accent-blue)';
      
      currentSides = parseInt(btn.dataset.sides);
      resultEl.textContent = '-'; // Reset result
    });
  });

  // Handle Rolling
  rollBtn.addEventListener('click', () => {
    // Animate the text out
    resultEl.style.transform = 'scale(0.5)';
    resultEl.style.opacity = '0.5';
    
    setTimeout(() => {
      // Generate random number
      const roll = Math.floor(Math.random() * currentSides) + 1;
      
      // Update display
      resultEl.textContent = roll;
      resultEl.style.transform = 'scale(1.1)';
      resultEl.style.opacity = '1';
      
      // Add to history
      history.unshift(`D${currentSides}: ${roll}`);
      if (history.length > 10) history.pop(); // Keep only last 10

      // Update history UI
      historyList.innerHTML = history.map(h => 
        `<span class="tag-badge" style="background: var(--bg-subtle); color: var(--fg-default); font-size: 12px; padding: 4px 8px;">${h}</span>`
      ).join('');

      // Bounce back to normal size
      setTimeout(() => {
        resultEl.style.transform = 'scale(1)';
      }, 150);

    }, 150); // Wait for the shrink animation
  });
}
