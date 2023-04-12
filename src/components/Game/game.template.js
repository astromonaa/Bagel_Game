import { $ } from "../../core/Dom";
import { getSegment } from "./game.functions";

export function getTemplate(rowsCount, colsCount) {
  const map = getGameMap(rowsCount, colsCount);
  const $root = $.create("div");
  $root.html(map);

  return $root;

  function toCell(row) {
    return (_, col) => {
      const segment = getSegment(rowsCount, colsCount, row, col);
      return `
        <div
          class="cell ${segment}"
          data-id="${row}:${col}"
          data-segment="${segment}"
          data-row="${row}"
          data-col="${col}"
        ></div>`;
    };
  }

  function createRow(cells) {
    return `
        <div class="row">${cells}</div>
      `;
  }

  function getGameMap(rowsCount, colsCount) {
    const rows = [];
    for (let row = 0; row < rowsCount; row++) {
      const cells = new Array(colsCount)
        .fill("")
        .map(toCell(row))
        .join("");
      rows.push(createRow(cells));
    }
    return rows.join("");
  }
}
