import Phaser from "phaser";
import createOption from "../utils/createOption";

class TitleScene extends Phaser.Scene {
  constructor() {
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

    this.add.existing(
      createOption(
        this,
        width / 2,
        (3 * height) / 10,
        "Start",
        { base: "#fff", hover: "#4f0c6b" },
        () => this.scene.start("GameScene")
      )
    );
  }
}

export default TitleScene;
