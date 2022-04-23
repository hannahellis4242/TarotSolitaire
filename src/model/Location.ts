type Position = "pack" | "discard" | "foundation" | "tableu";
export default class Location {
  constructor(public position: Position, public index: number = 0) {}
}
