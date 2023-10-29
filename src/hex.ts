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

    constructor(htmlHex: Element) {
        this.refresh(htmlHex);
    }
    update(data: PartialData<Hex> = {}) {
        Object.assign(this, data);
    }
    refresh(htmlHex: Element) {
        for (let resource of RESOURCES) {
            if (htmlHex.classList.contains(`cat_${resource}`)) {
                const roll = htmlHex
                    .querySelector("[id*=cat_num_token]")!
                    .classList.item(1)!
                    .substring(8);

                const position = htmlHex.id.substring(7) as Position;
                const diceRoll = Number(roll) as DiceRoll;
                this.update({
                    position,
                    resource,
                    diceRoll,
                });
                break;
            }
        }
    }
    static parsePosition = (htmlHex: Element) =>
        htmlHex.id.substring(7) as Position;
}

export { Hex };
