import Phaser from "phaser";
import Command from "../controler/Command";
import StartCommand from "../controler/StartCommand";
import Card from "../model/Card";
import Deck, { createDeck } from "../model/Deck";
import Layout from "../model/Layout";
import CardSprite from "../sprites/CardSprite";
import calculateGridPositions from "../utils/calculateGridPositions";
import createOption from "../utils/createOption";
import GameLayout, { CardSize, Slot } from "../utils/GameLayout";

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
  cardSize: CardSize;
  spacing: number;
  gameLayout: GameLayout;
  deck: Deck;
  model: Layout;
  commands: Command[];

  constructor(width: number, height: number) {
    super("GameScene");
    this.cardSize = { width: 70, height: 120 };
    this.spacing = 20;
    const positions = calculateGridPositions(this.cardSize, this.spacing);
    this.gameLayout = new GameLayout(this.cardSize, positions);
    this.deck = createDeck();
    this.model = new StartCommand(this.deck).redo(new Layout());
    this.commands = [];
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

    this.add.existing(createSlot(this, this.gameLayout.pack));
    this.add.existing(createSlot(this, this.gameLayout.discard));
    this.gameLayout.foundation.forEach((slot) => {
      this.add.existing(createSlot(this, slot));
    });
    this.gameLayout.tableu.forEach((slot) => {
      this.add.existing(createSlot(this, slot));
    });
    const card = new CardSprite(
      this,
      this.gameLayout.pack,
      new Card("Major", "0", true)
    );
  }
}

export default GameScene;
