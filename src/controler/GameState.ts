import Command from "./Command";
import Layout from "../model/Layout";

export default class GameState {
  redoComands: Command[];
  undoCommands: Command[];
  constructor(private model: Layout) {
    this.undoCommands = [];
    this.redoComands = [];
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
