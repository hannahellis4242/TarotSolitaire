import Phaser from "phaser";

class TitleScene extends Phaser.Scene {
  constructor(width: number, height: number) {
    super("TitleScene");
  }
  preload() {
    this.load.svg("logo", "assets/penticle.svg");
  }
  create() {
    const { width, height } = this.sys.game.canvas;
    const text = this.add
      .text(width / 2, height / 10, "Tarot\nSolitaire")
      .setAlign("center")
      .setFontStyle("bold")
      .setOrigin(0.5, 0.5);
    let y = 0;
    this.add
      .image(width / 10, height / 10, "logo")
      .setScale(0.2, 0.2)
      .setOrigin(0.5, 0.5);
  }
  update(time: number, delta: number) {}
}

export default TitleScene;
