import GameState from "./controler/GameState";
import SelectCommand from "./controler/SelectCommand";
import StartCommand from "./controler/StartCommand";
import Card from "./model/Card";
import { createDeck } from "./model/Deck";

const state = new GameState();
state.add(new StartCommand(createDeck()));
state.add(new SelectCommand(new Card("Cups", "Ace", false)));
console.log(JSON.stringify(state.model, undefined, 4));
state.add(new SelectCommand(new Card("Swords", "Ace", false)));
console.log(JSON.stringify(state.model, undefined, 4));
state.undo();
console.log(JSON.stringify(state.model, undefined, 4));
