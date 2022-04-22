import { Slot } from "../utils/GameLayout";

export default class CardSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, slot: Slot, texture: string) {
    super(scene, slot.x, slot.y, texture);
    this.scene.add
      .rectangle(slot.x, slot.y, slot.width, slot.height, 0, 1)
      .setOrigin(0);
    const boarder = 1;
    this.scene.add
      .rectangle(
        slot.x + boarder,
        slot.y + boarder,
        slot.width - 2 * boarder,
        slot.height - 2 * boarder,
        0xffffff,
        1
      )
      .setOrigin(0);
  }
}
