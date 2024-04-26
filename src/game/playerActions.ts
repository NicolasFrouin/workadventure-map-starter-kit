import { RemotePlayerInterface } from "@workadventure/iframe-api-typings";
import { DEAD_ZONE, PlayerMode } from "./config";
import { collidePlayers } from "./mobCollision";
import { initLoseScreen } from "./screens";

export async function initPlayerState() {
  WA.player.state.saveVariable("items", []);
  WA.player.state.saveVariable("playerMode", PlayerMode.NEUTRAL);
  WA.player.state.saveVariable("alive", true);

  WA.state.onVariableChange("nbKilled").subscribe((nbKilled) => {

  console.log("nbKilled", WA.state.nbKilled);
  const nbPlayers = WA.state.nbPlayers ?? 0;
  console.log("nbPlayersAfter", nbPlayers);
    if (nbPlayers == nbKilled){
      initLoseScreen();
    }  
  });
}

export async function killPlayer(player: RemotePlayerInterface) {
  WA.event.broadcast("player:kill", { playerId: player.playerId });
  
  const nbKilled = WA.state.nbKilled ?? 0;
  WA.state.saveVariable("nbKilled", Number(nbKilled) + 1);
    
}

export function initKilled() {
  WA.event.on("player:kill").subscribe(({ data, name, senderId }) => {
    if (data.playerId && data.playerId === WA.player.playerId) {
      WA.player.state.saveVariable("items", []);
      WA.player.state.saveVariable("alive", false);
      WA.player.state.saveVariable("playerMode", PlayerMode.NEUTRAL);
      WA.player.teleport(DEAD_ZONE.x, DEAD_ZONE.y);
      WA.controls.disablePlayerControls();
      WA.camera.set(DEAD_ZONE.x, DEAD_ZONE.y, DEAD_ZONE.width, DEAD_ZONE.height, true, true);
    }
  });
}

export function initOnMovment() {
  WA.player.onPlayerMove(async ({ moving, direction, x, y, oldX, oldY }) => {
    await collidePlayers({ x, y });
  });
}

export function initInventory() {
  const width = 50;
  WA.ui.website.open({
    url: "/src/game/views/inventoryDisplay.html",
    position: {
      vertical: "top",
      horizontal: "middle",
    },
    size: {
      height: "100vh",
      width: `100vw`,
    },
    margin: {
      // top: "2vh",
      // left: `${(100 - width) / 2}vw`,
      // right: `${(100 - width) / 2}vw`,
    },
    allowApi: true,
  });
}
