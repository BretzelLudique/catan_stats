import { Player } from "./player";
import { Hex } from "./hex";

import { Color, POSITIONS, Position } from "./types";
import { LogMessage } from "./logMessage";

const rgb2hex = (rgb: string) =>
    `#${rgb
        .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
        .slice(1)
        .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
        .join("")}`;

class Game {
    map: Element;
    hexs: Record<Position, Hex>;
    players: Record<string, Player>;

    constructor() {
        console.time("construct Game representation");
        this.players = {};
        for (let players of document.querySelectorAll("div[id*=player_name]")) {
            const color = rgb2hex(players.querySelector("a")["style"]["color"]);
            const name = players.querySelector("a").textContent;

            this.players[name] = new Player({ color, name });
        }
        // console.log(this.players);

        this.initHexs();
        console.timeEnd("construct Game representation");

        const onLogsChange: MutationCallback = (logMutations) => {
            for (const logMutation of logMutations) {
                for (const logMessage of logMutation.addedNodes) {
                    if (!(logMessage instanceof HTMLElement)) continue;
                    let message = logMessage.textContent;
                    const playerName = this.parsePlayerName(message);
                    if (playerName === undefined) {
                        // console.log(
                        //     "New log:",
                        //     message,
                        //     "(todo: handle when playerName is undefined)"
                        // );
                        continue;
                    }
                    const player = this.players[playerName];
                    message = message.replace(`${playerName} `, "");
                    const actions = {
                        "Vous perdez ": "",
                        "Vous obtenez ": "",
                        "obtient ": "",
                        "construit une colonie pour ": "",
                        "construit une route pour ": "",
                    };
                    for (const actionExpr in actions) {
                        if (message.startsWith(actionExpr)) {
                            message = message.replace(actionExpr, "");
                            const resourceValue = Number(message);
                            console.log(
                                "New log:",
                                playerName,
                                message,
                                resourceValue
                            );
                            const resource = logMessage
                                .querySelector("div.cat_log_token")
                                .classList.item(1)
                                .replace("icon_", "");
                            player.resources[resource] += resourceValue;
                            break;
                        }
                    }
                }
            }
        };

        new MutationObserver(onLogsChange).observe(
            document.getElementById("logs"),
            {
                childList: true,
            }
        );
    }

    parsePlayerName = (logMessage: string) => {
        for (const playerName in this.players) {
            if (logMessage.startsWith(playerName)) return playerName;
        }
    };
    initHexs = () => {
        const hexEntries = POSITIONS.map((position: Position) => [
            position,
            new Hex(position),
        ]);
        this.hexs = Object.fromEntries(hexEntries);
    };

    // parseCityNeighbors = (cityId: string) => {
    //     const writtenCoords = cityId.substring(9, 12);
    //     const coords = [Number(cityId[9]), Number(cityId[11])];
    //     coords[1] -= coords[0] % 2;

    //     const orientation = cityId[13];
    //     if (orientation === "D") coords[0]++;
    //     else if (orientation === "T") coords[0]--;

    //     return [
    //         writtenCoords,
    //         `${coords[0]}_${coords[1]}`,
    //         `${coords[0]}_${coords[1] + 1}`,
    //     ];
    // };
}

export { Game };
