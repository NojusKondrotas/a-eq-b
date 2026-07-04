import { calculateFreqDiff, getFreqDiff } from "./utils/beep.js";
import { ElMeasurementsHandler, initElementMeasurement, MeasureLine } from "./utils/dom_measurer.js";
import { deleteChildren, getSortedArrDOM } from "./minigames/minigame_utils.js";
import { startMinigame } from "./page_indexes/sort_index.js";
import { measureSSSPlacements } from "./minigames/utils/measurements/single_stream_separate.js";
import { measureDSCPlacements } from "./minigames/utils/measurements/double_stream_contiguous.js";
import { measureSSCPlacements } from "./minigames/utils/measurements/single_stream_contiguous.js";
let cfgMinFreqIn;
let cfgMaxFreqIn;
let cfgArrSizeIn;
let cfgComparisonLenIn;
let cfgMinFreqVal;
let cfgMaxFreqVal;
let cfgArrSizeVal;
let cfgComparisonLenVal;
let cfgFreqDiffVal;
let measurements;
export const getMeasurement = (idx) => measurements[idx] ?? ElMeasurementsHandler;
const setInnerText = (obj, text) => obj.innerText = text;
export function initConfigs() {
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
        const val = cfgMinFreqIn.value;
        setInnerText(cfgMinFreqVal, val);
        setInnerText(cfgFreqDiffVal, calculateFreqDiff().toString());
        sessionStorage.setItem('min_freq', val);
    });
    cfgMaxFreqIn.addEventListener('input', () => {
        const val = cfgMaxFreqIn.value;
        setInnerText(cfgMaxFreqVal, val);
        setInnerText(cfgFreqDiffVal, calculateFreqDiff().toString());
        sessionStorage.setItem('max_freq', val);
    });
    cfgArrSizeIn.addEventListener('input', () => {
        const val = cfgArrSizeIn.value;
        setInnerText(cfgArrSizeVal, val);
        setInnerText(cfgFreqDiffVal, calculateFreqDiff().toString());
        sessionStorage.setItem('arr_size', val);
    });
    cfgComparisonLenIn.addEventListener('input', () => {
        const val = cfgComparisonLenIn.value;
        setInnerText(cfgComparisonLenVal, val);
        sessionStorage.setItem('comparison_len', val);
    });
    if (!sessionStorage.getItem('min_freq')) {
        sessionStorage.setItem('min_freq', cfgMinFreqIn.value);
        sessionStorage.setItem('max_freq', cfgMaxFreqIn.value);
        sessionStorage.setItem('arr_size', cfgArrSizeIn.value);
        sessionStorage.setItem('comparison_len', cfgComparisonLenIn.value);
    }
    else {
        cfgMinFreqIn.value = sessionStorage.getItem('min_freq');
        cfgMaxFreqIn.value = sessionStorage.getItem('max_freq');
        cfgArrSizeIn.value = sessionStorage.getItem('arr_size');
        cfgComparisonLenIn.value = sessionStorage.getItem('comparison_len');
    }
    setInnerText(cfgMinFreqVal, cfgMinFreqIn.value);
    setInnerText(cfgMaxFreqVal, cfgMaxFreqIn.value);
    setInnerText(cfgArrSizeVal, cfgArrSizeIn.value);
    setInnerText(cfgComparisonLenVal, cfgComparisonLenIn.value);
    setInnerText(cfgFreqDiffVal, getFreqDiff().toString());
}
export const getMinFreq = () => parseInt(sessionStorage.getItem('min_freq'));
export const getMaxFreq = () => parseInt(sessionStorage.getItem('max_freq'));
export const getArrSize = () => parseInt(sessionStorage.getItem('arr_size'));
export const getComparisonLen = () => parseInt(sessionStorage.getItem('comparison_len'));
export function initEventListeners() {
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
export function initStartGameBtn() {
    const startGameBtn = document.getElementById('start-game-btn');
    if (!startGameBtn) {
        window.location.href = 'pages/error/error.html';
        return;
    }
    startGameBtn.addEventListener('click', async () => {
        await startMinigame();
    });
}
export function reinitInitArr() {
    const initArr = document.getElementById('init-arr');
    if (!initArr) {
        document.location.href = 'pages/error/error.html';
        return;
    }
    deleteChildren(initArr);
}
export function setConfigsDisplay(mode) {
    const configurations = document.getElementById('configurations');
    const guideText = document.getElementById('guide-text');
    const startGame = document.getElementById('start-game');
    if (!configurations || !guideText || !startGame) {
        document.location.href = 'pages/error/error.html';
        return;
    }
    configurations.style.display = mode;
    guideText.style.display = mode;
    startGame.style.display = mode;
}
export function setCountdownDisplay(mode) {
    const countdownCnt = document.getElementById('countdown-cnt');
    if (!countdownCnt) {
        document.location.href = 'pages/error/error.html';
        return;
    }
    countdownCnt.style.display = mode;
}
export function setSortPlaygroundDisplay(mode) {
    const playground = document.getElementById('playground');
    if (!playground) {
        document.location.href = 'pages/error/error.html';
        return;
    }
    playground.style.display = mode;
}
export function setSortStatsDisplay(mode) {
    const stats = document.getElementById('stats');
    if (!stats) {
        document.location.href = 'pages/error/error.html';
        return;
    }
    stats.style.display = mode;
}
export function setFooterDisplay(mode) {
    const footer = document.getElementById('footer');
    if (!footer) {
        document.location.href = 'pages/error/error.html';
        return;
    }
    footer.style.display = mode;
}
export function setReducedFooterDisplay(mode) {
    const footer = document.getElementById('reduced-footer');
    const stats = document.getElementById('stats');
    if (!footer || !stats) {
        document.location.href = 'pages/error/error.html';
        return;
    }
    const height = getComputedStyle(footer).height;
    stats.style.marginBottom = `calc(${height} + 1rem)`;
    footer.style.display = mode;
}
export function measureSortPlacements() {
    let loc_measurements = null;
    switch (sessionStorage.getItem('selected_sort')) {
        case 'merge':
            loc_measurements = measureDSCPlacements();
            break;
        case 'insertion':
        case 'selection':
        case 'quick':
        case 'heap':
            loc_measurements = measureSSSPlacements();
            break;
        case 'bubble':
            loc_measurements = measureSSCPlacements();
            break;
    }
    measurements = loc_measurements ?? [];
}
export function measureSortStats() {
    const totalComps = document.getElementById('total-comps');
    const omega = document.getElementById('omega');
    const theta = document.getElementById('theta');
    const bigO = document.getElementById('bigo');
    if (!totalComps || !omega || !theta || !bigO) {
        document.location.href = 'pages/error/error.html';
        return;
    }
    const totalCompsMes = initElementMeasurement(totalComps, document.body, 0, 0, 0, [MeasureLine.Top, MeasureLine.Right, MeasureLine.Bottom, MeasureLine.Left]);
    const omegaMes = initElementMeasurement(omega, document.body, 0, 0, 0, [MeasureLine.Top, MeasureLine.Right, MeasureLine.Bottom, MeasureLine.Left]);
    const thetaMes = initElementMeasurement(theta, document.body, 0, 0, 0, [MeasureLine.Top, MeasureLine.Right, MeasureLine.Bottom, MeasureLine.Left]);
    const bigOMes = initElementMeasurement(bigO, document.body, 0, 0, 0, [MeasureLine.Top, MeasureLine.Right, MeasureLine.Bottom, MeasureLine.Left]);
    totalCompsMes.setDisplay('none');
    omegaMes.setDisplay('none');
    thetaMes.setDisplay('none');
    bigOMes.setDisplay('none');
}
