import { QuickRunner } from "../../minigames/runners/quick_sort.ts";
import { abortController } from "../../utils/time-event-handler.ts";
import { startSortHuman } from "../sort_runner.ts";
import { startQuickSortBot } from "./quick_bot.ts";

export async function startQuickSort(arrInit: Array<number>): Promise<void> {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();

    const promises = [startSortHuman(arrHuman, new QuickRunner()), startQuickSortBot(arrBot, abortController.signal)];
    return promises[0];
}