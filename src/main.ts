/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { dropzone, init } from "./game";
import { initMap } from "./game/initMap";
import { PlayerMode } from "./game/config";

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    WA.player.state.saveVariable("playerMode", PlayerMode.NEUTRAL);
    init();
    initMap();
    dropzone();

    bootstrapExtra().catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

export {};
