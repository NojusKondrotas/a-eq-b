import { getSortedArrDOM, satisfiesSortOrderDOM } from "../../minigames/minigame_utils.ts";
import { SelectionRunner } from "../../minigames/runners/selection_sort.ts";
import { showSortedArr } from "../sort_logger.ts";

async function selectionSortHuman(arr: Array<number>) {
    const runner = new SelectionRunner();
    await runner.run(arr);
}

export async function startSelectionSortHuman(arr: Array<number>): Promise<void> {
    await selectionSortHuman(arr);
    const sortedArrDOM = getSortedArrDOM();
    if (sortedArrDOM) {
        showSortedArr(arr);
        satisfiesSortOrderDOM(sortedArrDOM);
    }
    return;
}