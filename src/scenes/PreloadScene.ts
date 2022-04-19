import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor(width: number, height: number) {
    super("PreloadScene");
  }
  preload() {
    this.load.svg("penticle", "assets/penticle.svg");
  }
  create() {
    this.scene.start("TitleScene");
  }
}

export default PreloadScene;
