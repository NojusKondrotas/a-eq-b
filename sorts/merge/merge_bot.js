import { beep } from "../../utils/beep.js";
async function mergeSortBot(arr, l, r, signal) {
    if (signal.aborted)
        throw new DOMException('Human has completed sort sooner', 'AbortError');
    if (l >= r)
        return;
    let m = Math.floor(l + (r - l) / 2);
    await mergeSortBot(arr, l, m, signal);
    await mergeSortBot(arr, m + 1, r, signal);
    await mergeBot(arr, l, m, r, signal);
}
async function mergeBot(arr, l, m, r, signal) {
    if (signal.aborted)
        throw new DOMException('Human has completed sort sooner', 'AbortError');
    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0;
    let w = l;
    while (i < left.length && j < right.length) {
        if (signal.aborted)
            throw new DOMException('Human has completed sort sooner', 'AbortError');
        if (left[i] <= right[j]) {
            arr[w] = left[i];
            await beep(left[i], signal);
            i += 1;
        }
        else {
            arr[w] = right[j];
            await beep(right[j], signal);
            j += 1;
        }
        w += 1;
    }
    while (i < left.length) {
        if (signal.aborted)
            throw new DOMException('Human has completed sort sooner', 'AbortError');
        arr[w] = left[i];
        await beep(left[i], signal);
        w += 1;
        i += 1;
    }
    while (j < right.length) {
        if (signal.aborted)
            throw new DOMException('Human has completed sort sooner', 'AbortError');
        arr[w] = right[j];
        await beep(right[j], signal);
        w += 1;
        j += 1;
    }
}
export async function startMergeSortBot(arr, signal) {
    try {
        await mergeSortBot(arr, 0, arr.length - 1, signal);
        console.log("Sorted bot:", arr);
    }
    catch (e) {
        if (e instanceof DOMException && e.name === "AbortError")
            return;
        throw e;
    }
    return;
}
