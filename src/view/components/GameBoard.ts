import InteractiveElement from "../modules/InteractiveElement";

export default class GameBoardComponent extends InteractiveElement {
  name: string;

  constructor(name: string) {
    super("div");

    this.elem.id = name;
    this.appendClassList("flex aspect-square h-full flex-col bg-blue-500");
  }

  load(grid: any[][]) {
    grid.forEach((row, y) => {
      const domRow = new InteractiveElement("div");
      domRow.appendClassList("flex-auto flex");

      row.forEach((tile, x) => {
        const domTile = new InteractiveElement("div");
        domTile.appendClassList(
          "flex-auto border border-black bg-blue-500 hover:cursor-pointer transition duration-250 linear active:scale-110",
        );
        domRow.elem.appendChild(domTile.elem);
      });

      this.elem.appendChild(domRow.elem);
    });
  }

  reLoad(grid: any[][]) {
    this.elem.innerHTML = "";
    this.load(grid);
  }
}
