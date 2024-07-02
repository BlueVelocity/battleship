import InteractiveElement from "../modules/InteractiveElement";

export default class WinnerScreen extends InteractiveElement {
  static styles = {
    button:
      "text-lg border border-black py-0.5 px-1 m-0.5 rounded transition duration-250 linear active:scale-105",
    winnerScreen: "flex flex-col items-center",
  };

  constructor(winner: string, restartCallback: Function) {
    super("div");

    this.appendClassList(WinnerScreen.styles.winnerScreen);

    const winnerText = new InteractiveElement("p");
    winnerText.elem.textContent = winner + " is the winner!";

    const restartButton = new InteractiveElement("button");
    restartButton.appendClassList(WinnerScreen.styles.button);
    restartButton.elem.textContent = "RESTART";

    restartButton.elem.addEventListener("click", () => restartCallback());

    this.appendChildren(winnerText, restartButton);
  }
}
