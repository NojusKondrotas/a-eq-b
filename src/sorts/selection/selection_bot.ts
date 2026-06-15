import { beep } from "../../utils/beep.ts";

async function selectionSortBot(arr: Array<number>, signal: AbortSignal) {
    if (signal.aborted) return;

    const length = arr.length;
    for (let i = 0; i < length - 1; ++i) {
        if (signal.aborted)
            return;

        let min_idx = i;
        let j = i + 1;
        for (; j < length; ++j) {
            if (signal.aborted)
                return;

            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
            await beep(arr[j], signal);
        }

        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
    }
}

export async function startSelectionSortBot(arr: Array<number>, signal: AbortSignal): Promise<void> {
    try {
        await selectionSortBot(arr, signal);
    } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError")
            return;
        throw e;
    }
    return;
}