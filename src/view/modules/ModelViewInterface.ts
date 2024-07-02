import GameBoardComponent from "../components/GameBoard";
import Player from "../../model/modules/Player";
import ShipPlacementButtons from "../components/ShipPlacementButtons";

export default class ModelViewInterface {
  model: Player;
  boardComponent: GameBoardComponent;
  previousSelections: number[][] = [];

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
        const [x, y] = GameBoardComponent.getTileCoordinate(elem);

        const orientation = ShipPlacementButtons.getOrientation();

        try {
          this.model.gameBoard.place(length, x, y, orientation);
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

  underAttack(opposingInterface: ModelViewInterface) {
    if (opposingInterface.model.computer === false) {
      this.boardComponent.domTiles.forEach((element) => {
        element.addEventListener("click", () => {
          try {
            const [x, y] = element
              .getAttribute("data-coord")
              .split(",")
              .map((num) => Number(num));

            this.model.gameBoard.receiveAttack(x, y);
            this.loadBoard(true, true);
          } catch (err) {
            console.error(err);
          }

          opposingInterface.underAttack(this);
        });
      });
    } else {
      const [x, y] = opposingInterface.model.autoAttackSelection();

      this.boardComponent.unFadeSoft();
      opposingInterface.boardComponent.fadeSoft();

      setTimeout(() => {
        this.model.gameBoard.receiveAttack(x, y);
        this.loadBoard(false, false);
      }, 1000);

      setTimeout(() => {
        this.boardComponent.fadeSoft();
        opposingInterface.boardComponent.unFadeSoft();
        opposingInterface.underAttack(this);
      }, 2000);
    }
  }
}
