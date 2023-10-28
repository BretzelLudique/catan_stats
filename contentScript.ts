const RESOURCES = ["Forest", "Hills", "Pasture", "Field", "Mountain"];

type Resource = (typeof RESOURCES)[number];

const HEXROLLS = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];
type HexRoll = (typeof HEXROLLS)[number];
type RobbRoll = 7;
type DiceRoll = (typeof HEXROLLS)[number] | RobbRoll;

class Player {
    [resource: Resource]: number;
    constructor() {
        for (const resource of RESOURCES) {
            this[resource] = 0;
        }
    }
}

class Game {
    map: Element;
    hexWeights: Record<string, Array<string>>;
    players: Array<Player>;

    constructor(page: Document) {
        this.update(page);
        this.initHexWeights();
        console.log("NEW GAME VALUES:", this.hexWeights);
        this.grab_neigbors();
    }
    update = (page: Document) => {
        this.map = page.getElementById("cat_map")!;
    };

    initHexWeights = () => {
        const weights: Record<any, any> = {};
        const hexs = this.map.querySelectorAll("[id*=cathex]");
        for (let hex of hexs) {
            const coords = hex.id.substring(7);

            for (let resource of RESOURCES) {
                if (hex.classList.contains(`cat_${resource}`)) {
                    const roll = hex
                        .querySelector("[id*=cat_num_token]")!
                        .classList.item(1)!
                        .substring(8);

                    weights[coords] = [resource, roll];
                    break;
                }
            }
        }
        this.hexWeights = weights;
    };

    grab_neighbor = (cityId: string) => {
        const writtenCoords = cityId.substring(0, 12);
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

    grab_neigbors = () => {
        for (let city of this.map.querySelectorAll("[id*=cat_city]")) {
            for (let neighbor of this.grab_neighbor(city.id)) {
            }
        }
    };
}

function debounce(callback: Function, delay: number, maxIter: number = 3) {
    let timeoutId: number;
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

const targetNode = document.getElementById("cat_map");

const callback: MutationCallback = () => {
    const page = new DOMParser().parseFromString(htmlContent, "text/html");
    game.update(page);
};

const observer = new MutationObserver(debounce(callback, 100));

if (targetNode)
    observer.observe(targetNode, {
        attributes: true,
        childList: true,
        subtree: true,
    });
