import Phaser from "phaser";

class TitleScene extends Phaser.Scene {
  constructor(width: number, height: number) {
    super("TitleScene");
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    this.add
      .text(width / 2, height / 10, "Tarot\nSolitaire")
      .setAlign("center")
      .setFontSize(32)
      .setFontStyle("bold")
      .setOrigin(0.5, 0.5);
    this.add
      .image(width / 10, height / 10, "logo")
      .setScale(0.2, 0.2)
      .setOrigin(0.5, 0.5);

    const startButton = this.add
      .text(width / 2, (3 * height) / 10, "Start")
      .setFontSize(20)
      .setAlign("center")
      .setOrigin(0.5)
      .setInteractive();
    startButton.on("pointerover", () => {
      startButton.setColor("#4f0c6b");
    });
    startButton.on("pointerout", () => {
      startButton.setColor("#fff");
    });
    startButton.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
  update(time: number, delta: number) {}
}

export default TitleScene;
