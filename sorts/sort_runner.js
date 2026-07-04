import { getSortedArrDOM, satisfiesSortOrderDOM } from "../minigames/minigame_utils.js";
import { showSortedArr } from "./sort_logger.js";
async function sortHuman(arr, runner) {
    await runner.run(arr);
}
export async function startSortHuman(arr, runner) {
    await sortHuman(arr, runner);
    const sortedArrDOM = getSortedArrDOM();
    if (sortedArrDOM) {
        showSortedArr(arr);
        satisfiesSortOrderDOM(sortedArrDOM);
    }
    return;
}
