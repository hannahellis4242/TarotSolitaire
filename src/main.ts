/*import GameState from "./controler/GameState";
import SelectCommand from "./controler/SelectCommand";
import StartCommand from "./controler/StartCommand";
import Card from "./model/Card";
import { createDeck } from "./model/Deck";*/

import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import TitleScene from "./scenes/TitleScene";

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Tarot Solitaire",
  type: Phaser.AUTO,
  scale: {
    width: 600,
    height: 400,
  },
  scene: [TitleScene, GameScene],
};

const game = new Phaser.Game(gameConfig);
console.log(game);
/*
const state = new GameState();
state.add(new StartCommand(createDeck()));
state.add(new SelectCommand(new Card("Cups", "Ace", false)));
console.log(JSON.stringify(state.model, undefined, 4));
state.add(new SelectCommand(new Card("Swords", "Ace", false)));
console.log(JSON.stringify(state.model, undefined, 4));
state.undo();
console.log(JSON.stringify(state.model, undefined, 4));
*/
