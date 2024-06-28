import InteractiveElement from "../modules/InteractiveElement";
import GameboardModel from "../../model/modules/GameBoard";

export default class GameBoardComponent extends InteractiveElement {
  name: string;
  private tiles: Element[] = [];

  private styles = {
    tileEmptySelect:
      "flex-auto border border-black bg-blue-500 hover:cursor-pointer transition duration-250 linear active:scale-110 active:border-red-500",
    tileEmptyNoSelect: "flex-auto border border-black bg-blue-500",
    tileShip: "flex-auto border border-black bg-orange-500",
    tileHit: "flex-auto border border-black bg-red-500",
    tileMiss: "flex-auto border border-black bg-gray-500",
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

  load(grid: any[][]) {
    grid.forEach((row, y) => {
      const domRow = new InteractiveElement("div");
      domRow.appendClassList("flex-auto flex");

      row.forEach((tile, x) => {
        const domTile = new InteractiveElement("div");
        domTile.elem.setAttribute("data-coord", `${x},${y}`);

        this.tiles.push(domTile.elem);
        if (grid[x][y] === 1) {
          domTile.appendClassList(this.styles.tileShip);
        } else if (grid[x][y] === 2) {
          domTile.appendClassList(this.styles.tileHit);
        } else if (grid[x][y] === 3) {
          domTile.appendClassList(this.styles.tileMiss);
        } else {
          domTile.appendClassList(this.styles.tileEmptySelect);
        }
        domRow.elem.appendChild(domTile.elem);
      });

      this.elem.appendChild(domRow.elem);
    });
  }

  reLoad(grid: any[][]) {
    this.elem.innerHTML = "";
    this.clearChildren();
  }

  blankLoad() {
    const blankGrid = GameboardModel.createGrid();
    this.clearChildren();

    blankGrid.forEach((row, y) => {
      const domRow = new InteractiveElement("div");
      domRow.appendClassList("flex-auto flex");

      row.forEach((tile, x) => {
        const domTile = new InteractiveElement("div");
        domTile.elem.setAttribute("data-coord", `${x},${y}`);

        this.tiles.push(domTile.elem);
        domTile.appendClassList(this.styles.tileEmptyNoSelect);
        domRow.elem.appendChild(domTile.elem);
      });

      this.elem.appendChild(domRow.elem);
    });
  }

  get domTiles() {
    return this.tiles;
  }
}
