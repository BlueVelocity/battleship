import GameBoard from "./GameBoard";

export default class Player {
  gameBoard: GameBoard;
  computer: boolean;

  constructor(type: boolean) {
    this.gameBoard = new GameBoard();
    this.computer = type;
  }
}
