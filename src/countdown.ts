import { getArrSize } from "./configs.ts";
import { startMergeSort } from "./sorts/merge/merge_handler.ts";
import { SortType } from "./sorts/sort_types.ts";

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const drawCountdown = (cnt: HTMLElement, sec: number) => cnt.innerHTML = `${sec}`;

export async function countdown(type: SortType, secs: number) {
    const configurations = document.getElementById('configurations');
    const startGame = document.getElementById('start-game');
    const countdownCnt = document.getElementById('countdown-cnt');
    const countdownCntText = document.getElementById('countdown-cnt-text');
    const playground = document.getElementById('playground');
    if (!configurations || !startGame || !countdownCnt || !countdownCntText || !playground)
        window.location.href = "pages/error/error.html";

    (configurations as HTMLElement).style.display = 'none';
    (startGame as HTMLElement).style.display = 'none';
    (countdownCnt as HTMLElement).style.display = 'flex';

    for (let i = secs; i > 0; --i) {
        drawCountdown(countdownCntText as HTMLElement, i);
        await sleep(1000);
    }

    (countdownCnt as HTMLElement).style.display = 'none';
    (playground as HTMLElement).style.display = 'flex';

    switch (type) {
        case SortType.MergeSort:
            await startMergeSort(getArrSize());
            break;
        case SortType.InsertionSort:
            break;
    }
}