import { handleInsertionDrawing } from "../../minigames/merge_sort/draw.ts";
import { getSortedArrDOM, satisfiesSortOrderDOM } from "../../minigames/minigame_utils.ts";

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
    if (sortedArrDOM)
        satisfiesSortOrderDOM(sortedArrDOM);
    return;
}