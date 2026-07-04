import { beep } from "../../utils/beep.ts";
import { swap } from "../../utils/numerics.ts";

async function bubbleSortBot(arr: Array<number>, signal: AbortSignal) {
    if (signal.aborted) throw new DOMException('Human has completed sort sooner', 'AbortError');

    const length = arr.length;
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 1; i < length; ++i) {
            if (signal.aborted) throw new DOMException('Human has completed sort sooner', 'AbortError');

            await beep(arr[i - 1], signal);
            if (arr[i - 1] > arr[i]) {
                swap(arr, i - 1, i);
                swapped = true;
            }
        }
    }
}

export async function startBubbleSortBot(arr: Array<number>, signal: AbortSignal): Promise<void> {
    try {
        await bubbleSortBot(arr, signal);
    } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError")
            return;
        throw e;
    }
    return;
}