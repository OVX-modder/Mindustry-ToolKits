// The metadata the app reads to show the name and description in Settings
export const pluginInfo = {
  id: "dice-roller",
  name: "Dice Roller",
  description: "Roll a D6 for challenge runs or random events.",
  author: "Ovx"
};

// The UI that gets injected into the app
export function mount(container) {
  // We use your app's CSS classes (like .card and .btn) so it looks native!
  container.innerHTML = `
    <div class="card" style="text-align: center; margin-top: 24px; padding: 40px 20px;">
      <h2 style="font-size: 64px; margin: 0 0 20px 0; color: var(--accent-blue);" id="dice-result">🎲</h2>
      <p style="color: var(--fg-muted); margin-bottom: 30px;">Tap to roll a 6-sided die.</p>
      <button class="btn btn-primary" id="roll-btn" style="width: 100%; font-size: 18px; padding: 14px;">Roll Dice</button>
    </div>
  `;
  
  // Add the logic for the button
  const btn = container.querySelector('#roll-btn');
  const result = container.querySelector('#dice-result');

  btn.addEventListener('click', () => {
    // Generate a random number between 1 and 6
    const roll = Math.floor(Math.random() * 6) + 1;
    
    // Update the screen
    result.textContent = roll;
    
    // Add a little animation
    result.style.transform = 'scale(1.2)';
    setTimeout(() => {
      result.style.transform = 'scale(1)';
    }, 150);
  });
}
