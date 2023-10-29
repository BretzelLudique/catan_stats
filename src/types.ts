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
};
