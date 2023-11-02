import { RESOURCES, Resource, PartialData, Color } from "./types";

class Player {
    name: string;
    color: Color;
    resources: Partial<Record<Resource, number>>;
    constructor(initialData: PartialData<Player> = {}) {
        this.assign(initialData);
        this.resources = Object.fromEntries(RESOURCES.map((r) => [r, 0]));
    }
    assign(data: PartialData<Player> = {}) {
        Object.assign(this, data);
    }
}

export { Player };
