import { $ } from "../../core/Dom";
import { DomListeners } from "../../core/DomListeners";
import { getGameOverTemplate } from "./gameOver.template";

export class GameOver extends DomListeners {
  static className="game-over"
  constructor(game) {
    super($.create('div', GameOver.className), {
      listeners: ['click']
    })
    this.$root = $.create('div', GameOver.className)
    this.game = game
    this.initDomListeners()
  }
  onClick(event) {
    const $target = $(event.target)
    if ($target.data().restart) {
      this.game.restart(this.$root)
    }
  }
  toHTML(ISWIN) {
    return this.$root.html(getGameOverTemplate(ISWIN))
  }
}