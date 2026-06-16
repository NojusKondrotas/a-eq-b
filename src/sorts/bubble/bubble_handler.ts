import { abortController } from "../../utils/time-event-handler.ts";
import { startBubbleSortBot } from "./bubble_bot.ts";
import { startBubbleSortHuman } from "./bubble_human.ts";

export async function startBubbleSort(arrInit: Array<number>): Promise<void> {
    const arrBot = arrInit.slice();
    const arrHuman = arrInit.slice();

    const promises = [startBubbleSortHuman(arrHuman), startBubbleSortBot(arrBot, abortController.signal)];
    return promises[0];
}