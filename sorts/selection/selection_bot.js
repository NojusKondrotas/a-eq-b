import { beep } from "../../utils/beep.js";
import { swap } from "../../utils/numerics.js";
async function selectionSortBot(arr, signal) {
    if (signal.aborted)
        throw new DOMException('Human has completed sort sooner', 'AbortError');
    const length = arr.length;
    for (let i = 0; i < length - 1; ++i) {
        if (signal.aborted)
            throw new DOMException('Human has completed sort sooner', 'AbortError');
        let min_idx = i;
        let j = i + 1;
        for (; j < length; ++j) {
            if (signal.aborted)
                throw new DOMException('Human has completed sort sooner', 'AbortError');
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
            await beep(arr[j], signal);
        }
        swap(arr, i, min_idx);
    }
}
export async function startSelectionSortBot(arr, signal) {
    try {
        await selectionSortBot(arr, signal);
    }
    catch (e) {
        if (e instanceof DOMException && e.name === "AbortError")
            return;
        throw e;
    }
    return;
}
