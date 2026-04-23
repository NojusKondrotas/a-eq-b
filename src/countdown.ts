import { getArrSize } from "./configs.ts";
import { shuffle } from "./numerics.ts";
import { startMergeSort } from "./sorts/merge/merge_handler.ts";
import { AsymptoticNotations, Complexity, initSortLog, logArr, logTheoreticalComparisons, logTotalComparisons } from "./sorts/sort_logger.ts";
import { SortType } from "./sorts/sort_types.ts";

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const drawCountdown = (cnt: HTMLElement, sec: number) => cnt.innerHTML = `${sec}`;

export async function countdown(type: SortType, secs: number) {
    const configurations = document.getElementById('configurations');
    const startGame = document.getElementById('start-game');
    const guideText = document.getElementById('guide-text');
    const countdownCnt = document.getElementById('countdown-cnt');
    const countdownCntText = document.getElementById('countdown-cnt-text');
    const playground = document.getElementById('playground');

    const stats = document.getElementById('stats');
    const totalComps = document.getElementById('total-comps');
    const omega = document.getElementById('omega');
    const theta = document.getElementById('theta');
    const bigO = document.getElementById('bigo');
    const initArrDOM = document.getElementById('init-arr');

    if (!configurations || !startGame || !guideText || !countdownCnt || !countdownCntText || !playground
        || !stats || !totalComps || !omega || !theta || !bigO || !initArrDOM
    ) {
        window.location.href = "pages/error/error.html";
        return;
    }

    configurations.style.display = 'none';
    startGame.style.display = 'none';
    guideText.style.display = 'none';
    countdownCnt.style.display = 'flex';

    for (let i = secs; i > 0; --i) {
        drawCountdown(countdownCntText, i);
        await sleep(1000);
    }

    countdownCnt.style.display = 'none';
    playground.style.display = 'flex';

    const arrInit = Array.from(Array(getArrSize()).keys());
    shuffle(arrInit);
    initSortLog();

    switch (type) {
        case SortType.MergeSort:
            await startMergeSort(arrInit);
            break;
        case SortType.InsertionSort:
            break;
    }

    stats.style.display = 'flex';

    logTotalComparisons(totalComps);
    logTheoreticalComparisons(arrInit.length, new AsymptoticNotations(Complexity.nlogn, Complexity.nlogn, Complexity.nlogn),
        omega, theta, bigO
    );
    logArr(arrInit, initArrDOM);
}