import { abortController } from "../../utils/time-event-handler.ts";
import { startSelectionSortBot } from "./selection_bot.ts";
import { startSelectionSortHuman } from "./selection_human.ts";

export async function startSelectionSort(arrInit: Array<number>): Promise<void> {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();

    const promises = [startSelectionSortHuman(arrHuman), startSelectionSortBot(arrBot, abortController.signal)];
    return promises[0];
}