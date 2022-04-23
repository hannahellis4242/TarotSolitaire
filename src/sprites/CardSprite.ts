import Card from "../model/Card";
import { Slot } from "../utils/GameLayout";

export default class CardSprite extends Phaser.GameObjects.Sprite {
  redraw: boolean;
  constructor(scene: Phaser.Scene, public slot: Slot, public card: Card) {
    super(scene, slot.x, slot.y, "back");
    this.setOrigin(0);
    scene.add.existing(this);
    this.redraw = true;
    this.setInteractive();
    this.scene.input.setDraggable(this, this.card.faceUp);
  }
  flipOver() {
    this.card.faceUp = !this.card.faceUp;
    this.redraw = true;
    this.scene.input.setDraggable(this, this.card.faceUp);
  }
  drawFaceUp() {
    this.setTexture("front").setScale(1 / 10);
  }
  drawFaceDown() {
    this.setTexture("back").setScale(1 / 10);
  }
  protected preUpdate(time: number, delta: number): void {
    if (this.redraw) {
      this.redraw = false;
      if (this.card.faceUp) {
        this.drawFaceUp();
      } else {
        this.drawFaceDown();
      }
    }
  }
}
