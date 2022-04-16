import Phaser from "phaser";

class TitleScene extends Phaser.Scene {
  size: { width: number; height: number };
  constructor() {
    super("TitleScene");
    this.size = this.game.canvas;
  }
  preload() {
    this.load.svg("logo", "assets/penticle.svg");
  }
  create() {
    debugger;
    this.size = this.game.canvas;
    this.add
      .text(this.size.width / 2, this.size.height / 2, "Tarot Solitaire")
      .setColor("white")
      .setOrigin(0.5, 0.5);
    this.add.image(100, 100, "logo");
  }
  update(time: number, delta: number) {}
}

export default TitleScene;
