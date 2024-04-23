import { playerInventory } from "./Inventory";
import { items, pickupItemSubscribe } from "./Items";

export function init() {
  WA.player.state.saveVariable("items", playerInventory([]).items);
  items.forEach(pickupItemSubscribe);
}
