import { getArrSize, getMeasurement, measureSortStats, reinitInitArr, setConfigsDisplay, setCountdownDisplay, setFooterDisplay, setReducedFooterDisplay, setSortPlaygroundDisplay, setSortStatsDisplay } from "./configs.js";
import { shuffle } from "./utils/numerics.js";
import { startMergeSort } from "./sorts/merge/merge_handler.js";
import { AsymptoticNotations, Complexity, initSortLog, logArr, logTheoreticalComparisons, logTotalComparisons } from "./sorts/sort_logger.js";
import { SortType } from "./sorts/sort_types.js";
import { abortController, addEvent, initAbortController } from "./utils/time-event-handler.js";
import { startInsertionSort } from "./sorts/insertion/insertion_handler.js";
import { startSelectionSort } from "./sorts/selection/selection_handler.js";
import { startBubbleSort } from "./sorts/bubble/bubble_handler.js";
import { startQuickSort } from "./sorts/quick/quick_handler.js";
import { startHeapSort } from "./sorts/heap/heap_handler.js";
export const sleep = (ms, signal) => new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
        clearTimeout(id);
        reject(signal.reason ?? new DOMException('Human has completed sort sooner', 'AbortError'));
    }, { once: true });
});
export const drawCountdown = (cnt, sec) => cnt.innerHTML = `${sec}`;
export async function countdown(type, secs) {
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
    let asymptoticComplex;
    switch (type) {
        case SortType.MergeSort:
            await startMergeSort(arrInit);
            asymptoticComplex = new AsymptoticNotations(Complexity.nlogn, Complexity.nlogn, Complexity.nlogn);
            break;
        case SortType.InsertionSort:
            await startInsertionSort(arrInit);
            asymptoticComplex = new AsymptoticNotations(Complexity.n, Complexity.n2, Complexity.n2);
            break;
        case SortType.SelectionSort:
            await startSelectionSort(arrInit);
            asymptoticComplex = new AsymptoticNotations(Complexity.n2, Complexity.n2, Complexity.n2);
            break;
        case SortType.BubbleSort:
            await startBubbleSort(arrInit);
            asymptoticComplex = new AsymptoticNotations(Complexity.n, Complexity.n2, Complexity.n2);
            break;
        case SortType.QuickSort:
            await startQuickSort(arrInit);
            asymptoticComplex = new AsymptoticNotations(Complexity.nlogn, Complexity.nlogn, Complexity.n2);
            break;
        case SortType.HeapSort:
            await startHeapSort(arrInit);
            asymptoticComplex = new AsymptoticNotations(Complexity.nlogn, Complexity.nlogn, Complexity.nlogn);
            break;
    }
    addEvent('game_end');
    abortController.abort();
    setSortStatsDisplay('flex');
    setReducedFooterDisplay('grid');
    logTotalComparisons();
    logTheoreticalComparisons(arrInit.length, asymptoticComplex);
    logArr(arrInit);
    measureSortStats();
}
