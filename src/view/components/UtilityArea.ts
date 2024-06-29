import InteractiveElement from "../modules/InteractiveElement";

export default class UtilityArea extends InteractiveElement {
  constructor() {
    super("div");

    this.elem.id = "util-area";
    this.appendClassList("flex flex-col items-center");
  }
}
