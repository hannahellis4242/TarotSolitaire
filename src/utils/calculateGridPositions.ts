import { CardSize } from "./GameLayout";

const calculateGridPositions = (cardSize: CardSize, spacing: number) => {
  //Have 9 slots horizontally and 2 vertically with spacing either side
  return new Array(2).fill(0).map((_, j) => {
    return new Array(9).fill(0).map((_, i) => {
      return {
        x: spacing + i * (cardSize.width + spacing),
        y: spacing + j * (cardSize.height + spacing),
      };
    });
  });
};

export default calculateGridPositions;
