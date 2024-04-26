import { initItems } from "./Items";
import { initPlayerState } from "./playerActions";
import { initRules } from "./rule";

export function init() {
  initChangeEvents();
  initSound();
  initItems();
  initRules();
  initPlayerState();
  WA.room.onEnterLayer("sellingZone").subscribe(() => {});
}

export function initChangeEvents() {
  WA.event.on("request:vars").subscribe(({ data, name, senderId }) => {
    WA.state.saveVariable("quota", `${WA.state.quota ?? 0}`);
    WA.state.saveVariable("total", `${WA.state.total ?? 0}`);
    console.log("broadcast vars");
  });

  WA.state.onVariableChange("quota").subscribe((quota) => {
    WA.event.broadcast("change:quota", quota);
  });

  WA.state.onVariableChange("total").subscribe((total) => {
    WA.event.broadcast("change:total", total);
  });
};

export function initSound() {
  const listOfSounds = ["ambient","ambient2","ambient3","ambient4"];

  listOfSounds.forEach((item) => {
    let ambientSound = WA.sound.loadSound(`/src/game/sound/${item}.mp3`);
  
    setInterval(() => {
      const selectedNumber = Math.random();
      if (selectedNumber < 0.08) {
        ambientSound.play(undefined);
      }
    }, 5000)
  });
}
