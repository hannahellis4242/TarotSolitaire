import Pip from "./Pip";
import Suit from "./Suit";

export default class Card {
  constructor(public suit: Suit, public pip: Pip, public faceUp: boolean) {}
}
