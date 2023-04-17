export const HERO = "hero";
export const ENEMY = "enemy";
export const WALL = "field";
export const TILE = "tile";
export const BUSY = "busy"; // Присваивается как data атрибут непустой ячейке (Прим. если в ячейке враг или другой предмет)
export const HP = "hp";
export const SWORD = "sword";
export const DEFAUT_ID = { row: 0, col: 0 };

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

export function generateRandomAreas(rowsCount, colsCount) {
  const areas = [];
  let area;
  const colsGen = randomGenerator(colsCount);
  const rowsGen = randomGenerator(rowsCount);
  for (let i = 0; i < 8; i++) {
    const randomCol = colsGen();
    const randomRow = rowsGen();
    if (i < 4) {
      area = {
        from: {
          row: 0,
          col: randomCol,
        },
        to: {
          row: rowsCount - 1,
          col: randomCol,
        },
      };
      const room = generateRoom(randomCol, rowsCount, "col");
      areas.push(...room)
    } else {
      area = {
        from: {
          col: 0,
          row: randomRow,
        },
        to: {
          col: colsCount - 1,
          row: randomRow,
        },
      };
      const room = generateRoom(randomRow, colsCount, "row");
      areas.push(...room)
    }
    areas.push(area);
  }
  return areas;
}

function randomGenerator(count) {
  const items = [];
  return () => {
    let find;
    let random = Math.floor(Math.random() * (count - 2 - 2) + 2);
    if (!items.find((el) => Math.abs(random - el) <= 1)) {
      find = random;
    } else {
      if (random > count / 2) {
        find = random - 2;
      } else {
        find = random + 2;
      }
    }
    items.push(find);
    return find;
  };
}

function generateRoom(position, count, field) {
  const room = [];
  const position2 = Math.floor(Math.random() * (count - 2 - 2) + 2);
  if (field === "col") {
    if (position2 > count - 3) {
      for (let i = 0; i < 3; i++) {
        room.push({
          from: {
            row: position2 - i,
            col: position,
          },
          to: {
            row: position2 - i,
            col: position + 3,
          },
        });
      }
    } else {
      for (let i = 0; i < 3; i++) {
        room.push({
          from: {
            row: position2 + i,
            col: position,
          },
          to: {
            row: position2 + i,
            col: position + 3,
          },
        });
      }
    }
  }else {
    if (position2 > count - 3) {
      for (let i = 0; i < 3; i++) {
        room.push({
          from: {
            row: position,
            col: position2 - i
          },
          to: {
            row: position + 3,
            col: position2 - i
          },
        })
      }
    }else {
      for (let i = 0; i < 3; i++) {
        room.push({
          from: {
            row: position,
            col: position2 + i
          },
          to: {
            row: position + 3,
            col: position2 + i
          },
        })
      }
    }
  }
  return room
}