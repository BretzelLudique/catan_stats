import {
    Color,
    HEX_ROLLS,
    YieldRoll,
    RobbRoll,
    DiceRoll,
    LANDS,
    Land,
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

class Hex {
    position?: Position;
    htmlHex: Element;
    land?: Land;
    diceRoll?: DiceRoll;
    isBlocked?: boolean;

    routeN?: Color;
    routeW?: Color;
    routeS?: Color;

    cityT?: CityWeight;
    cityD?: CityWeight;

    constructor(position: Position) {
        this.position = position;
        this.htmlHex = document.getElementById(`cathex_${position}`);

        this.parseLands();
        this.parsePlayerActions();
        // this.watch();
    }
    parseLands() {
        const classes = this.htmlHex.classList;
        if (classes.length !== 4 || classes.item(3) === "cat_undefined") return;

        let land: Land;
        let diceRoll: DiceRoll;
        land = this.htmlHex.classList.item(3).replace("cat_", "") as Land;
        diceRoll = Number(
            document
                .getElementById(`cat_num_token_${this.position}`)
                .classList.item(1)
                .replace("cat_num_", "")
        ) as DiceRoll;
        this.assign({ land, diceRoll });
    }
    _parseRoads() {
        for (const code of ["N", "W", "S"]) {
            const road = document.getElementById(
                `cat_place_road_${this.position}_${code}`
            );
            if (road.classList.length === 4) {
                this[`route${code}`] = road.classList
                    .item(3)
                    .replace("cat_road_", "");
            } else {
                delete this[`route${code}`]; // TODO: cant remove road, so we can remove this line
            }
        }
    }
    _parseCities() {
        for (const code of ["T", "D"]) {
            const city = document.getElementById(
                `cat_city_${this.position}_${code}`
            );
            if (city) {
                this[`city${code}`] = city.classList
                    .item(2)
                    .replace("cat_color_", "");
            } else {
                delete this[`city${code}`]; // TODO: cant remove city, so we can remove this line
            }
        }
    }
    _searchForRobber() {
        const robber = document.getElementById("cat_robber");
        if (Hex.parsePosition(robber.parentElement) === this.position) {
            this.isBlocked = true;
        } else {
            delete this.isBlocked;
        }
    }
    parsePlayerActions() {
        this._parseRoads();
        this._parseCities();
        this._searchForRobber();
    }
    assign(data: PartialData<Hex> = {}) {
        Object.assign(this, data);
    }
    watch() {
        new MutationObserver(() => this.parsePlayerActions()).observe(
            this.htmlHex,
            {
                childList: true,
                subtree: true,
            }
        );
    }
    static parsePosition = (htmlHex: Element) =>
        htmlHex.id.replace("cathex_", "") as Position;
}

// function debounce(callback: Function, delay: number, maxIter: number = 3) {
//     let timeoutId: ReturnType<typeof setTimeout>;
//     let count = 0;

//     return function () {
//         clearTimeout(timeoutId);
//         count++;

//         timeoutId = setTimeout(() => {
//             if (count === maxIter) {
//                 callback();
//             }
//             count = 0;
//         }, delay);
//     };
// }

export { Hex };
