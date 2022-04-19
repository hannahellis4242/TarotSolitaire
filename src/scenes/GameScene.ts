import Phaser from "phaser";
import createOption from "../utils/createOption";

class GameScene extends Phaser.Scene {
  constructor(width: number, height: number) {
    super("GameScene");
  }
  preload() {}
  create() {
    const { width, height } = this.sys.game.canvas;
    this.cameras.main.setBackgroundColor("#32a852");
    this.add.existing(
      createOption(
        this,
        width / 2,
        height / 20,
        "Exit",
        { base: "#000", hover: "#4f0c6b" },
        () => this.scene.start("TitleScene")
      )
    );
  }
  update(time: number, delta: number) {}
}

export default GameScene;
