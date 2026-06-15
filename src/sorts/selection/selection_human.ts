import { getSortedArrDOM, satisfiesSortOrderDOM } from "../../minigames/minigame_utils.ts";
import { handleSelectionDrawing } from "../../minigames/selection_sort/draw.ts";
import { showSortedArr } from "../sort_logger.ts";

async function selectionSortHuman(arr: Array<number>) {
    const length = arr.length;
    for (let i = 1; i < length; ++i) {
        let j = i - 1;
        await handleSelectionDrawing(arr, j);
    }
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