import InteractiveElement from "../modules/InteractiveElement";

export default class ShipPlacementTools extends InteractiveElement {
  elem: Element;
  shipButtons: InteractiveElement[];
  private static styles = {
    unselected:
      "text-sm border border-black py-0.5 px-1 m-0.5 rounded transition duration-250 linear active:scale-105",
    selected: "bg-orange-500",
    placed: "pointer-events-none",
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

  placed(button: InteractiveElement) {
    button.removeFromClassList(ShipPlacementTools.styles.selected);
    button.appendClassList(ShipPlacementTools.styles.placed);
  }

  constructor() {
    super("div");

    this.elem.id = "ship-placement-tools";
    this.appendClassList("flex flex-col items-center");

    const placeShipText = new InteractiveElement("span");
    placeShipText.elem.textContent = "Place your ships!";
    placeShipText.appendClassList("mb-1");
    this.elem.appendChild(placeShipText.elem);

    this.shipButtons = ShipPlacementTools.createShipButtons([
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
