import Deck from "./Deck";

export default class Layout {
  pack: Deck;
  discard: Deck;
  foundationRow: Deck[];
  tableau: Deck[];
  constructor(cards: Deck) {
    this.discard = [];
    this.foundationRow = Array(5).fill([]);
    this.tableau = Array(9).fill([]);
    for (let i = 0; i < 9; ++i) {
      for (let j = i; j < 9; ++j) {
        const card = cards.pop();
        if (card) {
          if (j === i) {
            card.faceUp = true;
          }
          this.tableau[j].push(card);
        }
      }
    }
    this.pack = cards;
  }
}
