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

  appendChildren(...args: InteractiveElement[]) {
    args.forEach((element) => this.elem.appendChild(element.elem));
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
    if (!this.elem.classList.contains("hidden")) this.appendClassList("hidden");
  }

  show() {
    this.removeFromClassList("hidden");
  }

  invisible() {
    if (!this.elem.classList.contains("opacity-0"))
      this.appendClassList("opacity-0");
  }

  visible() {
    this.removeFromClassList("opacity-0");
  }

  fade() {
    if (!this.elem.classList.contains("opacity-30"))
      this.appendClassList("opacity-30");
  }

  unFade() {
    this.removeFromClassList("opacity-30");
  }

  fadeSoft() {
    if (!this.elem.classList.contains("opacity-60"))
      this.appendClassList("opacity-60");
  }

  unFadeSoft() {
    this.removeFromClassList("opacity-60");
  }

  clearChildren() {
    while (this.elem.lastElementChild) {
      this.elem.removeChild(this.elem.lastElementChild);
    }
  }
}
