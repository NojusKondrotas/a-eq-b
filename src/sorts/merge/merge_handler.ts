import { abortController } from "../../utils/time-event-handler.ts";
import { startMergeSortBot } from "./merge_bot.ts";
import { startMergeSortHuman } from "./merge_human.ts";

export async function startMergeSort(arrInit: Array<number>): Promise<void> {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();

    const promises = [startMergeSortHuman(arrHuman), startMergeSortBot(arrBot, abortController.signal)];
    return promises[0];
}