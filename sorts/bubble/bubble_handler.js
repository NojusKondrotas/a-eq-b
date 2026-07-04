import { BubbleRunner } from "../../minigames/runners/bubble_sort.js";
import { abortController } from "../../utils/time-event-handler.js";
import { startSortHuman } from "../sort_runner.js";
import { startBubbleSortBot } from "./bubble_bot.js";
export async function startBubbleSort(arrInit) {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();
    const promises = [startSortHuman(arrHuman, new BubbleRunner()), startBubbleSortBot(arrBot, abortController.signal)];
    return promises[0];
}
