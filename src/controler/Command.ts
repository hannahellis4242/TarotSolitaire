import Model from "../model/model";

export default interface Command {
  redo(model: Model): Model;
  undo(model: Model): Model;
}
