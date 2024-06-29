import InteractiveElement from "../modules/InteractiveElement";

export default class ShipPlacementButtons extends InteractiveElement {
  elem: Element;
  shipButtons: InteractiveElement[];
  errorMessage: InteractiveElement;

  private static styles = {
    unselected:
      "text-sm border border-black py-0.5 px-1 m-0.5 rounded transition duration-250 linear active:scale-105",
    selected: "bg-orange-500",
    placed: "pointer-events-none bg-gray-500",
  };

  private static addActivebuttonToggle = (elements: InteractiveElement[]) => {
    elements.forEach((element) => {
      element.elem.addEventListener("click", () => {
        elements.forEach((btn) =>
          btn.elem.classList.remove(this.styles.selected),
        );
        element.appendClassList(this.styles.selected);
      });
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

    this.addActivebuttonToggle(buttons);

    return buttons;
  };

  placed() {
    const button = this.getCurrentSelected();

    button.removeFromClassList(ShipPlacementButtons.styles.selected);
    button.appendClassList(ShipPlacementButtons.styles.placed);
    button.fade();
  }

  getCurrentSelected() {
    const currentSelected = this.shipButtons.find((element) =>
      element.elem.classList.contains(ShipPlacementButtons.styles.selected),
    );
    return currentSelected;
  }

  displayError(placementError: any) {
    this.errorMessage.visible();
    this.errorMessage.elem.textContent = placementError.message;
    setTimeout(() => this.errorMessage.invisible.call(this.errorMessage), 5000);
  }

  constructor() {
    super("div");

    this.elem.id = "ship-placement-tools";
    this.appendClassList("flex flex-col items-center");

    this.errorMessage = new InteractiveElement("p");
    this.errorMessage.elem.id = "ship-placement-error";
    this.errorMessage.elem.textContent = "Error Message :^)";
    this.errorMessage.invisible();
    this.errorMessage.appendClassList("text-red-500");
    this.elem.appendChild(this.errorMessage.elem);

    const placeShipText = new InteractiveElement("span");
    placeShipText.elem.textContent = "Place your ships!";
    placeShipText.appendClassList("mb-1");
    this.elem.appendChild(placeShipText.elem);

    this.shipButtons = ShipPlacementButtons.createShipButtons([
      ["Destroyer", "2"],
      ["Submarine", "3"],
      ["Cruiser", "3"],
      ["Battleship", "4"],
      ["Carrier", "5"],
    ]);

    this.shipButtons.forEach((element) => {
      this.elem.appendChild(element.elem);
    });
  }
}
