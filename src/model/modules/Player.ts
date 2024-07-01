import GameBoard from "./GameBoard";

export default class Player {
  gameBoard: GameBoard;
  computer: boolean;
  private previousSelections: number[][] = [];

  constructor(isComputer: boolean) {
    this.gameBoard = new GameBoard();
    this.computer = isComputer;
  }

  autoAttackSelection() {
    const boardSize: number = GameBoard.defaultSize;

    let [x, y] = [
      Math.round(Math.random() * (boardSize - 1)),
      Math.round(Math.random() * (boardSize - 1)),
    ];

    if (this.previousSelections.length > 0) {
      while (
        this.previousSelections.some((selection) => {
          const [compX, compY] = selection;
          if (compX === x && compY === y) return true;
        })
      ) {
        [x, y] = [
          Math.round(Math.random() * (boardSize - 1)),
          Math.round(Math.random() * (boardSize - 1)),
        ];
      }
    }

    this.previousSelections.push([x, y]);
    return [x, y];
  }
}
