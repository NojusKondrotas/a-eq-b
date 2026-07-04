import { InsertionRunner } from "../../minigames/runners/insertion_sort.js";
import { abortController } from "../../utils/time-event-handler.js";
import { startSortHuman } from "../sort_runner.js";
import { startInsertionSortBot } from "./insertion_bot.js";
export async function startInsertionSort(arrInit) {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();
    const promises = [startSortHuman(arrHuman, new InsertionRunner()), startInsertionSortBot(arrBot, abortController.signal)];
    return promises[0];
}
