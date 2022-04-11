import { createDeck } from "./model/Deck";
import Layout from "./model/Layout";

console.log(JSON.stringify(new Layout(createDeck()), undefined, 4));
