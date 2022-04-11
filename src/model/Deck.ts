import Card from "./Card";
import Pip, { allMajorPips, allMinorPips } from "./Pip";
import { MinorArcana } from "./Suit";

type Deck = Card[];
export default Deck;

export const createMajor = (): Deck =>
  allMajorPips().map((pip: Pip) => new Card("Major", pip, false));

export const createMinor = (suit: MinorArcana): Deck =>
  allMinorPips().map((pip) => new Card(suit, pip, false));

export const createDeck = (): Deck =>
  createMajor()
    .concat(createMinor("Cups"))
    .concat(createMinor("Wands"))
    .concat(createMinor("Swords"))
    .concat(createMinor("Wands"));
