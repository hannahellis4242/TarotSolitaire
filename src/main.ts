import { createDeck } from "./model/Deck";
import Layout from "./model/Layout";

const model = new Layout();
model.start(createDeck());
console.log(JSON.stringify(model, undefined, 4));
