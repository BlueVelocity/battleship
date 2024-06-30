import GameBoardComponent from "../components/GameBoard";
import Player from "../../model/modules/Player";
import ShipPlacementButtons from "../components/ShipPlacementButtons";

export default class ModelViewInterface {
  model: Player;
  boardComponent: GameBoardComponent;

  constructor(model: Player, boardComponent: GameBoardComponent) {
    this.model = model;
    this.boardComponent = boardComponent;
  }

  placeShipReq = (
    length: number,
    callback: Function,
    errorCallback: Function,
  ) => {
    this.boardComponent.load(this.model.gameBoard.board, false, true);

    this.boardComponent.domTiles.forEach((elem: Element) => {
      const shipPlacey = () => {
        const tileCoords = GameBoardComponent.getTileCoordinate(elem);

        const orientation = ShipPlacementButtons.getOrientation();

        try {
          this.model.gameBoard.place(
            length,
            tileCoords[0],
            tileCoords[1],
            orientation,
          );
          this.boardComponent.load(this.model.gameBoard.board, false, true);

          callback();
        } catch (error) {
          elem.removeEventListener("click", shipPlacey, false);
          errorCallback(error);
        }
      };

      elem.addEventListener("click", shipPlacey);
    });
  };

  loadBoard(selectable: boolean = false, shipsHidden: boolean = false) {
    this.boardComponent.load(
      this.model.gameBoard.board,
      shipsHidden,
      selectable,
    );
  }

  assignTileCallback(callback: Function) {
    this.boardComponent.domTiles.forEach((element) =>
      element.addEventListener("click", () => callback()),
    );
  }

  underAttack() {
    this.boardComponent.domTiles.forEach((element) => {
      element.addEventListener("click", () => {
        try {
          const [x, y] = element
            .getAttribute("data-coord")
            .split(",")
            .map((num) => Number(num));
          this.model.gameBoard.receiveAttack(x, y);
          this.loadBoard(true, true);
          this.underAttack();
        } catch (err) {
          console.error(err);
        }
      });
    });
  }
}
