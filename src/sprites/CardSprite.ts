import Card from "../model/Card";
import { Slot } from "../utils/GameLayout";

export default class CardSprite extends Phaser.Physics.Arcade.Sprite {
  redraw: boolean;
  constructor(
    scene: Phaser.Scene,
    public slot: Slot,
    texture: string,
    public card: Card
  ) {
    super(scene, slot.x, slot.y, texture);
    this.redraw = true;
  }
  flipOver() {
    this.card.faceUp = !this.card.faceUp;
    this.redraw = true;
  }
  drawFaceUp() {
    this.scene.add
      .rectangle(
        this.slot.x,
        this.slot.y,
        this.slot.width,
        this.slot.height,
        0,
        1
      )
      .setOrigin(0);
    const boarder = 1;
    this.scene.add
      .rectangle(
        this.slot.x + boarder,
        this.slot.y + boarder,
        this.slot.width - 2 * boarder,
        this.slot.height - 2 * boarder,
        0xffffff,
        1
      )
      .setOrigin(0);
  }
  drawFaceDown() {
    this.scene.add
      .rectangle(
        this.slot.x,
        this.slot.y,
        this.slot.width,
        this.slot.height,
        0,
        1
      )
      .setOrigin(0);
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
