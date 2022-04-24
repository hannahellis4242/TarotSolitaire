import Location from "../model/Location";
import Layout from "../model/Layout";
import Command from "./Command";
import Card from "../model/Card";

export default class FlipPack implements Command {
  lastState?: Layout;
  constructor() {}
  redo(prev: Layout): Layout {
    this.lastState = prev;
    if (prev.pack.length !== 0) {
      //we just need to move the card and flip it
      const next = new Layout();
      next.pack = prev.pack;
      const nextCard = next.pack.pop();
      if (nextCard) {
        next.discard = prev.discard.concat(
          new Card(nextCard.suit, nextCard.pip, !nextCard.faceUp)
        );
      }
      next.foundationRow = prev.foundationRow;
      next.tableau = prev.tableau;
      return next;
    } else {
      //we've exhusted the pack, flip over the discard and put it back
      const next = new Layout();
      next.pack = [];
      next.discard = prev.pack.map(
        ({ suit, pip, faceUp }) => new Card(suit, pip, !faceUp)
      );
      next.foundationRow = prev.foundationRow;
      next.tableau = prev.tableau;
      return next;
    }
  }
  undo(prev: Layout): Layout {
    if (this.lastState) {
      return this.lastState;
    } else {
      console.log("Shouldn't get here");
      return new Layout();
    }
  }
}
