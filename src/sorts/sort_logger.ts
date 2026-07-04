import { createOutputEl, getSortedArrDOM } from "../minigames/minigame_utils.ts";

export enum Complexity {
    logn = 'logn',
    n = 'n',
    nlogn = 'nlogn',
    n2 = 'n2'
}

export class AsymptoticNotations {
    Omega: Complexity
    Theta: Complexity
    BigO: Complexity

    constructor(omega: Complexity, theta: Complexity, bigO: Complexity) {
        this.Omega = omega;
        this.Theta = theta;
        this.BigO = bigO;
    }
}

let total_comparisons = 0;
export const getTotalComparisons = () => total_comparisons;

export function showSortedArr(arr: Array<number>) {
     const sortedArrDOM = getSortedArrDOM();
    if (!sortedArrDOM
        || sortedArrDOM.children.length > 0
    )
        return;
        
    for (const num of arr) {
        sortedArrDOM.appendChild(createOutputEl(num.toString()));
    }
}

export function calculateTheoreticalComparisons(n: number, complexity: Complexity): number {
    switch (complexity) {
        case Complexity.logn: return Math.log2(n);
        case Complexity.n: return n;
        case Complexity.nlogn: return n * Math.log2(n);
        case Complexity.n2: return n * n;
        default: return -1;
    }
}

export const initSortLog = () => total_comparisons = 0;
export const addComparisonLog = () => total_comparisons += 1;
export const logTotalComparisons = () => {
    const totalComps = document.getElementById('total-comps');
    if (!totalComps) {
        document.location.href = 'pages/error/error.html';
        return;
    }

    totalComps.textContent = `Total comparisons: ${total_comparisons}`;
}
export function logTheoreticalComparisons(n: number, complexities: AsymptoticNotations) {
    const omega = document.getElementById('omega');
    const theta = document.getElementById('theta');
    const bigO = document.getElementById('bigo');
    let tComparisonsOmega = calculateTheoreticalComparisons(n, complexities.Omega).toFixed(4);
    let tComparisonsTheta = calculateTheoreticalComparisons(n, complexities.Theta).toFixed(4);
    let tComparisonsBigO = calculateTheoreticalComparisons(n, complexities.BigO).toFixed(4);
    if (!omega || !theta || !bigO) {
        document.location.href = 'pages/error/error.html';
        return;
    }

    omega.textContent = `Ω(${complexities.Omega}): ${tComparisonsOmega}`;
    theta.textContent = `θ(${complexities.Theta}): ${tComparisonsTheta}`;
    bigO.textContent = `O(${complexities.BigO}): ${tComparisonsBigO}`;
}
export function logArr(arr: Array<number>) {
    const initArr = document.getElementById('init-arr');
    if (!initArr) {
        document.location.href = 'pages/error/error.html';
        return;
    }

    arr.forEach(val => {
        const outEl = createOutputEl(val.toString());
        initArr.appendChild(outEl);
    });
}