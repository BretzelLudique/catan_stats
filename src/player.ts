import { Resource, PartialData } from "./types";

class Player {
    resources: Partial<Record<Resource, number>>;
    constructor(initialData: PartialData<Player> = {}) {
        this.assign(initialData);
    }
    assign(data: PartialData<Player> = {}) {
        Object.assign(this, data);
    }
}

export { Player };
