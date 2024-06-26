import Ship from "./Ship";

const defaultBoardSize = 10;

function createGrid() {
  const grid: any[][] = [];

  for (let x = 0; x < defaultBoardSize; x++) {
    grid.push([]);
    for (let y = 0; y < defaultBoardSize; y++) {
      grid[x].push(null);
    }
  }

  return grid;
}

export default class GameboardModel {
  private boardModel: any[][];
  private missed: number[][];
  private hits: number[][];

  constructor() {
    this.boardModel = createGrid();
    this.missed = createGrid();
    this.hits = createGrid();
  }

  private validatePlacement(
    length: number,
    x: number,
    y: number,
    orientation: number,
  ) {
    const positions: number[][] = [];

    for (let i = 0; i < length; i++) {
      if (orientation === 1) {
        if (y + i >= defaultBoardSize)
          throw new Error("PlacementError: Out of bounds");

        if (this.boardModel[x][y + i] instanceof Ship)
          throw new Error(
            `PlacementError: Collides with existing ship at [${x}, ${y + 1}]`,
          );

        positions.push([x, y + i]);
      } else if (orientation === 2) {
        if (x + i >= defaultBoardSize)
          throw new Error("PlacementError: Out of bounds");

        if (this.boardModel[x + 1][y] instanceof Ship)
          throw new Error(
            `PlacementError: Collides with existing ship at [${x + 1}, ${y}]`,
          );

        positions.push([x + i, y]);
      } else {
        throw new Error("InputError: Invalid orientation");
      }
    }

    return positions;
  }

  // orientation = 1: vertical, orientation = 2: horizontal
  // returns 0 if success, 1 if failure
  place(length: number, x: number, y: number, orientation: number = 1) {
    const ship = new Ship(length);

    const positions: number[][] = this.validatePlacement(
      length,
      x,
      y,
      orientation,
    );

    positions.forEach((coord) => (this.boardModel[coord[0]][coord[1]] = ship));
  }

  receiveAttack(x: number, y: number) {
    if (this.missed[x][y] === 1 || this.hits[x][y] === 1) {
      throw new Error("SelectionError: Target already selected");
    } else {
      const target = this.boardModel[x][y];

      if (target !== null) {
        target.hit();
        this.hits[x][y] = 1;
      } else {
        this.missed[x][y] = 1;
      }
    }
  }

  allSunk() {
    let result = true;

    this.boardModel.forEach((x) => {
      x.forEach((tile) => {
        if (tile !== null && tile.isSunk() === false) result = false;
      });
    });

    return result;
  }

  get board() {
    const compiledBoardModel: any[][] = createGrid();

    //ship is 1, hit is 2, missed is 3
    this.boardModel.forEach((col, x) => {
      col.forEach((tile, y) => {
        if (this.hits[x][y] !== null) {
          compiledBoardModel[x][y] = 2;
        } else if (this.missed[x][y] !== null) {
          compiledBoardModel[x][y] = 3;
        } else if (this.boardModel[x][y] !== null) {
          compiledBoardModel[x][y] = 1;
        }
      });
    });

    return compiledBoardModel;
  }
}
