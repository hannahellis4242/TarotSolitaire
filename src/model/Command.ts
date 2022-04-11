import Model from "./model";

export default interface Command {
  redo(model: Model): Model;
  undo(model: Model): Model;
}
