import Phaser from "phaser";
import { createDeck } from "../model/Deck";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  preload() {
    createDeck().forEach((card) => {
      this.load.svg(
        `card_${card.suit}_${card.pip}`,
        `assets/card_${card.suit}_${card.pip}.svg`
      );
    });

    this.load.svg("back", "assets/back.svg");
  }
  create() {
    this.scene.start("TitleScene");
  }
}

export default PreloadScene;
