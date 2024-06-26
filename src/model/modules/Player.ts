import GameBoard from "./GameBoard";

export default class Player {
  gameBoard: GameBoard;
  computer: boolean;

  constructor(isComputer: boolean) {
    this.gameBoard = new GameBoard();
    this.computer = isComputer;
  }
}
