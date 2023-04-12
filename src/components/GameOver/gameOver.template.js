export function getGameOverTemplate(ISWIN) {
  const text = ISWIN ? 'YOU WIN!' : 'GAME OVER'
  return `
    <div class="game-over__content">
      <b>${text}</b>
      <button data-restart="true">Restart</button>
    </div>
  `
}