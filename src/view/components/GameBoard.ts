import InteractiveElement from "../modules/InteractiveElement";

export default class GameBoardComponent extends InteractiveElement {
  name: string;
  private tiles: Element[] = [];

  private styles = {
    tileEmptySelect:
      "flex-auto border border-black bg-blue-500 hover:cursor-pointer active:outline-red-500 active:outline-4 active:outline active:z-50 active:rounded hover:bg-blue-700",
    tileEmptyNoSelect: "flex-auto border border-black bg-blue-500",
    tileShip: "flex-auto border border-black bg-orange-500",
    tileHit: "flex-auto border border-black bg-red-500",
    tileMiss: "flex-auto border border-black bg-gray-500",
    tileSunk: "flex-auto border border-black bg-red-900",
  };

  constructor(name: string) {
    super("div");

    this.elem.id = name;
    this.appendClassList("flex aspect-square h-full flex-col bg-blue-500");
  }

  static getTileCoordinate(tile: Element) {
    const tileCoordStr: string = tile.getAttribute("data-coord");
    return tileCoordStr.split(",").map((coord) => Number(coord));
  }

  load(
    grid: any[][],
    shipsHidden: boolean = false,
    selectable: boolean = false,
  ) {
    this.clearChildren();

    grid.forEach((row, y) => {
      const domRow = new InteractiveElement("div");
      domRow.appendClassList("flex-auto flex");

      row.forEach((tile, x) => {
        const domTile = new InteractiveElement("div");
        domTile.elem.setAttribute("data-coord", `${x},${y}`);

        this.tiles.push(domTile.elem);

        if (grid[x][y] === 1 && shipsHidden === false) {
          domTile.appendClassList(this.styles.tileShip);
        } else if (grid[x][y] === 2) {
          domTile.appendClassList(this.styles.tileHit);
        } else if (grid[x][y] === 3) {
          domTile.appendClassList(this.styles.tileMiss);
        } else if (grid[x][y] === 4) {
          domTile.appendClassList(this.styles.tileSunk);
        } else if (selectable === true) {
          domTile.appendClassList(this.styles.tileEmptySelect);
        } else {
          domTile.appendClassList(this.styles.tileEmptyNoSelect);
        }

        domRow.elem.appendChild(domTile.elem);
      });

      this.elem.appendChild(domRow.elem);
    });

    // Adds element id (name) below game board
    const boardOwner = new InteractiveElement("span");
    boardOwner.appendClassList("relative bg-sky-200");
    boardOwner.elem.textContent =
      this.elem.id.charAt(0).toUpperCase() + this.elem.id.slice(1);
    this.elem.appendChild(boardOwner.elem);
  }

  get domTiles() {
    return this.tiles;
  }
}
