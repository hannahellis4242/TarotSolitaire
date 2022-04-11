import Deck from "./Deck";

export default class Layout {
  pack: Deck;
  discard: Deck;
  foundationRow: Deck[];
  tableau: Deck[];
  constructor() {
    this.discard = [];
    this.foundationRow = Array(5)
      .fill(0)
      .map(() => new Array());
    this.tableau = Array(9)
      .fill(0)
      .map(() => new Array());
    this.pack = [];
  }
  start(cards: Deck) {
    this.discard = [];
    this.foundationRow = Array(5)
      .fill(0)
      .map(() => new Array());
    this.tableau = Array(9)
      .fill(0)
      .map(() => new Array());
    for (let i = 0; i < 9; ++i) {
      {
        const card = cards.shift();
        if (card) {
          card.faceUp = true;
          this.tableau[i].push(card);
        }
      }
      for (let j = i + 1; j < 9; ++j) {
        const card = cards.shift();
        if (card) {
          this.tableau[j].push(card);
        }
      }
    }
    this.pack = cards;
  }
}
