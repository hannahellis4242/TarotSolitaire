import Command from "./Command";
import Layout from "../model/Layout";

export default class GameState {
  public model: Layout;
  redoComands: Command[];
  undoCommands: Command[];
  constructor() {
    this.model = new Layout();
    this.undoCommands = [];
    this.redoComands = [];
  }

  set(newModel: Layout) {
    this.undoCommands = [];
    this.redoComands = [];
    this.model = newModel;
  }

  add(command: Command) {
    this.undoCommands = [];
    this.redoComands.push(command);
    this.model = command.redo(this.model);
  }
  undo() {
    const lastCommand = this.redoComands.pop();
    if (lastCommand) {
      this.model = lastCommand.undo(this.model);
      this.undoCommands.push(lastCommand);
    }
  }
  redo() {
    const nextCommand = this.undoCommands.pop();
    if (nextCommand) {
      this.model = nextCommand.redo(this.model);
      this.redoComands.push(nextCommand);
    }
  }
}
