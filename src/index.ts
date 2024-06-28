import "./style.css";
import HeaderComponent from "./view/components/Header";
import GameAreaComponent from "./view/components/GameArea";
import GameBoardComponent from "./view/components/GameBoard";
import ModelViewInterface from "./view/modules/ModelViewInterface";

import Player from "./model/modules/Player";

const body = document.querySelector("body");

//Create the header
const header = new HeaderComponent("BATTLESHIP");
body.appendChild(header.elem);

//Create the game Area
const gameArea = new GameAreaComponent();
body.appendChild(gameArea.elem);

//Create and display Player 1 board
const p1Model = new Player(false);

const p1Board = new GameBoardComponent("player");
gameArea.elem.appendChild(p1Board.elem);
p1Model.gameBoard.place(1, 0, 0);
p1Board.load(p1Model.gameBoard.board);

const p1Interface = new ModelViewInterface(p1Model, p1Board);

//Create and display Player 2 board
const p2Model = new Player(true);

const p2Board = new GameBoardComponent("computer");
gameArea.elem.appendChild(p2Board.elem);
p2Model.gameBoard.place(1, 0, 0);
p2Board.blankLoad();

const p2Interface = new ModelViewInterface(p2Model, p2Board);
p2Interface.boardComponent.fade();

//Prompt player to place ships
