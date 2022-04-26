export interface CardSize {
  width: number;
  height: number;
}

export interface Slot {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const createSlot = (
  scene: Phaser.Scene,
  { x, y, width, height }: Slot
) =>
  new Phaser.GameObjects.Rectangle(
    scene,
    x,
    y,
    width,
    height,
    0xffffff,
    0.2
  ).setOrigin(0);

export const adjustSlot = (
  { x, y, width, height }: Slot,
  xOffset: number,
  yOffset: number
): Slot => {
  return { x: x + xOffset, y: y + yOffset, width, height };
};

export default class GameLayout {
  pack: Slot;
  discard: Slot;
  foundation: Slot[];
  tableu: Slot[];
  constructor(cardSize: CardSize, positions: { x: number; y: number }[][]) {
    this.pack = { ...positions[0][0], ...cardSize };
    this.discard = { ...positions[0][1], ...cardSize };
    this.foundation = new Array(5).fill(0).map((_, index) => {
      return { ...positions[0][4 + index], ...cardSize };
    });
    this.tableu = new Array(9).fill(0).map((_, index) => {
      return { ...positions[1][index], ...cardSize };
    });
  }
}
