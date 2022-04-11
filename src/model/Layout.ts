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
}
