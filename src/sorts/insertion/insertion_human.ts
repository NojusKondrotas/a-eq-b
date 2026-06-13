import { handleInsertionDrawing } from "../../minigames/insertion_sort/draw.ts";
import { getSortedArrDOM, satisfiesSortOrderDOM } from "../../minigames/minigame_utils.ts";
import { showSortedArr } from "../sort_logger.ts";

async function insertionSortHuman(arr: Array<number>) {
    const length = arr.length;
    for (let i = 1; i < length; ++i) {
        let j = i - 1;
        await handleInsertionDrawing(arr, j);
    }
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