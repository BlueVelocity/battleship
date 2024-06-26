import "./style.css";
import GameBoard from "./model/modules/GameBoard";

const board = new GameBoard();
board.place(2, 5, 5);

board.receiveAttack(5, 5);
board.receiveAttack(5, 6);

console.log(board);
console.log(board.allSunk());
