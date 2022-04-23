import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  preload() {
    this.load.svg("penticle", "assets/penticle.svg");
    this.load.svg("TwoSwords", "assets/TwoOfSwords.svg");
    this.load.svg("back", "assets/back.svg");
    this.load.svg("front", "assets/front.svg");
  }
  create() {
    this.scene.start("TitleScene");
  }
}

export default PreloadScene;
