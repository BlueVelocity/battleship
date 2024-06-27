import "./style.css";
import HeaderComponent from "./view/components/Header";
import GameAreaComponent from "./view/components/GameArea";
import GameBoardComponent from "./view/components/GameBoard";

import Player from "./model/modules/Player";

const body = document.querySelector("body");

const header = new HeaderComponent("BATTLESHIP");
body.appendChild(header.elem);

const gameArea = new GameAreaComponent();
body.appendChild(gameArea.elem);

//Create and display Player 1
const p1Model = new Player(false);
p1Model.gameBoard.place(2, 0, 2);
p1Model.gameBoard.place(3, 2, 2);
p1Model.gameBoard.place(3, 4, 2);
p1Model.gameBoard.place(4, 6, 2);
p1Model.gameBoard.place(5, 8, 2);

const p1Board = new GameBoardComponent("player");
gameArea.elem.appendChild(p1Board.elem);
p1Board.load(p1Model.gameBoard.board);

//Create and display Player 2
const p2Model = new Player(true);
p2Model.gameBoard.place(2, 0, 2);
p2Model.gameBoard.place(3, 2, 2);
p2Model.gameBoard.place(3, 4, 2);
p2Model.gameBoard.place(4, 6, 2);
p2Model.gameBoard.place(5, 8, 2);

const p2Board = new GameBoardComponent("computer");
gameArea.elem.appendChild(p2Board.elem);
p2Board.load(p2Model.gameBoard.board);

p1Model.gameBoard.place(5, 2, 2, 2);
p1Board.reLoad(p1Model.gameBoard.board);
