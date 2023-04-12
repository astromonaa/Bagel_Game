export function getHealthLineTemplate() {
  return `
    <div class="health-line">
      <div class="line-content" data-health="health"></div>
    </div>
  `
}

export function getChangedHealthLineWidth(line, hitForce) {
  const maxHealth = 100
  const maxLineWidth = 20;
  const lineWidth = +window.getComputedStyle(line.$el).width.replace('px', '')
  const expireInpercents = (hitForce / maxHealth) * 100;
  const lineExpired = (maxLineWidth / 100) * expireInpercents
  const width = lineWidth + lineExpired
  return width + 'px'
}