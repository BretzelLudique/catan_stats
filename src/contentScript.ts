import { Game } from "./game";

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

const game = new Game();
