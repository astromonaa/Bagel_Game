import { GameComponent } from "../../core/GameComponet";
import { SWORD } from "../../core/utils";


export class Sword extends GameComponent {
  static className='sword'
  constructor($root) {
    super($root, {
      type: SWORD
    })
    this.hitForce = 5
  }
}