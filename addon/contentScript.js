"use strict";
const HEX_ROLLS = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];
const RESOURCES = ["Forest", "Hills", "Pasture", "Field", "Mountain"];
const YIELD_VALUE = [1, 2, 3, 4, 5, 6];
class Player {
    constructor(initialData = {}) {
        this.update(initialData);
    }
    update(data = {}) {
        Object.assign(this, data);
    }
}
const ROAD_DIRECTIONS = ["north", "west", "south"];
const CITY_WEIGHT = [1, 2];
class Hex {
    constructor(initialData = {}) {
        this.update(initialData);
    }
    update(data = {}) {
        Object.assign(this, data);
    }
}
class Game {
    constructor(page) {
        this.update = (page) => {
            this.map = page.getElementById("cat_map");
            this.parseSettledCoords();
            console.log("updated");
        };
        this.watch = () => {
            const callback = () => {
                const page = new DOMParser().parseFromString(htmlContent, "text/html");
                game.update(page);
            };
            new MutationObserver(debounce(callback, 100)).observe(this.map, {
                childList: true,
                subtree: true,
            });
        };
        this.parseHexs = () => {
            const weights = {};
            const hexs = this.map.querySelectorAll("[id*=cathex]");
            for (let hex of hexs) {
                for (let resource of RESOURCES) {
                    if (hex.classList.contains(`cat_${resource}`)) {
                        const roll = hex
                            .querySelector("[id*=cat_num_token]")
                            .classList.item(1)
                            .substring(8);
                        const position = hex.id.substring(7);
                        const diceRoll = Number(roll);
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
        this.parseCityNeighbors = (cityId) => {
            const writtenCoords = cityId.substring(9, 12);
            const coords = [Number(cityId[9]), Number(cityId[11])];
            coords[1] -= coords[0] % 2;
            const orientation = cityId[13];
            if (orientation === "D")
                coords[0]++;
            else if (orientation === "T")
                coords[0]--;
            return [
                writtenCoords,
                `${coords[0]}_${coords[1]}`,
                `${coords[0]}_${coords[1] + 1}`,
            ];
        };
        this.parseSettledCoords = () => {
            var _a;
            for (let city of this.map.querySelectorAll("[id*=cat_city]")) {
                const color = (_a = city.classList.item(2)) === null || _a === void 0 ? void 0 : _a.substring(10);
                if (!(color in this.players)) {
                    this.players[color] = new Player();
                }
                console.log(city, color, this.parseCityNeighbors(city.id));
                for (let resourceCoords of this.parseCityNeighbors(city.id)) {
                    // console.log(resourceCoords);
                }
            }
        };
        this.players = {};
        this.update(page);
        this.watch();
        this.parseHexs();
        console.log("NEW GAME VALUES:", this.hexs);
    }
}
function debounce(callback, delay, maxIter = 3) {
    let timeoutId;
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
