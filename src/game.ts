import { Player } from "./player";
import { Hex } from "./hex";

import {
    Color,
    HEX_ROLLS,
    YieldRoll,
    RobbRoll,
    DiceRoll,
    RESOURCES,
    Resource,
    Position,
    YIELD_VALUE,
    YieldValue,
    PropertyKeys,
    PartialData,
    ROAD_DIRECTIONS,
    RoadDirection,
    CITY_WEIGHT,
    CityWeight,
} from "./types";

class Game {
    map: Element;
    hexs: Record<Position, Hex>;
    players: Record<Color, Player>;

    constructor() {
        this.players = {};
        this.hexs = {} as Record<Position, Hex>;

        // this.update(page);
        // this.watch();
        this.initHexs();
        console.log("NEW GAME VALUES:", this.hexs);
    }

    // update = (page: Document) => {
    //     this.map = page.getElementById("cat_map")!;
    //     this.parseSettledCoords();
    //     console.log("updated");
    // };

    // watch = () => {
    //     const callback: MutationCallback = () => {
    //         const page = new DOMParser().parseFromString(
    //             htmlContent,
    //             "text/html"
    //         );
    //         game.update(page);
    //     };

    //     new MutationObserver(debounce(callback, 100)).observe(this.map, {
    //         childList: true,
    //         subtree: true,
    //     });
    // };

    initHexs = () => {
        let htmlContent = document.documentElement.outerHTML;
        const page = new DOMParser().parseFromString(htmlContent, "text/html");
        const htmlHexs = page.querySelectorAll("[id*=cathex]");
        for (let htmlHex of htmlHexs) {
            const position = Hex.parsePosition(htmlHex);
            this.hexs[position] = new Hex(htmlHex);
        }

        // const callback: MutationCallback = () => {
        //     const page = new DOMParser().parseFromString(
        //         htmlContent,
        //         "text/html"
        //     );
        //     game.update(page);
        // };

        // new MutationObserver(debounce(callback, 100)).observe(this.map, {
        //     childList: true,
        //     subtree: true,
        // });
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

    // parseSettledCoords = () => {
    //     for (let city of this.map.querySelectorAll("[id*=cat_city]")) {
    //         const color = city.classList.item(2)?.substring(10)!;
    //         if (!(color in this.players)) {
    //             this.players[color] = new Player();
    //         }
    //         console.log(city, color, this.parseCityNeighbors(city.id));
    //         for (let resourceCoords of this.parseCityNeighbors(city.id)) {
    //             // console.log(resourceCoords);
    //         }
    //     }
    // };
}

export { Game };
