import { abortController } from "../../utils/time-event-handler.ts";
import { startInsertionSortBot } from "./insertion_bot.ts";
import { startInsertionSortHuman } from "./insertion_human.ts";

export async function startInsertionSort(arrInit: Array<number>): Promise<void> {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();

    const promises = [startInsertionSortHuman(arrHuman), startInsertionSortBot(arrBot, abortController.signal)];
    return promises[0];
}