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
const bodyElement = document.querySelector("body");
const body = new InteractiveElement(bodyElement);

const header = new HeaderComponent("BATTLESHIP");
const gameArea = new GameAreaComponent();
const utilityArea = new UtilityArea();

body.appendChildren(header, gameArea, utilityArea);

// CREATE PLAYERS
// Instantiate player 1, their board, and establish model-view connection
const p1Interface = new ModelViewInterface(
  new Player("Player", false),
  new GameBoardComponent("player"),
);

p1Interface.loadBoard(true);

// Instantiate player 2, their board, and establish model-view connection
const p2Interface = new ModelViewInterface(
  new Player("Computer", true),
  new GameBoardComponent("computer"),
);

p2Interface.loadBoard(false, true);
p2Interface.boardComponent.fade();

gameArea.appendChildren(p1Interface.boardComponent, p2Interface.boardComponent);

// PLACE SHIPS
let shipPlacementButtons = new ShipPlacementButtons(p1Interface);
utilityArea.appendChildren(shipPlacementButtons);

// START GAME
shipPlacementButtons.assignToStart(() => startGame());

function startGame() {
  p1Interface.loadBoard(false, false);

  if (p1Interface.model.computer) p2Interface.model.gameBoard.autoPlace();

  if (p2Interface.model.computer) p2Interface.model.gameBoard.autoPlace();

  p2Interface.boardComponent.unFade();
  p1Interface.boardComponent.fadeSoft();
  p2Interface.loadBoard(true, true);

  p2Interface.attackLoop(p1Interface, endGame);
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
