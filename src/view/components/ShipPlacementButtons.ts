import InteractiveElement from "../modules/InteractiveElement";
import ModelViewInterface from "../modules/ModelViewInterface";

export default class ShipPlacementButtons extends InteractiveElement {
  static orientation: number = 1;
  private static maxShips: number = 5;
  elem: Element;
  shipButtons: InteractiveElement[];
  private shipCount: number = 0;
  private errorMessage: InteractiveElement = new InteractiveElement("p");
  private placeShipText = new InteractiveElement("span");
  private rotateButton = new InteractiveElement("button");
  private shipButtonArea = new InteractiveElement("div");
  private startButton = new InteractiveElement("button");

  static styles = {
    unselected:
      "text-sm border border-black py-0.5 px-1 m-0.5 rounded transition duration-250 linear active:scale-105",
    selected: "bg-orange-500",
    placed: "pointer-events-none bg-gray-500",
    buttonArea:
      "flex-1 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] grid-rows-1 place-content-center",
    startButton:
      "text-lg border border-black py-0.5 px-1 m-1 rounded transition duration-250 linear active:scale-105 bg-green-500",
  };

  private static addActiveButtonToggle = (elements: InteractiveElement[]) => {
    elements.forEach((element) => {
      element.elem.addEventListener("click", () => {
        elements.forEach((btn) =>
          btn.elem.classList.remove(this.styles.selected),
        );
        element.appendClassList(this.styles.selected);
      });
    });
  };

  private static toggleRotateButton = (element: InteractiveElement) => {
    element.elem.addEventListener("click", () => {
      if (
        element.elem.classList.contains(ShipPlacementButtons.styles.selected)
      ) {
        ShipPlacementButtons.orientation = 1;
        element.removeFromClassList(ShipPlacementButtons.styles.selected);
      } else {
        ShipPlacementButtons.orientation = 2;
        element.appendClassList(ShipPlacementButtons.styles.selected);
      }
    });
  };

  private static createShipButtons = (labels: string[][]) => {
    const buttons: InteractiveElement[] = labels.map((label: string[]) => {
      const shipButton = new InteractiveElement("button");
      shipButton.appendClassList(this.styles.unselected);
      shipButton.elem.textContent = label[0] + " - " + label[1];
      shipButton.elem.setAttribute("data-ship-length", label[1]);
      return shipButton;
    });

    this.addActiveButtonToggle(buttons);

    return buttons;
  };

  static getOrientation() {
    return this.orientation;
  }

  constructor(firstPlayer: ModelViewInterface) {
    super("div");

    this.elem.id = "ship-placement-tools";
    this.appendClassList("flex flex-col items-center");

    this.errorMessage.elem.id = "ship-placement-error";
    this.errorMessage.elem.textContent = "Error Message :^)";
    this.errorMessage.invisible();
    this.errorMessage.appendClassList("text-red-500");

    this.placeShipText.elem.textContent = "Place your ships!";
    this.placeShipText.appendClassList("mb-1");

    this.shipButtons = ShipPlacementButtons.createShipButtons([
      ["Destroyer", "2"],
      ["Submarine", "3"],
      ["Cruiser", "3"],
      ["Battleship", "4"],
      ["Carrier", "5"],
    ]);

    this.shipButtons.forEach((element) => {
      element.elem.addEventListener("click", () => {
        firstPlayer.placeShipReq(
          Number(
            this.getCurrentSelected().elem.getAttribute("data-ship-length"),
          ),
          () => this.placed(),
          (err: any) => this.displayError(err),
        );
      });

      this.shipButtonArea.appendChildren(element);
    });

    this.rotateButton.appendClassList(
      ShipPlacementButtons.styles.unselected + " mb-2",
    );
    this.rotateButton.elem.textContent = "ROTATE";
    ShipPlacementButtons.toggleRotateButton(this.rotateButton);

    this.shipButtonArea.appendClassList(ShipPlacementButtons.styles.buttonArea);

    this.startButton.appendClassList(ShipPlacementButtons.styles.startButton);
    this.startButton.elem.textContent = "START!";
    this.startButton.hide();

    this.appendChildren(
      this.errorMessage,
      this.placeShipText,
      this.rotateButton,
      this.shipButtonArea,
      this.startButton,
    );
  }

  getCurrentSelected() {
    const currentSelected = this.shipButtons.find((element) =>
      element.elem.classList.contains(ShipPlacementButtons.styles.selected),
    );
    return currentSelected;
  }

  placed() {
    const button = this.getCurrentSelected();

    button.removeFromClassList(ShipPlacementButtons.styles.selected);
    button.appendClassList(ShipPlacementButtons.styles.placed);
    button.fade();

    this.shipCount++;
    if (this.shipCount >= ShipPlacementButtons.maxShips) {
      while (this.elem.childElementCount > 1) {
        this.elem.removeChild(this.elem.firstElementChild);
      }

      this.startButton.show();
    }
  }

  displayError(placementError: any) {
    this.errorMessage.visible();
    this.errorMessage.elem.textContent = placementError.message;
    setTimeout(() => this.errorMessage.invisible(), 5000);
  }

  assignToStart(callback: Function) {
    this.startButton.elem.addEventListener("click", () => {
      this.elem.parentNode.removeChild(this.elem.parentNode.firstElementChild);
      callback();
    });
  }
}
