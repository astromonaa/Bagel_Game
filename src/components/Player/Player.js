import { GameComponent } from "../../core/GameComponet";
import { getChangedHealthLineWidth, getHealthLineTemplate } from "./player.functions";

export class Player extends GameComponent {
  static healthLine = getHealthLineTemplate()
  constructor($root, options) {
    super($root, options)
    this.root = $root
    this.health = 100
    this.maxHealth = 100
  }
  init($position) {
    super.init($position)
    this.health = 100
  }
  
  getAttack(hitForce) {
    this.health -= hitForce
    this.emitAttacking()
    this.changeHealthLineWidth(-hitForce)
    if (this.health <= 0) {
      this.expire()
      this.removeNodeFromDocument()
    }
  }
  changeHealthLineWidth(hitForce) {
    const line = this.$root.find('[data-health="health"]')
    line.setWidth(getChangedHealthLineWidth(line, hitForce))
  }
  emitAttacking() {
    this.$root.addClass('attacked')
    setTimeout(() => {
      this.$root.removeClass('attacked')
    }, 100)
  }

  getHP(hp) {
    this.health += hp
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth
    }
    this.changeHealthLineWidth(hp)
  }
  improveHitForce(hitforce) {
    this.hitForce += hitforce
  }
 
}