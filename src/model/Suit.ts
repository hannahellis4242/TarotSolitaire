export type MajorArcana = "Major";
export type MinorArcana = "Cups" | "Wands" | "Swords" | "Penticles";
type Suit = MajorArcana | MinorArcana;
export type SuitType = "Active" | "Passive" | "Trump";
export const getSuitType = (x: Suit): SuitType => {
  switch (x) {
    case "Wands":
    case "Swords":
      return "Active";

    case "Cups":
    case "Penticles":
      return "Passive";

    case "Major":
      return "Trump";
  }
};
export default Suit;
