import Phaser, { Game } from "phaser";
import FlipPack from "../controler/FlipPack";
import GameState from "../controler/GameState";
import StartCommand from "../controler/StartCommand";
import Deck, { createDeck } from "../model/Deck";
import Layout from "../model/Layout";
import calculateGridPositions from "../utils/calculateGridPositions";
import GameLayout, { CardSize, createSlot } from "../utils/GameLayout";
import GameSprites from "../GameObjects/GameSprites";
import GameZones from "../GameObjects/GameZones";

class GameScene extends Phaser.Scene {
  cardSize: CardSize;
  spacing: number;
  gameLayout: GameLayout;
  gameZones: GameZones;
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
    this.gameZones = new GameZones();
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
    this.gameZones.build(this, this.sprites, this.gameLayout);
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
    const lastDiscardCard = this.sprites.discard.at(-1);
    if (lastDiscardCard) {
      lastDiscardCard.off("dragstart");
      lastDiscardCard.off("drag");
      lastDiscardCard.off("dragend");
      lastDiscardCard.off("drop");
    }
  }
  createEvents() {
    const lastPackCard = this.sprites.pack.at(-1);
    if (lastPackCard) {
      lastPackCard.on("pointerdown", () => {
        this.controller.add(new FlipPack());
        this.placeCards();
      });
    }
    if (this.packSlot) {
      this.packSlot.on("pointerdown", () => {
        this.controller.add(new FlipPack());
        this.placeCards();
      });
    }
    const lastDiscardCard = this.sprites.discard.at(-1);
    if (lastDiscardCard) {
      lastDiscardCard.on("dragstart", () => lastDiscardCard.setDepth(1));
      lastDiscardCard.on(
        "drag",
        (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
          lastDiscardCard.setX(dragX);
          lastDiscardCard.setY(dragY);
        }
      );
      lastDiscardCard.on("dragend", () => lastDiscardCard.setDepth(0));
      lastDiscardCard.on("drop", () => {
        console.log("dropping");
      });
    }
  }
}

export default GameScene;
