import { Game } from './components/Game/Game'
import { Enemy } from './components/Enemy/Enemy';
import { Hp } from './components/HP/HP';
import { Hero } from './components/Hero/Hero';
import { Sword } from './components/Sword/Sword';
import { generateComponents } from './core/utils';
import './scss/index.scss'

const ROWS_COUNT = 20
const COLS_COUNT = 33

const components = [
  Hero,
  ...generateComponents(Sword, 2),
  ...generateComponents(Hp, 6),
  ...generateComponents(Enemy, 7),
]


new Game('#game', {
  rows: ROWS_COUNT, 
  cols: COLS_COUNT,
  components
})
.init()