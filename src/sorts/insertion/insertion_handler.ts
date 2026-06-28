import { InsertionRunner } from "../../minigames/runners/insertion_sort.ts";
import { abortController } from "../../utils/time-event-handler.ts";
import { startSortHuman } from "../sort_runner.ts";
import { startInsertionSortBot } from "./insertion_bot.ts";

export async function startInsertionSort(arrInit: Array<number>): Promise<void> {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();

    const promises = [startSortHuman(arrHuman, new InsertionRunner()), startInsertionSortBot(arrBot, abortController.signal)];
    return promises[0];
}