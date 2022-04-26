import GameLayout from "../utils/GameLayout";
import GameSprites from "./GameSprites";

export default class GameZones {
  public foundation: Phaser.GameObjects.Zone[];
  public tableu: Phaser.GameObjects.Zone[];
  constructor() {
    this.foundation = [];
    this.tableu = [];
  }
  clear() {
    this.foundation = [];
    this.tableu = [];
  }
  build(scene: Phaser.Scene, cards: GameSprites, slots: GameLayout) {
    this.clear();
    this.foundation = slots.foundation.map(
      ({ x, y, width, height }) =>
        new Phaser.GameObjects.Zone(scene, x, y, width, height)
    );
    this.tableu = cards.tableu.map((cards, index) => {
      const lastCard = cards.at(-1);
      if (lastCard) {
        return new Phaser.GameObjects.Zone(
          scene,
          lastCard.x,
          lastCard.y,
          lastCard.width,
          lastCard.height
        );
      } else {
        const slot = slots.tableu.at(index);
        if (slot) {
          return new Phaser.GameObjects.Zone(
            scene,
            slot.x,
            slot.y,
            slot.width,
            slot.height
          );
        } else {
          console.log("GameZone error");
          return new Phaser.GameObjects.Zone(scene, -2, -2);
        }
      }
    });
    this.foundation.forEach((x) => scene.add.existing(x));
    this.tableu.forEach((x) => scene.add.existing(x));
  }
}
