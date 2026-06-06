import { handleMergeDrawing } from "../../minigames/merge_sort/draw.ts";
import { getSortedArrDOM, satisfiesSortOrderDOM } from "../../minigames/minigame_utils.ts";

async function mergeSortHuman(arr: Array<number>, l: number, r: number) {
    if (l >= r)
        return;

    let m = Math.floor(l + (r - l) / 2);
    await mergeSortHuman(arr, l, m);
    await mergeSortHuman(arr, m + 1, r);
    await mergeHuman(arr, l, m, r);
}

async function mergeHuman(arr: Array<number>, l: number, m: number, r: number) {
    await handleMergeDrawing(arr, l, m, r);
}

export async function startMergeSortHuman(arr: Array<number>): Promise<void> {
    await mergeSortHuman(arr, 0, arr.length - 1);
    const sortedArrDOM = getSortedArrDOM();
    if (sortedArrDOM)
        satisfiesSortOrderDOM(sortedArrDOM);
    return;
}