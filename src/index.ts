import "./style.css";
import HeaderComponent from "./view/components/Header";
import GameAreaComponent from "./view/components/GameArea";
import GameBoardComponent from "./view/components/GameBoard";
import UtilityArea from "./view/components/UtilityArea";
import ShipPlacementButtons from "./view/components/ShipPlacementButtons";
import WinnerScreen from "./view/components/WinnerScreen";

import ModelViewInterface from "./view/modules/ModelViewInterface";
import Player from "./model/modules/Player";
import InteractiveElement from "./view/modules/InteractiveElement";

// SETUP FRAME
const body = document.querySelector("body");

// Create and display the header
const header = new HeaderComponent("BATTLESHIP");
body.appendChild(header.elem);

// Create and display the Game Area
const gameArea = new GameAreaComponent();
body.appendChild(gameArea.elem);

// Create and display the Utility Area
const utilityArea = new UtilityArea();
body.appendChild(utilityArea.elem);

// CREATE PLAYERS
// Instantiate player 1, their board, and establish model-view connection
const p1Interface = new ModelViewInterface(
  new Player("Player", false),
  new GameBoardComponent("player"),
);

gameArea.appendChildren(p1Interface.boardComponent);
p1Interface.loadBoard(true);

// Instantiate player 2, their board, and establish model-view connection
const p2Interface = new ModelViewInterface(
  new Player("Computer", true),
  new GameBoardComponent("computer"),
);

gameArea.appendChildren(p2Interface.boardComponent);
p2Interface.loadBoard(false, true);
p2Interface.boardComponent.fade();

// PLACE SHIPS
let shipPlacementButtons = new ShipPlacementButtons(p1Interface);
utilityArea.appendChildren(shipPlacementButtons);

// START GAME
shipPlacementButtons.assignToStart(() => startGame());

function startGame() {
  p1Interface.loadBoard(false, false);

  p2Interface.model.gameBoard.autoPlace();
  p2Interface.boardComponent.unFade();
  p1Interface.boardComponent.fadeSoft();
  p2Interface.loadBoard(true, true);

  startGameLoop();
}

function resetGame() {
  p1Interface.model = new Player("Player", false);
  p2Interface.model = new Player("Computer", true);

  p1Interface.loadBoard(true, false);
  p1Interface.boardComponent.unFadeSoft();
  p2Interface.loadBoard(false, true);
  p2Interface.boardComponent.fade();

  utilityArea.clearChildren();
  shipPlacementButtons = new ShipPlacementButtons(p1Interface);
  shipPlacementButtons.assignToStart(() => startGame());
  ShipPlacementButtons.orientation = 1;
  utilityArea.appendChildren(shipPlacementButtons);
}

function endGame(winner: ModelViewInterface) {
  utilityArea.appendChildren(new WinnerScreen(winner.model.name, resetGame));
}

function startGameLoop() {
  p2Interface.attackLoop(p1Interface, endGame);
}
