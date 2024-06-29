import "./style.css";
import HeaderComponent from "./view/components/Header";
import GameAreaComponent from "./view/components/GameArea";
import GameBoardComponent from "./view/components/GameBoard";
import UtilityArea from "./view/components/UtilityArea";
import ShipPlacementButtons from "./view/components/ShipPlacementButtons";

import ModelViewInterface from "./view/modules/ModelViewInterface";
import Player from "./model/modules/Player";

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
const p1Model = new Player(false);
const p1Board = new GameBoardComponent("player");
const p1Interface = new ModelViewInterface(p1Model, p1Board);

gameArea.elem.appendChild(p1Board.elem);
p1Interface.loadBoard(true);

// Instantiate player 2, their board, and establish model-view connection
const p2Model = new Player(true);
const p2Board = new GameBoardComponent("computer");
const p2Interface = new ModelViewInterface(p2Model, p2Board);

gameArea.elem.appendChild(p2Board.elem);
p2Interface.loadBoard(false, true);
p2Interface.boardComponent.fade();

// PLACE SHIPS
const shipPlacementButtons = new ShipPlacementButtons();
utilityArea.elem.appendChild(shipPlacementButtons.elem);

shipPlacementButtons.shipButtons.forEach((element) => {
  element.elem.addEventListener("click", () => {
    p1Interface.placeShipReq(
      Number(
        shipPlacementButtons
          .getCurrentSelected()
          .elem.getAttribute("data-ship-length"),
      ),
      1,
      () => shipPlacementButtons.placed.call(shipPlacementButtons),
      (err: any) =>
        shipPlacementButtons.displayError.call(shipPlacementButtons, err),
    );
  });
});
// do {

// } while() {

// }
