import { shuffle } from "../../numerics.ts";
import { startMergeSortBot } from "./merge_bot.ts";
import { startMergeSortHuman } from "./merge_human.ts";

export async function startMergeSort(n: number) {
    const arrBot = Array.from(Array(n).keys());
    shuffle(arrBot);
    const arrHuman = arrBot.slice();
    return Promise.all([startMergeSortHuman(arrBot), startMergeSortBot(arrHuman)]);
}