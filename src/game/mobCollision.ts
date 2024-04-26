import { ActionMessage } from "@workadventure/iframe-api-typings";
import { KILL_RADIUS, PlayerMode } from "./config";
import { killPlayer } from "./playerActions";

var actionMessage: ActionMessage | undefined = undefined;

export async function collidePlayers(position: { x: number; y: number }) {
  if (WA.player.state.playerMode !== PlayerMode.MOB) return;

  await WA.players.configureTracking();
  const playerList = WA.players.list();

  for (const player of playerList) {
    console.log(player.name, player.state.playerMode);

    if (player.state.playerMode === PlayerMode.PLAYER) {
      const playerPosition = player.position;
      if (
        Math.abs(playerPosition.x - position.x) < KILL_RADIUS &&
        Math.abs(playerPosition.y - position.y) < KILL_RADIUS
      ) {
        if (!actionMessage) {
          actionMessage = WA.ui.displayActionMessage({
            message: "Press SPACE to kill player",
            callback: () => {
              killPlayer(player);
            },
          });
        }
      } else {
        if (actionMessage) {
          actionMessage.remove();
          actionMessage = undefined;
        }
      }
    }
  }
}
