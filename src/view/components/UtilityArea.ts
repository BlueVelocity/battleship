import InteractiveElement from "../modules/InteractiveElement";

export default class UtilityArea extends InteractiveElement {
  elem: Element;

  constructor(children: Element[]) {
    super("div");

    this.elem.id = "util-area";
    this.appendClassList("flex flex-col items-center");

    children.forEach((element) => {
      this.elem.appendChild(element);
    });
  }
}
