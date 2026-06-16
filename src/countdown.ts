import { getArrSize, getMeasurement, measureSortStats, reinitInitArr, setConfigsDisplay, setCountdownDisplay, setFooterDisplay, setReducedFooterDisplay, setSortPlaygroundDisplay, setSortStatsDisplay } from "./configs.ts";
import { shuffle } from "./utils/numerics.ts";
import { startMergeSort } from "./sorts/merge/merge_handler.ts";
import { AsymptoticNotations, Complexity, initSortLog, logArr, logTheoreticalComparisons, logTotalComparisons } from "./sorts/sort_logger.ts";
import { SortType } from "./sorts/sort_types.ts";
import { initAbortController } from "./utils/time-event-handler.ts";
import { startInsertionSort } from "./sorts/insertion/insertion_handler.ts";
import { startSelectionSort } from "./sorts/selection/selection_handler.ts";
import { startBubbleSort } from "./sorts/bubble/bubble_handler.ts";

export const sleep = (ms: number, signal?: AbortSignal): Promise<void> =>
    new Promise((resolve, reject) => {
        const id = setTimeout(resolve, ms);

        signal?.addEventListener('abort', () => {
            clearTimeout(id);
            reject(signal.reason ?? new DOMException('Human has completed sort sooner', 'AbortSignal'));
        }, { once: true });
    });

export const drawCountdown = (cnt: HTMLElement, sec: number) => cnt.innerHTML = `${sec}`;

export async function countdown(type: SortType, secs: number) {
    const countdownCntText = document.getElementById('countdown-cnt-text');

    if (!countdownCntText) {
        window.location.href = "pages/error/error.html";
        return;
    }

    reinitInitArr();

    setConfigsDisplay('none');
    setFooterDisplay('none');
    setCountdownDisplay('flex');

    for (let i = secs; i > 0; --i) {
        drawCountdown(countdownCntText, i);
        const mes1 = getMeasurement(i * 2 - 1);
        const mes2 = getMeasurement(i * 2 - 2);
        mes1.setDisplay('');
        mes2.setDisplay('');
        if (i == 1) {
            for (let j = 0; j < 4; ++j)
                getMeasurement(i * 2 + j).setDisplay('none');
        }
        await sleep(1000);
    }

    getMeasurement(0).setDisplay('none');
    getMeasurement(1).setDisplay('none');

    setCountdownDisplay('none');
    setSortPlaygroundDisplay('flex');

    const arrInit = Array.from(Array(getArrSize()).keys());
    shuffle(arrInit);
    initSortLog();
    initAbortController();

    switch (type) {
        case SortType.MergeSort:
            await startMergeSort(arrInit);
            break;
        case SortType.InsertionSort:
            await startInsertionSort(arrInit);
            break;
        case SortType.SelectionSort:
            await startSelectionSort(arrInit);
            break;
        case SortType.BubbleSort:
            await startBubbleSort(arrInit);
            break;
    }

    setSortStatsDisplay('flex');
    setReducedFooterDisplay('grid');

    logTotalComparisons();
    logTheoreticalComparisons(arrInit.length, new AsymptoticNotations(Complexity.nlogn, Complexity.nlogn, Complexity.nlogn));
    logArr(arrInit);

    measureSortStats();
}