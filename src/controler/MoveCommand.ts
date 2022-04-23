import Location from "../model/Location";
import Layout from "../model/Layout";
import Command from "./Command";
import Card from "../model/Card";

const pop = (layout: Layout, loc: Location) => {
  switch (loc.position) {
    case "discard": {
      const next = new Layout();
      next.foundationRow = layout.foundationRow;
      next.pack = layout.pack;
      next.tableau = layout.tableau;
      next.discard = layout.discard.slice(0, -1);
      return { next, card: layout.discard.at(-1) };
    }
    case "pack": {
      const next = new Layout();
      next.foundationRow = layout.foundationRow;
      next.tableau = layout.tableau;
      next.discard = layout.discard;
      next.pack = layout.pack.slice(0, -1);
      return { next, card: layout.pack.at(-1) };
    }
    case "foundation": {
      const next = new Layout();
      next.discard = layout.discard;
      next.pack = layout.pack;
      next.tableau = layout.tableau;
      next.foundationRow = layout.foundationRow.map((x, index) =>
        index === loc.index ? x.slice(0, -1) : x
      );
      const foundation = layout.foundationRow.at(loc.index);
      const card = foundation ? foundation.at(-1) : undefined;
      return { next, card };
    }
    case "tableu": {
      const next = new Layout();
      next.discard = layout.discard;
      next.pack = layout.pack;
      next.foundationRow = layout.foundationRow;
      next.tableau = layout.tableau.map((x, index) =>
        index === loc.index ? x.slice(0, -1) : x
      );
      const tableau = layout.tableau.at(loc.index);
      const card = tableau ? tableau.at(-1) : undefined;
      return { next, card };
    }
  }
};

const push = (layout: Layout, loc: Location, value: Card) => {
  switch (loc.position) {
    case "discard": {
      const next = new Layout();
      next.foundationRow = layout.foundationRow;
      next.pack = layout.pack;
      next.tableau = layout.tableau;
      next.discard = [...layout.discard].concat(value);
      return next;
    }
    case "pack": {
      const next = new Layout();
      next.foundationRow = layout.foundationRow;
      next.discard = layout.discard;
      next.tableau = layout.tableau;
      next.pack = [...layout.pack].concat(value);
      return next;
    }
    case "foundation": {
      const next = new Layout();
      next.discard = layout.discard;
      next.tableau = layout.tableau;
      next.pack = layout.pack;
      next.foundationRow = layout.foundationRow.map((x, index) =>
        index === loc.index ? [...x].concat(value) : x
      );
      return next;
    }
    case "tableu": {
      const next = new Layout();
      next.discard = layout.discard;
      next.foundationRow = layout.foundationRow;
      next.pack = layout.pack;
      next.tableau = layout.tableau.map((x, index) =>
        index === loc.index ? [...x].concat(value) : x
      );
      return next;
    }
  }
};

export default class MoveCommand implements Command {
  constructor(private target: Location, private source: Location) {}
  redo(prev: Layout): Layout {
    const { next, card } = pop(prev, this.source);
    return card ? push(next, this.target, card) : next;
  }
  undo(prev: Layout): Layout {
    const { next, card } = pop(prev, this.target);
    return card ? push(next, this.source, card) : next;
  }
}
