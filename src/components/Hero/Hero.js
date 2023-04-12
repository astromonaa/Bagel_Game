import { HERO } from "../../core/utils";
import { Player } from "../Player/Player";

export class Hero extends Player {
  static className='hero'
  constructor($root) {
    super($root, {
      type: HERO,
    })
    this.hitForce = 30
  }
}