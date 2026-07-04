import { beep } from "../../utils/beep.js";
import { swap } from "../../utils/numerics.js";
function medianOfThree(arr, l, r) {
    const m = Math.floor(l + (r - l) / 2);
    const tmp = [{ idx: l, num: arr[l] }, { idx: m, num: arr[m] }, { idx: r, num: arr[r] }].sort((a, b) => a.num - b.num);
    return tmp[1];
}
async function quickSortPartition(arr, l, r, signal) {
    if (signal.aborted)
        throw new DOMException('Human has completed sort sooner', 'AbortError');
    if (l >= r)
        return -1;
    const pivot = medianOfThree(arr, l, r);
    [arr[r], arr[pivot.idx]] = [arr[pivot.idx], arr[r]];
    let i = l;
    for (let j = l; j < r; ++j) {
        if (signal.aborted)
            throw new DOMException('Human has completed sort sooner', 'AbortError');
        await beep(arr[j], signal);
        if (arr[j] <= pivot.num) {
            if (signal.aborted)
                throw new DOMException('Human has completed sort sooner', 'AbortError');
            swap(arr, i, j);
            ++i;
        }
    }
    swap(arr, i, r);
    return i;
}
async function quickSortBot(arr, l, r, signal) {
    if (signal.aborted)
        throw new DOMException('Human has completed sort sooner', 'AbortError');
    const idx = await quickSortPartition(arr, l, r, signal);
    if (idx == -1)
        return;
    await quickSortBot(arr, l, idx - 1, signal);
    await quickSortBot(arr, idx + 1, r, signal);
}
export async function startQuickSortBot(arr, signal) {
    try {
        await quickSortBot(arr, 0, arr.length - 1, signal);
        console.log("Sorted bot:", arr);
    }
    catch (e) {
        if (e instanceof DOMException && e.name === "AbortError")
            return;
        throw e;
    }
    return;
}
