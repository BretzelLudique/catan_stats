import { Player } from "./player";

class LogMessage {
    htmlLogMessage: Element;
    player: undefined | Player;
    actionExpr: string;
    value: number;

    constructor(htmlLogMessage: Element) {
        this.htmlLogMessage = htmlLogMessage;
    }
}

export { LogMessage };
