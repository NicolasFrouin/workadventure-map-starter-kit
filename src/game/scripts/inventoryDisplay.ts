import { Item } from "../Items";
import gear from "../svg/gear.svg";

WA.onInit().then(() => {
  const itemList = document.getElementById("itemList") as HTMLUListElement;
  const totalEl = document.getElementById("total") as HTMLOutputElement;
  const quotaEl = document.getElementById("quota") as HTMLSpanElement;

  WA.event.on("change:quota").subscribe(({ data, name, senderId }) => {
    quotaEl.innerHTML = Number(data);
  });

  WA.event.on("change:total").subscribe(({ data, name, senderId }) => {
    totalEl.innerHTML = Number(data);
  });

  WA.event.broadcast("request:vars", {});

  WA.player.state.onVariableChange("items").subscribe((items) => {
    for (let i = 0; i < itemList.children.length; i++) {
      itemList.children[i].innerHTML = "";
    }
    (items as Item[]).forEach((item, index) => {
      itemList.children[index].innerHTML = `<img src="${gear}" alt="gear" height="44.8" width="44.8" />`;
    });
  });
});
