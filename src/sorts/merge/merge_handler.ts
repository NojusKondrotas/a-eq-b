import { MergeRunner } from "../../minigames/runners/merge_sort.ts";
import { abortController } from "../../utils/time-event-handler.ts";
import { startSortHuman } from "../sort_runner.ts";
import { startMergeSortBot } from "./merge_bot.ts";

export async function startMergeSort(arrInit: Array<number>): Promise<void> {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();

    const promises = [startSortHuman(arrHuman, new MergeRunner()), startMergeSortBot(arrBot, abortController.signal)];
    return promises[0];
}