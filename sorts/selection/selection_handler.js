import { SelectionRunner } from "../../minigames/runners/selection_sort.js";
import { abortController } from "../../utils/time-event-handler.js";
import { startSortHuman } from "../sort_runner.js";
import { startSelectionSortBot } from "./selection_bot.js";
export async function startSelectionSort(arrInit) {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();
    const promises = [startSortHuman(arrHuman, new SelectionRunner()), startSelectionSortBot(arrBot, abortController.signal)];
    return promises[0];
}
