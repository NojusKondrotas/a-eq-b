import { beep } from "../../utils/beep.ts";

function medianOfThree(arr: Array<number>, l: number, r: number) {
    const m = Math.floor(l + (r - l) / 2);
    const tmp = [arr[l], arr[m], arr[r]].sort();
    return tmp[1];
}

async function quickSortBot(arr: Array<number>, l: number, r: number, signal: AbortSignal) {
    if (signal.aborted) return;
    if (l >= r) return;

    const pivot = medianOfThree(arr, l, r);
    let i = l, j = r;

    while (i < j) {
        if (signal.aborted) return;

        while (arr[i] < pivot) {
            if (signal.aborted) return;

            await beep(arr[i], signal);
            ++i;
        }
        while (arr[j] > pivot) {
            if (signal.aborted) return;

            await beep(arr[j], signal);
            --j;
        }
        
        if (i > j) break;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        ++i;
        --j;
    }

    await quickSortBot(arr, l, j, signal);
    await quickSortBot(arr, i, r, signal);
}

export async function startQuickSortBot(arr: Array<number>, signal: AbortSignal): Promise<void> {
    try {
        await quickSortBot(arr, 0, arr.length - 1, signal);
        console.log("Sorted bot:", arr);
    } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError")
            return;
        throw e;
    }
    return;
}