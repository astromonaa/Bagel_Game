import { BUSY, HP, SWORD } from "./utils"

export class GameComponent {
  constructor($root, options) {
    this.$root = $root
    this.type = options.type
    this.position = null
    this.isExpired = false
  }
  init($position) {
    this.setPosition($position)
  }
  setPosition($position) {
    this.clearPositionData()
    this.position = $position
    this.position.append(this.$root)
    if (this.type !== HP && this.type !== SWORD) {
      this.position.data(BUSY, BUSY)
    }
  }
  clearPositionData() {
    this.position?.removeData(BUSY)
    this.position = null
  }
  removeNodeFromDocument() {
    this.position?.removeChild(this.$root)
    this.clearPositionData()
  }
  expire() {
    this.isExpired = true
  }
  destroy() {
    this.removeNodeFromDocument()
  }
}