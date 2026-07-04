import { HeapRunner } from "../../minigames/runners/heap_sort.js";
import { abortController } from "../../utils/time-event-handler.js";
import { startSortHuman } from "../sort_runner.js";
import { startHeapSortBot } from "./heap_bot.js";
export async function startHeapSort(arrInit) {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();
    const promises = [startSortHuman(arrHuman, new HeapRunner()), startHeapSortBot(arrBot, abortController.signal)];
    return promises[0];
}
