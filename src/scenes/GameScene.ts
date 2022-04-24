import Phaser, { Game } from "phaser";
import Command from "../controler/Command";
import StartCommand from "../controler/StartCommand";
import Card from "../model/Card";
import Deck, { createDeck } from "../model/Deck";
import Layout from "../model/Layout";
import CardSprite from "../sprites/CardSprite";
import calculateGridPositions from "../utils/calculateGridPositions";
import createOption from "../utils/createOption";
import GameLayout, { adjustSlot, CardSize, Slot } from "../utils/GameLayout";

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

class GameSprites {
  public pack: CardSprite[];
  public discard: CardSprite[];
  public tableu: CardSprite[][];
  public foundation: CardSprite[][];
  constructor() {
    this.pack = [];
    this.discard = [];
    this.tableu = [];
    this.foundation = [];
  }
  build(scene: Phaser.Scene, model: Layout, layout: GameLayout) {
    this.clear();
    //place pack
    this.pack.concat(
      model.pack.map(
        (card, index) =>
          new CardSprite(scene, adjustSlot(layout.pack, index / 10, 0), card)
      )
    );
    //place discard
    this.discard.concat(
      model.discard.map(
        (card, index) =>
          new CardSprite(scene, adjustSlot(layout.discard, index / 10, 0), card)
      )
    );
    //place tableu
    this.tableu.concat(
      model.tableau.map((deck, i) =>
        deck.map(
          (card, j) =>
            new CardSprite(scene, adjustSlot(layout.tableu[i], 0, j * 10), card)
        )
      )
    );
    //place foundation
    this.foundation.concat(
      model.foundationRow.map((deck, i) =>
        deck.map((card) => new CardSprite(scene, layout.foundation[i], card))
      )
    );
  }
  clear() {
    this.pack.forEach((card) => card.destroy());
    this.discard.forEach((card) => card.destroy());
    this.tableu.forEach((deck) => deck.forEach((card) => card.destroy()));
    this.foundation.forEach((deck) => deck.forEach((card) => card.destroy()));
  }
}

class GameScene extends Phaser.Scene {
  cardSize: CardSize;
  spacing: number;
  gameLayout: GameLayout;
  deck: Deck;
  model: Layout;
  commands: Command[];
  sprites: GameSprites;

  constructor(width: number, height: number) {
    super("GameScene");
    this.cardSize = { width: 70, height: 120 };
    this.spacing = 20;
    const positions = calculateGridPositions(this.cardSize, this.spacing);
    this.gameLayout = new GameLayout(this.cardSize, positions);
    this.deck = createDeck();
    this.model = new StartCommand(this.deck).redo(new Layout());
    this.commands = [];
    this.sprites = new GameSprites();
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
    this.placeCards();
  }
  placeCards() {
    this.sprites.build(this, this.model, this.gameLayout);
  }
}

export default GameScene;
