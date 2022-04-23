import Layout from "../model/Layout";

export default interface Command {
  redo(model: Layout): Layout;
  undo(model: Layout): Layout;
}
