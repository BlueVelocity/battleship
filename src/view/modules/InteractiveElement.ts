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
}
