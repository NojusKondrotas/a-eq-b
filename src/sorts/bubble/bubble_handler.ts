import { BubbleRunner } from "../../minigames/runners/bubble_sort.ts";
import { abortController } from "../../utils/time-event-handler.ts";
import { startSortHuman } from "../sort_runner.ts";
import { startBubbleSortBot } from "./bubble_bot.ts";

export async function startBubbleSort(arrInit: Array<number>): Promise<void> {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();

    const promises = [startSortHuman(arrHuman, new BubbleRunner()), startBubbleSortBot(arrBot, abortController.signal)];
    return promises[0];
}