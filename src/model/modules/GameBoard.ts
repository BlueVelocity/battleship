import Ship from "./Ship";

export default class GameboardModel {
  private boardModel: any[][];
  private missed: number[][];
  private hits: number[][];
  private maxShips: number = 5;
  private shipCount: number = 0;
  static defaultSize = 10;

  constructor() {
    this.boardModel = GameboardModel.createGrid();
    this.missed = GameboardModel.createGrid();
    this.hits = GameboardModel.createGrid();
  }

  public static createGrid() {
    const grid: any[][] = [];

    for (let x = 0; x < GameboardModel.defaultSize; x++) {
      grid.push([]);
      for (let y = 0; y < GameboardModel.defaultSize; y++) {
        grid[x].push(null);
      }
    }

    return grid;
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
        if (
          y + i >= GameboardModel.defaultSize ||
          x >= GameboardModel.defaultSize
        )
          throw new Error("PlacementError: Out of bounds");

        if (this.boardModel[x][y + i] instanceof Ship)
          throw new Error("PlacementError: Collides with existing ship");

        positions.push([x, y + i]);
      } else if (orientation === 2) {
        if (
          x + i >= GameboardModel.defaultSize ||
          y >= GameboardModel.defaultSize
        )
          throw new Error("PlacementError: Out of bounds");

        if (this.boardModel[x + i][y] instanceof Ship)
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
  place = (length: number, x: number, y: number, orientation: number = 1) => {
    const ship = new Ship(length);

    const positions: number[][] = this.validatePlacement(
      length,
      x,
      y,
      orientation,
    );

    positions.forEach((coord) => (this.boardModel[coord[0]][coord[1]] = ship));

    this.maxShips++;
    if (this.shipCount >= this.maxShips) return true;
    return false;
  };

  autoPlace() {
    this.place(2, 0, 0, 1);
    this.place(3, 1, 0, 1);
    this.place(3, 2, 0, 1);
    this.place(4, 3, 0, 1);
    this.place(5, 4, 0, 1);
  }

  receiveAttack = (x: number, y: number) => {
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
  };

  allSunk = () => {
    let result = true;

    this.boardModel.forEach((x) => {
      x.forEach((tile) => {
        if (tile !== null && tile.isSunk() === false) result = false;
      });
    });

    return result;
  };

  get board() {
    const compiledBoardModel: any[][] = GameboardModel.createGrid();

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
