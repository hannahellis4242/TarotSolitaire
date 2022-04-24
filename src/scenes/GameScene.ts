import Phaser, { Game } from "phaser";
import Command from "../controler/Command";
import FlipPack from "../controler/FlipPack";
import GameState from "../controler/GameState";
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
    this.pack = model.pack.map(
      (card, index) =>
        new CardSprite(scene, adjustSlot(layout.pack, index / 10, 0), card)
    );
    //place discard
    this.discard = model.discard.map(
      (card, index) =>
        new CardSprite(scene, adjustSlot(layout.discard, index / 10, 0), card)
    );
    //place tableu
    this.tableu = model.tableau.map((deck, i) =>
      deck.map(
        (card, j) =>
          new CardSprite(scene, adjustSlot(layout.tableu[i], 0, j * 10), card)
      )
    );
    //place foundation
    this.foundation = model.foundationRow.map((deck, i) =>
      deck.map((card) => new CardSprite(scene, layout.foundation[i], card))
    );
  }
  clear() {
    this.pack.forEach((card) => card.destroy());
    this.discard.forEach((card) => card.destroy());
    this.tableu.forEach((deck) => deck.forEach((card) => card.destroy()));
    this.foundation.forEach((deck) => deck.forEach((card) => card.destroy()));
    this.pack = [];
    this.discard = [];
    this.tableu = [];
    this.foundation = [];
  }
}

class GameScene extends Phaser.Scene {
  cardSize: CardSize;
  spacing: number;
  gameLayout: GameLayout;
  deck: Deck;
  controller: GameState;
  sprites: GameSprites;
  packSlot?: Phaser.GameObjects.Rectangle;

  constructor(width: number, height: number) {
    super("GameScene");
    this.cardSize = { width: 70, height: 120 };
    this.spacing = 20;
    const positions = calculateGridPositions(this.cardSize, this.spacing);
    this.gameLayout = new GameLayout(this.cardSize, positions);
    this.deck = createDeck();
    this.controller = new GameState();
    this.controller.set(new StartCommand(this.deck).redo(new Layout()));
    this.sprites = new GameSprites();
  }
  create() {
    const { width, height } = this.sys.game.canvas;
    this.cameras.main.setBackgroundColor("#32a852");
    this.buildSlots();
    this.placeCards();
  }
  buildSlots() {
    this.packSlot = createSlot(this, this.gameLayout.pack);
    this.packSlot.setInteractive();
    this.add.existing(this.packSlot);
    this.add.existing(createSlot(this, this.gameLayout.discard));
    this.gameLayout.foundation.forEach((slot) => {
      this.add.existing(createSlot(this, slot));
    });
    this.gameLayout.tableu.forEach((slot) => {
      this.add.existing(createSlot(this, slot));
    });
  }
  placeCards() {
    this.removeEvents();
    this.sprites.build(this, this.controller.model, this.gameLayout);
    this.createEvents();
  }
  removeEvents() {
    const lastPackCard = this.sprites.pack.at(-1);
    if (lastPackCard) {
      lastPackCard.off("pointerdown");
    }
    if (this.packSlot) {
      this.packSlot.off("pointerdown");
    }
  }
  createEvents() {
    const lastPackCard = this.sprites.pack.at(-1);
    if (lastPackCard) {
      lastPackCard.on("pointerdown", () => {
        console.log("clicked");
        this.controller.add(new FlipPack());
        this.placeCards();
      });
    }
    if (this.packSlot) {
      this.packSlot.on("pointerdown", () => {
        console.log("clicked");
        this.controller.add(new FlipPack());
        this.placeCards();
      });
    }
  }
}

export default GameScene;
