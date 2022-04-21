import Phaser from "phaser";
import createOption from "../utils/createOption";

interface CardSize {
  width: number;
  height: number;
}

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

const calculateGridPositions = (cardSize: CardSize, spacing: number) => {
  //Have 9 slots horizontally and 2 vertically with spacing either side
  return new Array(2).fill(0).map((_, j) => {
    return new Array(9).fill(0).map((_, i) => {
      return {
        x: spacing + i * (cardSize.width + spacing),
        y: spacing + j * (cardSize.height + spacing),
      };
    });
  });
};

interface Slots {
  pack: Slot;
  discard: Slot;
  foundation: Slot[];
  tableu: Slot[];
}
const calculateSlots = (
  cardSize: CardSize,
  positions: { x: number; y: number }[][]
): Slots => {
  return {
    pack: { ...positions[0][0], ...cardSize },
    discard: { ...positions[0][1], ...cardSize },
    foundation: new Array(5).fill(0).map((_, index) => {
      return { ...positions[0][4 + index], ...cardSize };
    }),
    tableu: new Array(9).fill(0).map((_, index) => {
      return { ...positions[1][index], ...cardSize };
    }),
  };
};

class GameScene extends Phaser.Scene {
  cardSize: CardSize;
  spacing: number;
  slots: {
    pack: Slot;
    discard: Slot;
    foundation: Slot[];
    tableu: Slot[];
  };

  constructor(width: number, height: number) {
    super("GameScene");
    this.cardSize = { width: 70, height: 120 };
    this.spacing = 20;
    debugger;
    const positions = calculateGridPositions(this.cardSize, this.spacing);
    //console.log(positions);
    this.slots = calculateSlots(this.cardSize, positions);
    //console.log(this.slots);
  }
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
