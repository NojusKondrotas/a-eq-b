import { beep } from "../../utils/beep.ts";
import { swap } from "../../utils/numerics.ts";

function medianOfThree(arr: Array<number>, l: number, r: number) {
    const m = Math.floor(l + (r - l) / 2);
    const tmp = [{ idx: l, num: arr[l] }, { idx: m, num: arr[m] }, { idx: r, num: arr[r] }].sort((a, b) => a.num - b.num);
    return tmp[1];
}

async function quickSortPartition(arr: Array<number>, l: number, r: number, signal: AbortSignal): Promise<number> {
    if (signal.aborted) throw new DOMException('Human has completed sort sooner', 'AbortError');
    if (l >= r) return -1;

    const pivot = medianOfThree(arr, l, r);
    [arr[r], arr[pivot.idx]] = [arr[pivot.idx], arr[r]];
    let i = l;
    for (let j = l; j < r; ++j) {
        if (signal.aborted) throw new DOMException('Human has completed sort sooner', 'AbortError');

        if (arr[j] <= pivot.num) {
            if (signal.aborted) throw new DOMException('Human has completed sort sooner', 'AbortError');

            await beep(arr[i], signal);
            await beep(arr[j], signal);
            swap(arr, i, j);
            ++i;
        }
    }
    
    swap(arr, i, r);

    return i;
}

async function quickSortBot(arr: Array<number>, l: number, r: number, signal: AbortSignal) {
    if (signal.aborted) throw new DOMException('Human has completed sort sooner', 'AbortError');
    
    const idx = await quickSortPartition(arr, l, r, signal);
    if (idx == -1) return;
    await quickSortBot(arr, l, idx - 1, signal);
    await quickSortBot(arr, idx + 1, r, signal);
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