import { ENEMY } from "../../core/utils";
import {
  getNearEnemiesComplexInfo,
  getRandomPosition,
} from "../Game/game.functions";
import { Player } from "../Player/Player";

export class Enemy extends Player {
  static className = "enemy";
  constructor($root) {
    super($root, {
      type: ENEMY,
    });
    this.hitForce = 20;
  }
  init($position, game) {
    super.init($position);
    this.initEnemyMove(game);
  }
  initEnemyMove(game) {
    this.interval = setInterval(() => {
      if (this.position) {
        this.setPosition(
          getRandomPosition(
            this.position,
            game.$el,
            game.rowsCount,
            game.colsCount
          )
        );
        const nearEnemies = getNearEnemiesComplexInfo(
          game.$el,
          this,
          game.components
        );
        nearEnemies.length && nearEnemies.forEach(hero => this.onHeroAttack(hero, game));
      } else {
        clearInterval(this.interval);
      }
    }, 700);
  }
  destroy() {
    super.destroy();
    clearInterval(this.interval);
  }
  onHeroAttack(hero, game) {
    hero.getAttack(this.hitForce);
    if (hero.health <= 0) {
      game.filterComponents((component) => !component.isExpired);
    }
  }
}
