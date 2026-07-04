import { HeapRunner } from "../../minigames/runners/heap_sort.ts";
import { abortController } from "../../utils/time-event-handler.ts";
import { startSortHuman } from "../sort_runner.ts";
import { startHeapSortBot } from "./heap_bot.ts";

export async function startHeapSort(arrInit: Array<number>): Promise<void> {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();

    const promises = [startSortHuman(arrHuman, new HeapRunner()), startHeapSortBot(arrBot, abortController.signal)];
    return promises[0];
}