import { $ } from "../../core/Dom";
import { generateRandomAreas } from "../../core/utils";
import { getSegment } from "./game.functions";

export function getTemplate(rowsCount, colsCount) {
  const map = getGameMap();
  const $root = $.create("div");
  $root.html(map);

  return $root;

  function toCell(row, areas) {
    return (_, col) => {
      const segment = getSegment(row, col, areas);
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

  function getGameMap() {
    const areas = generateRandomAreas(rowsCount, colsCount)
    const rows = [];
    for (let row = 0; row < rowsCount; row++) {
      const cells = new Array(colsCount)
        .fill("")
        .map(toCell(row, areas))
        .join("");
      rows.push(createRow(cells));
    }
    return rows.join("");
  }
}
