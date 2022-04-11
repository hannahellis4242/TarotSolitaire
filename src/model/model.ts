import Card from "./Card";
import Layout from "./Layout";

export default interface Model {
  layout?: Layout;
  selected?: Card;
}
