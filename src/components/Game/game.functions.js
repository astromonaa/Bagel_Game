import { HERO, MOVE_KEYS, TILE, WALL, ATTACK_KEY, getAreas, ENEMY, HP, SWORD, DEFAUT_ID } from "../../core/utils";

export function getSegment(rowsCount, colsCount, row, col) {
  let segment = WALL
  const areas = getAreas(rowsCount, colsCount)
  for (const area of areas.tile.areas) {
    if ((row >= area.from.row && col >= area.from.col) && (row <= area.to.row && col <= area.to.col)) {
      return segment = TILE
    }
  }
  return segment
}

export function getPositionEl (type, rows, cols, root) {
  const {startPosition} = getAreas()
  let posId
  while (true) {
    if (type === HERO) {
      posId = `${startPosition.row}:${startPosition.col}`
    }else {
      posId = `${Math.floor(Math.random() * rows)}:${Math.floor(Math.random() * cols)}`
    }
    const findPositionEl = root.find(`[data-id="${posId}"]`)
    if (findPositionEl.data().segment !== WALL && !findPositionEl.data().busy) {
      return findPositionEl
    }
  }
}


export function moving(key) {
  return Object.values(MOVE_KEYS).includes(key.toLowerCase())
}

export function getNextSelector(key, colsCount, rowsCount, {row, col}) {
  const MIN_VALUE = 0
  const {BOTTOM, LEFT, RIGHT, TOP} = MOVE_KEYS
  switch(key) {
    case TOP:
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
    case RIGHT:
      col = col + 1 > colsCount - 1 ? colsCount - 1 : col + 1
      break
    case BOTTOM:
      row = row + 1 > rowsCount - 1 ? rowsCount - 1 : row + 1
      break
    case LEFT:
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    default:
      break
  }
  return `[data-id="${row}:${col}"]`
}

export function canMove($nextPosition) {
  return $nextPosition.data().segment !== WALL && !$nextPosition.data().busy
}
export function atacking(key) {
  return key === ATTACK_KEY
}

function componentsIsEqual(nearEl, component) {
  return nearEl?.id() === component.position?.id()
}

export function getNearEnemies(nearElements, components, hero) {
  const nearEnemies = []
  const enemyType = hero.type === HERO ? ENEMY : HERO
  nearElements.forEach(nearEl => {
    components.forEach(component => {
      if (componentsIsEqual(nearEl, component)) {
        if (component.type === enemyType) {
          nearEnemies.push(component)
        }
      }
    })
  })
  return nearEnemies
}
export function handleAttack(nearEnemies, hero, attacked, filterComponents) {
  nearEnemies.forEach(enemy => {
    const attackedPlayer = attacked === ENEMY ? enemy : hero
    const attackingPlayer = attacked === ENEMY ? hero : enemy
    attackedPlayer.getAttack(attackingPlayer.hitForce)

    if (attackedPlayer.health <= 0) {
      filterComponents(component => !component.isExpired)
    }
  })
}

export function getNearEnemiesComplexInfo($root, hero, components) {
  if(hero?.health > 0) {
    const id = hero.position.id(true)
    const nearElements = Object.values($root.nearElements(id)).filter(item => item.$el)
    const nearEnemies = getNearEnemies(nearElements, components, hero)
  
    return nearEnemies
  } 
}
export function getRandomPosition(position, $el, rowsCount, colsCount) {
  const currentPosId = position.id(true) || DEFAUT_ID
  
  const randomDirectionIdx = Math.floor(Math.random() * Object.values(MOVE_KEYS).length)
  const randomDirection = Object.values(MOVE_KEYS)[randomDirectionIdx]
  const $randomPosition = $el.find(getNextSelector(randomDirection, colsCount, rowsCount, currentPosId))

  if (canMove($randomPosition)) {
    return $randomPosition
  }else {
    return position
  }

}

export function onGetHpOrSword(components, hero, filterComponents) {
  components.forEach(component => {
    if (component.position.id() === hero.position.id()) {
      if (component.type === HP) {
        hero.getHP(component.hp)
        expireComponent(component, filterComponents)
      }else if (component.type === SWORD) {
        hero.improveHitForce(component.hitForce)
        expireComponent(component, filterComponents)
      }
    }
  })
}

function expireComponent(component, filterComponents) {
  component.expire()
  component.removeNodeFromDocument()
  filterComponents(component => !component.isExpired)
}