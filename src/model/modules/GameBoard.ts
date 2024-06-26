import Ship from "./Ship";

const defaultBoardSize = 10;

function createGrid() {
  const board: any[][] = [];

  for (let x = 0; x < defaultBoardSize; x++) {
    board.push([]);
    for (let y = 0; y < defaultBoardSize; y++) {
      board[x].push(null);
    }
  }

  return board;
}

export default class GameBoard {
  board: any[][];
  missed: number[][];
  hits: number[][];

  constructor() {
    this.board = createGrid();
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
        positions.push([x, y + i]);
      } else if (orientation === 2) {
        if (x + i >= defaultBoardSize)
          throw new Error("PlacementError: Out of bounds");
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

    positions.forEach((coord) => (this.board[coord[0]][coord[1]] = ship));
  }

  receiveAttack(x: number, y: number) {
    if (this.missed[x][y] === 1 || this.hits[x][y] === 1) {
      throw new Error("SelectionError: Target already selected");
    } else {
      const target = this.board[x][y];

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

    this.board.forEach((x) => {
      x.forEach((tile) => {
        if (tile !== null && tile.isSunk() === false) result = false;
      });
    });

    return result;
  }
}
