import GameBoardComponent from "../components/GameBoard";
import Player from "../../model/modules/Player";
import ShipPlacementButtons from "../components/ShipPlacementButtons";

export default class ModelViewInterface {
  model: Player;
  boardComponent: GameBoardComponent;
  previousSelections: number[][] = [];

  constructor(name: string, isComputer: boolean) {
    this.model = new Player(name, isComputer);
    this.boardComponent = new GameBoardComponent(name);
  }

  reset(selectable: boolean, shipsHidden: boolean) {
    this.model = new Player(this.model.name, this.model.computer);
    this.boardComponent = new GameBoardComponent(this.boardComponent.name);
    this.loadBoard(selectable, shipsHidden);
  }

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

  attackLoop(opposingInterface: ModelViewInterface, endGameCallback: Function) {
    if (opposingInterface.model.computer === false) {
      this.boardComponent.domTiles.forEach((element) => {
        if (
          element.classList.value === GameBoardComponent.styles.tileEmptySelect
        ) {
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

            if (this.model.gameBoard.allSunk()) {
              endGameCallback(opposingInterface);
            } else if (opposingInterface.model.gameBoard.allSunk()) {
              endGameCallback(this);
            } else {
              opposingInterface.attackLoop(this, endGameCallback);
            }
          });
        }
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

        if (this.model.gameBoard.allSunk()) {
          endGameCallback(opposingInterface);
        } else if (opposingInterface.model.gameBoard.allSunk()) {
          endGameCallback(this);
        } else {
          opposingInterface.attackLoop(this, endGameCallback);
        }
      }, 2000);
    }
  }
}
