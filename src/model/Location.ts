export default class Location {
  constructor() {}
}

export class Pack extends Location {
  constructor() {
    super();
  }
}

export class Discard extends Location {
  constructor() {
    super();
  }
}

export class Foundation extends Location {
  constructor(public index: number) {
    super();
  }
}

export class Tableu extends Location {
  constructor(public index: number, public depth: number) {
    super();
  }
}
