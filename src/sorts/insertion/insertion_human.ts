import { getSortedArrDOM, satisfiesSortOrderDOM } from "../../minigames/minigame_utils.ts";
import { InsertionRunner } from "../../minigames/runners/insertion_sort.ts";
import { showSortedArr } from "../sort_logger.ts";

async function insertionSortHuman(arr: Array<number>) {
    const runner = new InsertionRunner();
    await runner.run(arr);
}

export async function startInsertionSortHuman(arr: Array<number>): Promise<void> {
    await insertionSortHuman(arr);
    const sortedArrDOM = getSortedArrDOM();
    if (sortedArrDOM) {
        showSortedArr(arr);
        satisfiesSortOrderDOM(sortedArrDOM);
    }
    return;
}