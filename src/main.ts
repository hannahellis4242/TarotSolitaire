import GameState from "./controler/GameState";
import StartCommand from "./controler/StartCommand";
import { createDeck } from "./model/Deck";

const state = new GameState();
state.add(new StartCommand(createDeck()));
console.log(JSON.stringify(state.model, undefined, 4));
