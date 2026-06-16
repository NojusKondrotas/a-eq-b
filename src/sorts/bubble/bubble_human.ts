import { handleBubbleDrawing } from "../../minigames/bubble/draw.ts";
import { getSortedArrDOM, satisfiesSortOrderDOM } from "../../minigames/minigame_utils.ts";
import { showSortedArr } from "../sort_logger.ts";

async function bubbleSortHuman(arr: Array<number>) {
    let state = { swapped: true };
    while (state.swapped) {
        state.swapped = false;
        await handleBubbleDrawing(arr, state);
    }
}

export async function startBubbleSortHuman(arr: Array<number>): Promise<void> {
    await bubbleSortHuman(arr);
    const sortedArrDOM = getSortedArrDOM();
    if (sortedArrDOM) {
        showSortedArr(arr);
        satisfiesSortOrderDOM(sortedArrDOM);
    }
    return;
}