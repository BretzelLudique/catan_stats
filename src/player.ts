import { Land, PartialData, Color } from "./types";

class Player {
    name: string;
    color: Color;
    resources: Partial<Record<Land, number>>;
    constructor(initialData: PartialData<Player> = {}) {
        this.assign(initialData);
    }
    assign(data: PartialData<Player> = {}) {
        Object.assign(this, data);
    }
}

export { Player };
