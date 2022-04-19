import Phaser from "phaser";
import createOption from "../utils/createOption";

const cardSize = { width: 70, height: 120 };
interface Slot {
  x: number;
  y: number;
  width: number;
  height: number;
}

const createSlot = (scene: Phaser.Scene, { x, y, width, height }: Slot) =>
  new Phaser.GameObjects.Rectangle(
    scene,
    x,
    y,
    width,
    height,
    0xffffff,
    0.2
  ).setOrigin(0);

class GameScene extends Phaser.Scene {
  slots: {
    pack: Slot;
    discard: Slot;
    foundation: Slot[];
    tableu: Slot[];
  };

  constructor(width: number, height: number) {
    super("GameScene");
    const spacing = 20;
    this.slots = {
      pack: { x: spacing, y: spacing, ...cardSize },
      discard: {
        x: spacing + cardSize.width + spacing,
        y: spacing,
        ...cardSize,
      },
      foundation: new Array(5).fill(0).map((_, index) => {
        return {
          x: width - (cardSize.width + spacing) * (index + 1),
          y: spacing,
          ...cardSize,
        };
      }),
      tableu: new Array(9).fill(0).map((_, index) => {
        return {
          x: spacing + (cardSize.width + spacing) * index,
          y: cardSize.height + 2 * spacing,
          ...cardSize,
        };
      }),
    };
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

    this.add.existing(createSlot(this, this.slots.pack));
    this.add.existing(createSlot(this, this.slots.discard));
    this.slots.foundation.forEach((slot) => {
      this.add.existing(createSlot(this, slot));
    });
    this.slots.tableu.forEach((slot) => {
      console.log(slot);
      this.add.existing(createSlot(this, slot));
    });
  }
  update(time: number, delta: number) {}
}

export default GameScene;
