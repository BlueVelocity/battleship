import GameBoardComponent from "../components/GameBoard";
import Player from "../../model/modules/Player";

export default class ModelViewInterface {
  model: Player;
  boardComponent: GameBoardComponent;

  constructor(model: Player, boardComponent: GameBoardComponent) {
    this.model = model;
    this.boardComponent = boardComponent;
  }

  placeShipReq = (length: number, orientation: number) => {
    this.boardComponent.domTiles.forEach((elem: Element) => {
      const shipPlacey = (event: Event) => {
        const tileCoords = GameBoardComponent.getTileCoordinate(elem);

        try {
          this.model.gameBoard.place(
            length,
            tileCoords[0],
            tileCoords[1],
            orientation,
          );
          this.boardComponent.load(this.model.gameBoard.board);
        } catch (error) {
          alert(error);
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
}
