import InteractiveElement from "../modules/InteractiveElement";

export default class HeaderComponent extends InteractiveElement {
  //<div id="header" class="grid min-h-12 flex-1 items-center bg-red-500">
  //  <span class="items-center text-center text-xl">BATTLESHIP</span>
  // </div>
  constructor(text: string) {
    super("div");

    this.elem.id = "header";
    this.appendClassList("grid min-h-12 flex-1 items-center bg-red-500");

    const span = new InteractiveElement("span");
    span.appendClassList("items-center text-center text-xl");
    span.elem.textContent = text;
    this.elem.appendChild(span.elem);
  }
}
