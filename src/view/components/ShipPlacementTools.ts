import InteractiveElement from "../modules/InteractiveElement";

export default class ShipPlacementTools extends InteractiveElement {
  elem: Element;
  shipButtons: InteractiveElement[];
  private static styles = {
    unselected:
      "border border-black py-0.5 px-1 m-0.5 rounded transition duration-250 linear active:scale-105",
    selected: "bg-orange-500",
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
      shipButton.elem.textContent = label[0];
      shipButton.elem.setAttribute("data-ship-length", label[1]);
      return shipButton;
    });

    this.addActivebuttonToggle(buttons);

    return buttons;
  };

  constructor() {
    super("div");

    this.elem.id = "ship-placement-tools";
    this.appendClassList("flex flex-col items-center");

    const placeShipText = new InteractiveElement("span");
    placeShipText.elem.textContent = "Place your ships!";
    placeShipText.appendClassList("mb-2");
    this.elem.appendChild(placeShipText.elem);

    this.shipButtons = ShipPlacementTools.createShipButtons([
      ["Destroyer - 2", "2"],
      ["Submarine - 3", "3"],
      ["Cruiser - 3", "3"],
      ["Battleship - 4", "4"],
      ["Carrier - 5", "5"],
    ]);

    this.shipButtons.forEach((element) => {
      this.elem.appendChild(element.elem);
    });
  }
}
