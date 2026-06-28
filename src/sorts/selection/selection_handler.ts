import { SelectionRunner } from "../../minigames/runners/selection_sort.ts";
import { abortController } from "../../utils/time-event-handler.ts";
import { startSortHuman } from "../sort_runner.ts";
import { startSelectionSortBot } from "./selection_bot.ts";

export async function startSelectionSort(arrInit: Array<number>): Promise<void> {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();

    const promises = [startSortHuman(arrHuman, new SelectionRunner()), startSelectionSortBot(arrBot, abortController.signal)];
    return promises[0];
}