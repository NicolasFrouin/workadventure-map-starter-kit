import { playerInventory } from "./Inventory";
import { pickupItemSubscribe } from "./Items";

export function dropzone() {
  WA.room.onEnterLayer("items/drop").subscribe(() => {
    sellItems();
  });
}

function sellItems() {
  console.group("sellItems");
  let total = 0;
  let pInv = playerInventory(WA.player.state.items as any[]);
  console.log("inventory: ", pInv.items);

  for (let item of pInv.removeAll()) {
    if (!item) continue;
    total += item.price;
    console.log("selling", item.name, "for", item.price);
    pickupItemSubscribe(item);
  }

  WA.player.state.saveVariable("items", pInv.items);
  console.log("total price: ", total);
  console.groupEnd();
}
