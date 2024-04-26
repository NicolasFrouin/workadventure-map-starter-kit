import { Console } from "console";
import { PlayerMode, SafeZone, mobSpawns } from "./config";
import { collidePlayers } from "./mobCollision";
import { initInventory, initKilled, initOnMovment } from "./playerActions";

function displayDoor(state: boolean, place: string = "upper") {
  if (state === true) {
    WA.room.showLayer(`door/${place}_door_opened`);
    WA.room.hideLayer(`door/${place}_door_closed`);
  } else {
    WA.room.hideLayer(`door/${place}_door_opened`);
    WA.room.showLayer(`door/${place}_door_closed`);
  }
}

function selectRandomCoordonnates() {
  return mobSpawns[Math.floor(Math.random() * mobSpawns.length)];
}

export function initMap() {
  WA.camera.followPlayer();

  WA.room.area.onEnter("tp-evil").subscribe(async () => {
    displayDoor(Boolean(WA.state.upper_doorState), "upper");
    displayDoor(Boolean(WA.state.lower_doorState), "lower");

    const mobSpawn = selectRandomCoordonnates();

    WA.player.state.saveVariable("playerMode", PlayerMode.MOB, { public: true });
    WA.player.teleport(mobSpawn.x, mobSpawn.y);
    initOnMovment();

    WA.state.onVariableChange("upper_doorState").subscribe((state) => {
      displayDoor(Boolean(state), "upper");
    });
    WA.state.onVariableChange("lower_doorState").subscribe((state) => {
      displayDoor(Boolean(state), "lower");
    });

    WA.room.onEnterLayer("doorsteps/upper_inside_doorstep").subscribe(() => {
      WA.state.upper_doorState = !WA.state.upper_doorState;
    });
    WA.room.onEnterLayer("doorsteps/lower_inside_doorstep").subscribe(() => {
      WA.state.lower_doorState = !WA.state.lower_doorState;
    });

    WA.room.onLeaveLayer("doorsteps/upper_inside_doorstep").subscribe(() => {
      WA.state.upper_doorState = !WA.state.upper_doorState;
    });
    WA.room.onLeaveLayer("doorsteps/lower_inside_doorstep").subscribe(() => {
      WA.state.lower_doorState = !WA.state.lower_doorState;
    });

    await WA.players.configureTracking({
      players: true,
      movement: false,
    });
  });

  WA.room.area.onEnter("tp-bystander").subscribe(() => {
    displayDoor(Boolean(WA.state.upper_doorState), "upper");
    displayDoor(Boolean(WA.state.lower_doorState), "lower");
    WA.player.state.saveVariable("playerMode", PlayerMode.PLAYER, { public: true });
    WA.player.teleport(SafeZone.x, SafeZone.y);
    const nbPlayers = WA.state.nbPlayers ?? 0;
    WA.state.saveVariable("nbPlayers", Number(nbPlayers) + 1);
    console.log("cc")
    console.log("nbPlayersBefore", WA.state.nbPlayers);
    initInventory();
    initKilled();
  });
}
