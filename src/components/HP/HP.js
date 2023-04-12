import { GameComponent } from "../../core/GameComponet";
import { HP } from "../../core/utils";

export class Hp extends GameComponent {
  static className='hp'
  constructor($root) {
    super($root, {
      type: HP
    })
    this.hp = 20
  }
}