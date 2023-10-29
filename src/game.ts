import { Player } from "./player";
import { Hex } from "./hex";

import { Color, POSITIONS, Position } from "./types";

class Game {
    map: Element;
    hexs: Record<Position, Hex>;
    players: Record<Color, Player>;

    constructor() {
        console.time("construct Game representation");
        this.players = {};

        this.initHexs();
        console.timeEnd("construct Game representation");
        console.log("game values:", this.hexs);
    }

    initHexs = () => {
        const hexEntries = POSITIONS.map((position: Position) => [
            position,
            new Hex(position),
        ]);
        this.hexs = Object.fromEntries(hexEntries);
    };

    parseCityNeighbors = (cityId: string) => {
        const writtenCoords = cityId.substring(9, 12);
        const coords = [Number(cityId[9]), Number(cityId[11])];
        coords[1] -= coords[0] % 2;

        const orientation = cityId[13];
        if (orientation === "D") coords[0]++;
        else if (orientation === "T") coords[0]--;

        return [
            writtenCoords,
            `${coords[0]}_${coords[1]}`,
            `${coords[0]}_${coords[1] + 1}`,
        ];
    };
}

export { Game };
