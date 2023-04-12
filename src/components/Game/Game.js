import { $ } from "../../core/Dom"
import { getPositionEl, moving, getNextSelector, canMove, atacking, handleAttack, getNearEnemiesComplexInfo, onGetHpOrSword } from "./game.functions"
import { getTemplate } from "./game.template"
import {DomListeners} from '../../core/DomListeners'
import { DEFAUT_ID, ENEMY, HERO } from "../../core/utils"
import { GameOver } from "../GameOver/GameOver"

export class Game extends DomListeners {
  constructor(selector, options) {
    super($(selector), {
      listeners: ['keydown']
    })
    this.$el = $(selector)
    this.rowsCount = options.rows
    this.colsCount = options.cols
    this.components = options.components
    this.restartComponents = options.components
    this.hero = null
    this.attackInterval = null
    this.gameOver = new GameOver(this)
  }

  addComponents() {
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className, Component.healthLine)
      
      const component = new Component($el)
      const $findPosition = getPositionEl(component.type, this.rowsCount, this.colsCount, this.$el)
      component.init($findPosition, this)
      if (component.type === HERO) {
        this.hero = component
      }
      return component
    })
  }
  onKeydown(event) {
    let {key} = event
    key = key.toLowerCase()
    const id = this.hero?.position?.id(true) || DEFAUT_ID
    let nearEnemies = []
    const filterFn = this.filterComponents.bind(this)
    
    if (moving(key)) {
      const $nextPosition = this.$el.find(getNextSelector(key, this.colsCount, this.rowsCount, id))
      if (canMove($nextPosition)) {
        this.hero.setPosition($nextPosition)
        this.onGetAttackFromEnemy(nearEnemies, filterFn, this.hero, HERO)

        onGetHpOrSword(this.components, this.hero, filterFn)
      }
      return
    }
    if (atacking(key)) {
      nearEnemies = getNearEnemiesComplexInfo(this.$el, this.hero, this.components)
      if (nearEnemies?.length) {
        handleAttack(nearEnemies, this.hero, ENEMY, filterFn)
      }
    }
  }
  onGetAttackFromEnemy(nearEnemies, filterFn, hero, attackedPlayer) {
    clearInterval(this.attackInterval)
    nearEnemies = getNearEnemiesComplexInfo(this.$el, hero, this.components)
    if (nearEnemies.length) {
      this.attackInterval = setInterval(() => {
        handleAttack(nearEnemies, hero, attackedPlayer, filterFn)
        nearEnemies = getNearEnemiesComplexInfo(this.$el, hero, this.components)
      }, 600)
    }
  }
  filterComponents(callback) {
    this.components = this.components.filter(callback)
    const enemiesCount = this.components.filter(component => component.type === ENEMY).length
    const heroIsLive = this.components.find(component => component.type === HERO)
    let ISWIN = false
    if (!enemiesCount && heroIsLive) {
      ISWIN = true
      this.onGameOver(ISWIN)
    }else if (enemiesCount && !heroIsLive) {
      ISWIN = false
      this.onGameOver(ISWIN)
    }else if (!enemiesCount && !heroIsLive) {
      ISWIN = false
      this.onGameOver(ISWIN)
    }
  }
  onGameOver(ISWIN) { // ISWIN => сосотояние (выигрышь или проигрышь)
    clearInterval(this.attackInterval)
    this.components.forEach(component => component.destroy())
    this.hero = null
    this.components = [...this.restartComponents]
    this.removeDomListeners()
    this.$el.append(this.gameOver.toHTML(ISWIN))
  }
  restart(overTemplate) {
    this.$el.removeChild(overTemplate)
    this.render()
    
  }
  render() {
    this.addComponents()
    this.initDomListeners()
  }

  init() {
    this.$el.append(getTemplate(this.rowsCount, this.colsCount))
    this.render()
  }
}