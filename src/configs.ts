import { calculateFreqDiff, getFreqDiff } from "./beep.ts";
import { ElMeasurementsHandler } from "./dom_measurer.ts";
import { measureMergeSortPlacements } from "./minigames/merge_sort/measure.ts";
import { getSortedArrDOM } from "./minigames/minigame_utils.ts";
import { startMinigame } from "./page_indexes/sort_index.ts";

let cfgMinFreqIn: HTMLElement | null;
let cfgMaxFreqIn: HTMLElement | null;
let cfgArrSizeIn: HTMLElement | null;
let cfgComparisonLenIn: HTMLElement | null;

let cfgMinFreqVal: HTMLElement | null;
let cfgMaxFreqVal: HTMLElement | null;
let cfgArrSizeVal: HTMLElement | null;
let cfgComparisonLenVal: HTMLElement | null;
let cfgFreqDiffVal: HTMLElement | null;

let measurements: Array<ElMeasurementsHandler>;
export const getMeasurement = (idx: number) => measurements[idx] ?? ElMeasurementsHandler;

const setInnerText = (obj: HTMLElement, text: string) => obj.innerText = text;

export function initConfigs(): void {
    cfgMinFreqIn = document.getElementById('min-freq-input');
    cfgMaxFreqIn = document.getElementById('max-freq-input');
    cfgArrSizeIn = document.getElementById('arr-size-input');
    cfgComparisonLenIn = document.getElementById('comparison-len-input');

    cfgMinFreqVal = document.getElementById('min-freq-val');
    cfgMaxFreqVal = document.getElementById('max-freq-val');
    cfgArrSizeVal = document.getElementById('arr-size-val');
    cfgComparisonLenVal = document.getElementById('comparison-len-val');
    cfgFreqDiffVal = document.getElementById('freq-diff-val');

    if (!cfgMinFreqIn || !cfgMaxFreqIn || !cfgArrSizeIn || !cfgComparisonLenIn
        || !cfgMinFreqVal || !cfgMaxFreqVal || !cfgArrSizeVal || !cfgComparisonLenVal || !cfgFreqDiffVal) {
        window.location.href = "pages/error/error.html";
        return;
    }

    cfgMinFreqIn.addEventListener('input', () => {
        const val = (cfgMinFreqIn as HTMLInputElement).value;
        setInnerText(cfgMinFreqVal as HTMLElement, val);
        setInnerText(cfgFreqDiffVal as HTMLElement, calculateFreqDiff().toString());
        sessionStorage.setItem('min_freq', val);
    });
    cfgMaxFreqIn.addEventListener('input', () => {
        const val = (cfgMaxFreqIn as HTMLInputElement).value;
        setInnerText(cfgMaxFreqVal as HTMLElement, val);
        setInnerText(cfgFreqDiffVal as HTMLElement, calculateFreqDiff().toString());
        sessionStorage.setItem('max_freq', val);
    });
    cfgArrSizeIn.addEventListener('input', () => {
        const val = (cfgArrSizeIn as HTMLInputElement).value;
        setInnerText(cfgArrSizeVal as HTMLElement, val);
        setInnerText(cfgFreqDiffVal as HTMLElement, calculateFreqDiff().toString());
        sessionStorage.setItem('arr_size', val);
    });
    cfgComparisonLenIn.addEventListener('input', () => {
        const val = (cfgComparisonLenIn as HTMLInputElement).value;
        setInnerText(cfgComparisonLenVal as HTMLElement, val);
        sessionStorage.setItem('comparison_len', val);
    });

    if (!sessionStorage.getItem('min_freq')) {
        sessionStorage.setItem('min_freq', (cfgMinFreqIn as HTMLInputElement).value);
        sessionStorage.setItem('max_freq', (cfgMaxFreqIn as HTMLInputElement).value);
        sessionStorage.setItem('arr_size', (cfgArrSizeIn as HTMLInputElement).value);
        sessionStorage.setItem('comparison_len', (cfgComparisonLenIn as HTMLInputElement).value);
    } else {
        (cfgMinFreqIn as HTMLInputElement).value = sessionStorage.getItem('min_freq') as string;
        (cfgMaxFreqIn as HTMLInputElement).value = sessionStorage.getItem('max_freq') as string;
        (cfgArrSizeIn as HTMLInputElement).value = sessionStorage.getItem('arr_size') as string;
        (cfgComparisonLenIn as HTMLInputElement).value = sessionStorage.getItem('comparison_len') as string;
    }

    setInnerText(cfgMinFreqVal, (cfgMinFreqIn as HTMLInputElement).value);
    setInnerText(cfgMaxFreqVal, (cfgMaxFreqIn as HTMLInputElement).value);
    setInnerText(cfgArrSizeVal, (cfgArrSizeIn as HTMLInputElement).value);
    setInnerText(cfgComparisonLenVal, (cfgComparisonLenIn as HTMLInputElement).value);
    setInnerText(cfgFreqDiffVal, getFreqDiff().toString());
}

export const getMinFreq = () => parseInt(sessionStorage.getItem('min_freq') as string);
export const getMaxFreq = () => parseInt(sessionStorage.getItem('max_freq') as string);
export const getArrSize = () => parseInt(sessionStorage.getItem('arr_size') as string);
export const getComparisonLen = () => parseInt(sessionStorage.getItem('comparison_len') as string);

export function initEventListeners(): void {
    const arr = getSortedArrDOM();
    const arrInit = document.getElementById('init-arr');
    if (!arr || !arrInit) {
        window.location.href = 'pages/error/error.html';
        return;
    }

    window.addEventListener('wheel', (ev) => {
        const leftOffset = arr.offsetLeft;
        if (ev.deltaY > 0) {
            arr.style.left = `${leftOffset - 64}px`;
            arrInit.style.left = `${leftOffset - 64}px`;
        }
        else {
            arr.style.left = `${leftOffset + 64}px`;
            arrInit.style.left = `${leftOffset + 64}px`;
        }
    });
}

export function initStartGameBtn(): void {
    const startGameBtn = document.getElementById('start-game-btn');

    if (!startGameBtn) {
        window.location.href = 'pages/error/error.html';
        return;
    }

    startGameBtn.addEventListener('click', async () => {
        await startMinigame();
    });
}

export function setConfigsDisplay(mode: string) {
    const configurations = document.getElementById('configurations')!;
    const guideText = document.getElementById('guide-text')!;
    const startGame = document.getElementById('start-game')!;

    configurations.style.display = mode;
    guideText.style.display = mode;
    startGame.style.display = mode;
}

export function setCountdownDisplay(mode: string) {
    const countdownCnt = document.getElementById('countdown-cnt')!;

    countdownCnt.style.display = mode;
}

export function setSortPlaygroundDisplay(mode: string) {
    const playground = document.getElementById('playground')!;

    playground.style.display = mode;
}

export function setSortStatsDisplay(mode: string) {
    const stats = document.getElementById('stats')!;

    stats.style.display = mode;
}

export function positionStats(footer: HTMLElement, initArr: HTMLElement): void {
    const height = getComputedStyle(footer).height;
    initArr.style.marginBottom = `calc(${height} + 1rem)`;
}

export function setFooterDisplay(mode: string) {
    const footer = document.getElementById('footer')!;

    footer.style.display = mode;
}

export function setReducedFooterDisplay(mode: string) {
    const footer = document.getElementById('reduced-footer')!;

    footer.style.display = mode;
}

export function measureSortPlacements(): void {
    let loc_measurements: Array<ElMeasurementsHandler> | null = null;
    switch (sessionStorage.getItem('selected_sort')) {
        case 'merge':
            loc_measurements = measureMergeSortPlacements();
            break;
    }

    measurements = loc_measurements ?? [];
}