import { MergeRunner } from "../../minigames/runners/merge_sort.js";
import { abortController } from "../../utils/time-event-handler.js";
import { startSortHuman } from "../sort_runner.js";
import { startMergeSortBot } from "./merge_bot.js";
export async function startMergeSort(arrInit) {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();
    const promises = [startSortHuman(arrHuman, new MergeRunner()), startMergeSortBot(arrBot, abortController.signal)];
    return promises[0];
}
