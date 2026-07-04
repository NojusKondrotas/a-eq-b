import { QuickRunner } from "../../minigames/runners/quick_sort.js";
import { abortController } from "../../utils/time-event-handler.js";
import { startSortHuman } from "../sort_runner.js";
import { startQuickSortBot } from "./quick_bot.js";
export async function startQuickSort(arrInit) {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();
    const promises = [startSortHuman(arrHuman, new QuickRunner()), startQuickSortBot(arrBot, abortController.signal)];
    return promises[0];
}
