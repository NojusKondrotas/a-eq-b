import { beep } from "../../utils/beep.ts";

async function bubbleSortBot(arr: Array<number>, signal: AbortSignal) {
    if (signal.aborted) return;

    const length = arr.length;
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 1; i < length; ++i) {
            if (signal.aborted)
                return;

            if (arr[i - 1] > arr[i]) {
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                swapped = true;
                await beep(arr[i - 1], signal);
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