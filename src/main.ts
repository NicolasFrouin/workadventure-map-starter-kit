/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { dropzone, init, playerInventory } from "./game";

console.log("Script started successfully");

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    init();
    dropzone();

    WA.room.onEnterLayer("player").subscribe(() => {
      let pInv = playerInventory(WA.player.state.items as any[]);
      console.log("inventiry :", pInv.items);
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra()
      .then(() => console.log("Scripting API Extra ready"))
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

export {};
