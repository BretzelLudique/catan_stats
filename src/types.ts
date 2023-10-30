const HEX_ROLLS = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12] as const;
type YieldRoll = (typeof HEX_ROLLS)[number];
type RobbRoll = 7;
type DiceRoll = (typeof HEX_ROLLS)[number] | RobbRoll;

const LANDS = ["Forest", "Hills", "Pasture", "Field", "Mountain"] as const;
type Land = (typeof LANDS)[number];

const RESOURCES = ["lumber", "brick", "wool", "grain", "ore"];

const POSITIONS = [
    "0_1",
    "0_2",
    "0_3",
    "0_4",
    "1_1",
    "1_2",
    "1_3",
    "1_4",
    "1_5",
    "2_0",
    "2_1",
    "2_2",
    "2_3",
    "2_4",
    "2_5",
    "3_0",
    "3_1",
    "3_2",
    "3_3",
    "3_4",
    "3_5",
    "3_6",
    "4_0",
    "4_1",
    "4_2",
    "4_3",
    "4_4",
    "4_5",
    "5_1",
    "5_2",
    "5_3",
    "5_4",
    "5_5",
    "6_1",
    "6_2",
    "6_3",
    "6_4",
] as const;
type Position = (typeof POSITIONS)[number];

const YIELD_VALUE = [1, 2, 3, 4, 5, 6] as const;
type YieldValue = (typeof YIELD_VALUE)[number];

type PropertyKeys<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];
type PartialData<T> = Partial<Record<keyof T, T[keyof T]>>;

const ROAD_DIRECTIONS = ["north", "west", "south"] as const;
type RoadDirection = (typeof ROAD_DIRECTIONS)[number];

const CITY_WEIGHT = [1, 2] as const;
type CityWeight = (typeof CITY_WEIGHT)[number];
type Color = string;

export {
    Color,
    HEX_ROLLS,
    YieldRoll,
    RobbRoll,
    DiceRoll,
    LANDS,
    Land,
    POSITIONS,
    Position,
    YIELD_VALUE,
    YieldValue,
    PropertyKeys,
    PartialData,
    ROAD_DIRECTIONS,
    RoadDirection,
    CITY_WEIGHT,
    CityWeight,
};
