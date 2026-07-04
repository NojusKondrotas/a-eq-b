import { beep } from "../../utils/beep.js";
import { swap } from "../../utils/numerics.js";
async function bubbleSortBot(arr, signal) {
    if (signal.aborted)
        throw new DOMException('Human has completed sort sooner', 'AbortError');
    const length = arr.length;
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 1; i < length; ++i) {
            if (signal.aborted)
                throw new DOMException('Human has completed sort sooner', 'AbortError');
            if (arr[i - 1] > arr[i]) {
                swap(arr, i - 1, i);
                swapped = true;
                await beep(arr[i - 1], signal);
            }
        }
    }
}
export async function startBubbleSortBot(arr, signal) {
    try {
        await bubbleSortBot(arr, signal);
    }
    catch (e) {
        if (e instanceof DOMException && e.name === "AbortError")
            return;
        throw e;
    }
    return;
}
