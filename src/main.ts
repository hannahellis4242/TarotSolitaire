/*import GameState from "./controler/GameState";
import SelectCommand from "./controler/SelectCommand";
import StartCommand from "./controler/StartCommand";
import Card from "./model/Card";
import { createDeck } from "./model/Deck";*/

import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import PreloadScene from "./scenes/PreloadScene";
import TitleScene from "./scenes/TitleScene";

const screenSize = {
  width: 830,
  height: window.screen.availHeight,
};

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Tarot Solitaire",
  type: Phaser.AUTO,
  scale: screenSize,
  scene: [
    new PreloadScene(),
    new TitleScene(),
    new GameScene(screenSize.width, screenSize.height),
  ],
};

const game = new Phaser.Game(gameConfig);
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
