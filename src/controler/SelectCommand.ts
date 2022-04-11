import Card from "../model/Card";
import Model from "../model/model";
import Command from "./Command";

export default class SelectCommand implements Command {
  oldSelection?: Card;
  constructor(private selected: Card) {}
  redo(model: Model): Model {
    this.oldSelection = model.selected;
    return { layout: model.layout, selected: this.selected };
  }
  undo(model: Model): Model {
    return { layout: model.layout, selected: this.oldSelection };
  }
}
