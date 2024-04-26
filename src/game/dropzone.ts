import { playerInventory } from "./Inventory";
import { pickupItemSubscribe } from "./Items";
import { gameQuota } from "./quota";


export function dropzone() {
  WA.room.onEnterLayer("sellingZone").subscribe(() => {
    sellItems();
  });
}

function sellItems() {
  let total = 0;
  if(isNaN(WA.state.total)) {WA.state.total = 0}

  gameQuota.then(function() {
    let pInv = playerInventory(WA.player.state.items as any[]);
  
    for (let item of pInv.removeAll()) {
      if (!item) continue;
      total += item.price;
      pickupItemSubscribe(item);
    }
    WA.state.saveVariable("total", Number(WA.state.total) + total);

    WA.player.state.saveVariable("items", pInv.items)
  });
;
}
