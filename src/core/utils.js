export const HERO = "hero";
export const ENEMY = "enemy";
export const WALL = "field";
export const TILE = "tile";
export const BUSY = "busy"; // Присваивается как data атрибут непустой ячейке (Прим. если в ячейке враг или другой предмет)
export const HP = "hp";
export const SWORD = "sword";
export const DEFAUT_ID = {row: 0, col: 0}

export const MOVE_KEYS = {
  TOP: "w",
  RIGHT: "d",
  BOTTOM: "s",
  LEFT: "a",
};

export const ATTACK_KEY = " ";

export function generateComponents(component, count) {
  return new Array(count).fill("").map(() => component);
}

export function getAreas(rowsCount, colsCount) {
  const areas = {
    startPosition: { row: 3, col: 0 },
    tile: {
      areas: [
        {
          from: {
            row: 3,
            col: 0,
          },
          to: {
            row: 3,
            col: colsCount - 1,
          },
        },
        {
          from: {
            row: 7,
            col: 0,
          },
          to: {
            row: 7,
            col: colsCount - 1,
          },
        },
        {
          from: {
            row: 10,
            col: 0,
          },
          to: {
            row: 10,
            col: colsCount - 1,
          },
        },
        {
          from: {
            row: 13,
            col: 0,
          },
          to: {
            row: 13,
            col: colsCount - 1,
          },
        },
        {
          from: {
            row: 0,
            col: 6,
          },
          to: {
            row: rowsCount - 1,
            col: 6,
          },
        },
        {
          from: {
            row: 0,
            col: 13,
          },
          to: {
            row: rowsCount - 1,
            col: 13,
          },
        },
        {
          from: {
            row: 0,
            col: 19,
          },
          to: {
            row: rowsCount - 1,
            col: 19,
          },
        },
        {
          from: {
            row: 3,
            col: 8,
          },
          to: {
            row: 10,
            col: 8,
          },
        },
        {
          from: {
            row: 3,
            col: 9,
          },
          to: {
            row: 10,
            col: 9,
          },
        },
        {
          from: {
            row: 0,
            col: 15,
          },
          to: {
            row: 7,
            col: 15,
          },
        },
        {
          from: {
            row: 0,
            col: 16,
          },
          to: {
            row: 7,
            col: 16,
          },
        },
        {
          from: {
            row: 0,
            col: 17,
          },
          to: {
            row: 3,
            col: 17,
          },
        },
        {
          from: {
            row: 0,
            col: 18,
          },
          to: {
            row: 3,
            col: 18,
          },
        },
        {
          from: {
            row: 0,
            col: 20,
          },
          to: {
            row: 3,
            col: 20,
          },
        },
        {
          from: {
            row: 4,
            col: 21,
          },
          to: {
            row: 4,
            col: 26,
          },
        },
        {
          from: {
            row: 5,
            col: 21,
          },
          to: {
            row: 5,
            col: 26,
          },
        },
        {
          from: {
            row: 0,
            col: 21,
          },
          to: {
            row: 0,
            col: 25,
          },
        },
        {
          from: {
            row: 1,
            col: 22,
          },
          to: {
            row: 1,
            col: 25,
          },
        },
        {
          from: {
            row: 9,
            col: 15,
          },
          to: {
            row: 9,
            col: 20,
          },
        },
        {
          from: {
            row: 11,
            col: 15,
          },
          to: {
            row: 11,
            col: 20,
          },
        },
        {
          from: {
            row: 9,
            col: 22,
          },
          to: {
            row: 9,
            col: 26,
          },
        },
        {
          from: {
            row: 11,
            col: 22,
          },
          to: {
            row: 11,
            col: 26,
          },
        },
      ],
    },
  };
  return areas;
}
