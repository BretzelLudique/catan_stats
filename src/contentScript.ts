const HEX_ROLLS = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12] as const;
type YieldRoll = (typeof HEX_ROLLS)[number];
type RobbRoll = 7;
type DiceRoll = (typeof HEX_ROLLS)[number] | RobbRoll;

const RESOURCES = ["Forest", "Hills", "Pasture", "Field", "Mountain"] as const;
type Resource = (typeof RESOURCES)[number];
type Position = `${0 | 1 | 2 | 3 | 4 | 5 | 6}_${0 | 1 | 2 | 3 | 4 | 5 | 6}`;

const YIELD_VALUE = [1, 2, 3, 4, 5, 6] as const;
type YieldValue = (typeof YIELD_VALUE)[number];

type PropertyKeys<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];
type PartialData<T> = Partial<Record<keyof T, T[keyof T]>>;

class Player {
    resources: Partial<Record<Resource, number>>;
    constructor(initialData: PartialData<Player> = {}) {
        this.update(initialData);
    }
    update(data: PartialData<Player> = {}) {
        Object.assign(this, data);
    }
}

const ROAD_DIRECTIONS = ["north", "west", "south"] as const;
type RoadDirection = (typeof ROAD_DIRECTIONS)[number];

const CITY_WEIGHT = [1, 2] as const;
type CityWeight = (typeof CITY_WEIGHT)[number];

class Hex {
    position?: Position;
    resource?: Resource;
    diceRoll?: DiceRoll;
    isBlocked?: boolean;
    // roads
    north?: Color;
    west?: Color;
    south?: Color;
    // cities
    top?: CityWeight;
    down?: CityWeight;

    constructor(initialData: PartialData<Hex> = {}) {
        this.update(initialData);
    }
    update(data: PartialData<Hex> = {}) {
        Object.assign(this, data);
    }
}

type Color = string;
class Game {
    map: Element;
    hexs: Record<Position, Hex>;
    players: Record<Color, Player>;

    constructor(page: Document) {
        this.players = {};
        this.update(page);
        this.watch();
        this.parseHexs();
        console.log("NEW GAME VALUES:", this.hexs);
    }

    update = (page: Document) => {
        this.map = page.getElementById("cat_map")!;
        this.parseSettledCoords();
        console.log("updated");
    };

    watch = () => {
        const callback: MutationCallback = () => {
            const page = new DOMParser().parseFromString(
                htmlContent,
                "text/html"
            );
            game.update(page);
        };

        new MutationObserver(debounce(callback, 100)).observe(this.map, {
            childList: true,
            subtree: true,
        });
    };

    parseHexs = () => {
        const weights = {} as typeof this.hexs;
        const hexs = this.map.querySelectorAll("[id*=cathex]");
        for (let hex of hexs) {
            for (let resource of RESOURCES) {
                if (hex.classList.contains(`cat_${resource}`)) {
                    const roll = hex
                        .querySelector("[id*=cat_num_token]")!
                        .classList.item(1)!
                        .substring(8);

                    const position = hex.id.substring(7) as Position;
                    const diceRoll = Number(roll) as DiceRoll;
                    weights[position] = new Hex({
                        position,
                        resource,
                        diceRoll,
                    });
                    break;
                }
            }
        }
        this.hexs = weights;
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

    parseSettledCoords = () => {
        for (let city of this.map.querySelectorAll("[id*=cat_city]")) {
            const color = city.classList.item(2)?.substring(10)!;
            if (!(color in this.players)) {
                this.players[color] = new Player();
            }
            console.log(city, color, this.parseCityNeighbors(city.id));
            for (let resourceCoords of this.parseCityNeighbors(city.id)) {
                // console.log(resourceCoords);
            }
        }
    };
}

function debounce(callback: Function, delay: number, maxIter: number = 3) {
    let timeoutId: ReturnType<typeof setTimeout>;
    let count = 0;

    return function () {
        clearTimeout(timeoutId);
        count++;

        timeoutId = setTimeout(() => {
            if (count === maxIter) {
                callback();
            }
            count = 0;
        }, delay);
    };
}

let htmlContent = document.documentElement.outerHTML;
const page = new DOMParser().parseFromString(htmlContent, "text/html");
const game = new Game(page);
