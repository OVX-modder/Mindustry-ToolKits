export const pluginInfo = {
  id: "dice-roller",
  name: "Dice Roller",
  description: "Roll a D6 for challenge runs.",
  author: "Ovx"
};

export function mount(container) {
  container.innerHTML = `
    <div class="card" style="text-align: center; margin-top: 24px;">
      <h2 style="font-size: 48px; margin: 20px 0; color: var(--accent-blue);" id="dice-result">🎲 0</h2>
      <button class="btn btn-primary" id="roll-btn" style="width: 100%; font-size: 18px; padding: 12px;">Roll Dice</button>
    </div>
  `;
  
  container.querySelector('#roll-btn').addEventListener('click', () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    container.querySelector('#dice-result').textContent = `🎲 ${roll}`;
  });
}
