import { getSortedArrDOM, satisfiesSortOrderDOM } from "../minigames/minigame_utils.ts";
import { Runner } from "../minigames/runners/runner.ts";
import { showSortedArr } from "./sort_logger.ts";

async function sortHuman(arr: Array<number>, runner: Runner) {
    await runner.run(arr);
}

export async function startSortHuman(arr: Array<number>, runner: Runner): Promise<void> {
    await sortHuman(arr, runner);
    const sortedArrDOM = getSortedArrDOM();
    if (sortedArrDOM) {
        showSortedArr(arr);
        satisfiesSortOrderDOM(sortedArrDOM);
    }
    return;
}