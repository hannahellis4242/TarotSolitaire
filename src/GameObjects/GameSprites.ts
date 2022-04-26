import Layout from "../model/Layout";
import GameLayout, { adjustSlot } from "../utils/GameLayout";
import CardSprite from "./CardSprite";

export default class GameSprites {
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
