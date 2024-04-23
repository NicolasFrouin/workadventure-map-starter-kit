import { playerInventory } from "./Inventory";

export interface Item {
  name: string;
  price: number;
}

export function pickupItemSubscribe(item: Item) {
  WA.room.showLayer(`items/${item.name}`);
  WA.room.onEnterLayer(`items/${item.name}`).subscribe(function () {
    let pInv = playerInventory(WA.player.state.items as any[]);
    if (!pInv.canAddItem()) return;
    WA.player.state.saveVariable("items", pInv.addItem(item).items);
    console.log(item.name, "added to inventory");
    WA.room.hideLayer(`items/${item.name}`);
    this.unsubscribe();
  });
}

export const items: Item[] = [
  {
    name: "tree",
    price: 100,
  },
  {
    name: "rock",
    price: 50,
  },
  {
    name: "gold",
    price: 200,
  },
];
