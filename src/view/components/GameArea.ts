import InteractiveElement from "../modules/InteractiveElement";

export default class GameAreaComponent extends InteractiveElement {
  constructor() {
    super("div");

    this.elem.id = "game-area";
    this.appendClassList(
      "m-10 grid w-2/3 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] grid-rows-1 items-center gap-10 self-center",
    );
  }
}
