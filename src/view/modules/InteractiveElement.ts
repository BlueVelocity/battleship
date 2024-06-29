export default class InteractiveElement {
  elem: Element;

  constructor(elem: any) {
    if (typeof elem === "string") {
      this.elem = document.createElement(elem);
    } else if (elem.nodeName) {
      this.elem = elem;
    } else {
      throw new Error("InputError: Argument must be string or Element");
    }
  }

  appendClassList(classList: string) {
    const classes = classList.split(" ");

    classes.forEach((cssClass) => {
      this.elem.classList.add(cssClass);
    });
  }

  removeFromClassList(classList: string) {
    const classes = classList.split(" ");

    classes.forEach((cssClass) => {
      this.elem.classList.remove(cssClass);
    });
  }

  replaceClassList(newList: string) {
    const currentList = this.elem.classList;

    currentList.forEach((curClass) => {
      this.elem.classList.remove(curClass);
    });

    this.appendClassList(newList);
  }

  hide() {
    this.appendClassList("hidden");
  }

  show() {
    this.removeFromClassList("hidden");
  }

  invisible() {
    this.appendClassList("opacity-0");
  }

  visible() {
    this.removeFromClassList("opacity-0");
  }

  fade() {
    this.appendClassList("opacity-30");
  }

  unFade() {
    this.removeFromClassList("opacity-30");
  }

  clearChildren() {
    while (this.elem.lastElementChild) {
      this.elem.removeChild(this.elem.lastElementChild);
    }
  }
}
