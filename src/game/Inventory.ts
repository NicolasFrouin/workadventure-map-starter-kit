import { Item } from "./Items";

export const playerInventory = (inventory: Item[] = []) => ({
  maxItems: 4,
  items: inventory,
  canAddItem: function () {
    return this.items.length < this.maxItems;
  },
  getItem: function (index: number) {
    return this.items[index];
  },
  addItem: function (item: Item) {
    if (this.items.length < this.maxItems) {
      this.items.push(item);

      const pickupItem = WA.sound.loadSound(`/src/game/sound/pickupItem.mp3`);
      pickupItem.play(undefined);
    }
    return this;
  },
  removeItem: function (index: number) {
    this.items.splice(index, 1);
    return this;
  },
  removeAll: function* (): Generator<Item | undefined> {
    if (this.items.length > 0) {
      const pickupItem = WA.sound.loadSound(`/src/game/sound/pickupItem.mp3`);
      pickupItem.play(undefined);
    }
    
    while (this.items.length > 0) {
      yield this.items.pop();
    }
        
  },
});
