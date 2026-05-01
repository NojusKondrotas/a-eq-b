import { getArrSize, getMeasurement, setConfigsDisplay, setCountdownDisplay, setSortPlaygroundDisplay, setSortStartsDisplay } from "./configs.ts";
import { initElementMeasurement, MeasureLine } from "./dom_measurer.ts";
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

    setConfigsDisplay('none');
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

    switch (type) {
        case SortType.MergeSort:
            await startMergeSort(arrInit);
            break;
        case SortType.InsertionSort:
            break;
    }

    setSortStartsDisplay('flex');

    logTotalComparisons(totalComps);
    logTheoreticalComparisons(arrInit.length, new AsymptoticNotations(Complexity.nlogn, Complexity.nlogn, Complexity.nlogn),
        omega, theta, bigO
    );
    logArr(arrInit, initArrDOM);

    const totalCompsMes = initElementMeasurement(totalComps, document.body, 0, 0, 0,
        [MeasureLine.Top, MeasureLine.Right, MeasureLine.Bottom, MeasureLine.Left]);
    const omegaMes = initElementMeasurement(omega, document.body, 0, 0, 0,
        [MeasureLine.Top, MeasureLine.Right, MeasureLine.Bottom, MeasureLine.Left]);
    const thetaMes = initElementMeasurement(theta, document.body, 0, 0, 0,
        [MeasureLine.Top, MeasureLine.Right, MeasureLine.Bottom, MeasureLine.Left]);
    const bigOMes = initElementMeasurement(bigO, document.body, 0, 0, 0,
        [MeasureLine.Top, MeasureLine.Right, MeasureLine.Bottom, MeasureLine.Left]);
    totalCompsMes.setDisplay('none');
    omegaMes.setDisplay('none');
    thetaMes.setDisplay('none');
    bigOMes.setDisplay('none');
}