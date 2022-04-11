import Deck from "../model/Deck";
import Layout from "../model/Layout";
import Model from "../model/model";
import Command from "./Command";

const start = (cards: Deck) => {
  const layout = new Layout();
  layout.discard = [];
  layout.foundationRow = Array(5)
    .fill(0)
    .map(() => new Array());
  layout.tableau = Array(9)
    .fill(0)
    .map(() => new Array());
  for (let i = 0; i < 9; ++i) {
    {
      const card = cards.shift();
      if (card) {
        card.faceUp = true;
        layout.tableau[i].push(card);
      }
    }
    for (let j = i + 1; j < 9; ++j) {
      const card = cards.shift();
      if (card) {
        layout.tableau[j].push(card);
      }
    }
  }
  layout.pack = cards;
  return layout;
};

export default class StartCommand implements Command {
  constructor(private cards: Deck) {}
  redo(_: Model): Model {
    const layout = start(this.cards);
    return { layout };
  }
  undo(_: Model): Model {
    return {};
  }
}
