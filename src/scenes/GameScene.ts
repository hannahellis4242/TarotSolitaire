import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor(width: number, height: number) {
    super("GameScene");
  }
  preload() {}
  create() {
    const { width, height } = this.sys.game.canvas;
    this.cameras.main.setBackgroundColor("#32a852");
    const startButton = this.add
      .text(width / 2, height / 10, "Exit")
      .setAlign("center")
      .setColor("#000")
      .setFontSize(32)
      .setOrigin(0.5)
      .setInteractive();
    startButton.on("pointerover", () => {
      startButton.setColor("#4f0c6b");
    });
    startButton.on("pointerout", () => {
      startButton.setColor("#fff");
    });
    startButton.on("pointerdown", () => {
      this.scene.start("TitleScene");
    });
  }
  update(time: number, delta: number) {}
}

export default GameScene;
