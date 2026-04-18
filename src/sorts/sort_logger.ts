export enum Complexity {
    logn,
    n,
    nlogn,
    n2
}

let total_comparisons = 0;
export const getTotalComparisons = () => total_comparisons;

export const initSortLog = () => total_comparisons = 0;
export const addComparisonLog = () => total_comparisons += 1;
export const logTotalComparisons = () => console.log("Total comparisons:", total_comparisons);
export function logTheoreticalComparisons(n: number, complexity: Complexity) {
    let theoreticalCompares = 0;
    let complexityStr = "";
    switch (complexity) {
        case Complexity.logn:
            complexityStr = 'logn';
            theoreticalCompares = Math.log2(n);
            break;
        case Complexity.n:
            complexityStr = 'n';
            theoreticalCompares = n;
            break;
        case Complexity.nlogn:
            complexityStr = 'nlogn';
            theoreticalCompares = n * Math.log2(n);
            break;
        case Complexity.n2:
            complexityStr = 'n2';
            theoreticalCompares = n * n;
            break;
        default:
            return;
    }

    console.log(complexityStr, "=", theoreticalCompares);
}