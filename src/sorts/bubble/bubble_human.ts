import { getSortedArrDOM, satisfiesSortOrderDOM } from "../../minigames/minigame_utils.ts";
import { BubbleRunner } from "../../minigames/runners/bubble_sort.ts";
import { showSortedArr } from "../sort_logger.ts";

async function bubbleSortHuman(arr: Array<number>) {
    const runner = new BubbleRunner();
    await runner.run(arr);
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