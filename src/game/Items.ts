import { getLayersMap } from "@workadventure/scripting-api-extra/dist";
import { playerInventory } from "./Inventory";
import { PlayerMode } from "./config";

export interface Item {
  name: string;
  price: Number;
  layer: string;
}

export const items: Item[] = [];

export async function initItems() {
  const allLayers = await getLayersMap();
  for (const layer of allLayers.values()) {
    if (layer.name.startsWith("items/")) {
      items.push({
        name: layer.name.replace("items/", ""),
        price: (layer.properties?.find((p) => p.name === "price")?.value as Number) || 0,
        layer: layer.name,
      });
    }
  }
  console.log("Items", items);

  items.forEach((item) => {
    let actionMessage: any;
    const itemLayerSubscribe = WA.room.onEnterLayer(item.layer).subscribe(function () {
      const that = this;
      let pInv = playerInventory(WA.player.state.items as any[]);
      let message = `Press 'SPACE' to pick up ${item.name} ($${item.price})`;
      let callback = () => {
        WA.player.state.saveVariable("items", pInv.addItem(item).items);
        WA.event.broadcast("item:pickup", { itemName: item.name });
        WA.room.hideLayer(item.layer);
        that.unsubscribe();
      };

      if (!pInv.canAddItem()) {
        message = "Inventory full";
        callback = () => {};
      }
      if (WA.player.state.playerMode !== PlayerMode.MOB) {
        actionMessage = WA.ui.displayActionMessage({ message, callback });
      }
    });
    WA.room.onLeaveLayer(item.layer).subscribe(() => {
      if (actionMessage !== undefined) {
        actionMessage.remove();
      }
    });
    WA.event.on("item:pickup").subscribe(({ data, name, senderId }) => {
      if (data.itemName && data.itemName === item.name) {
        WA.room.hideLayer(item.layer);
        if (itemLayerSubscribe) {
          itemLayerSubscribe.unsubscribe();
        }
      }
    });
  });
}

export function pickupItemSubscribe(item: Item) {
  // WA.room.showLayer(`items/${item.name}`);
  let actionMessage: any;
  WA.room.area.onEnter(`${item.name}Area`).subscribe(function () {
    const that = this;
    let pInv = playerInventory(WA.player.state.items as any[]);
    let message = `Press 'SPACE' to pick up ${item.name} ($${item.price})`;
    let callback = () => {
      WA.player.state.saveVariable("items", pInv.addItem(item).items);
      WA.room.area.delete(`${item.name}Area`);
      that.unsubscribe();
    };
    if (!pInv.canAddItem()) {
      message = "Inventory full";
      callback = () => {};
    }
    actionMessage = WA.ui.displayActionMessage({ message, callback });
  });
  WA.room.area.onLeave(`${item.name}Area`).subscribe(() => {
    if (actionMessage !== undefined) {
      actionMessage.remove();
    }
  });
}
