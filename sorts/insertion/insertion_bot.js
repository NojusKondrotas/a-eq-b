import { beep } from "../../utils/beep.js";
async function insertionSortBot(arr, signal) {
    if (signal.aborted)
        throw new DOMException('Human has completed sort sooner', 'AbortError');
    const length = arr.length;
    for (let i = 1; i < length; ++i) {
        if (signal.aborted)
            throw new DOMException('Human has completed sort sooner', 'AbortError');
        let key = arr[i];
        let j = i - 1;
        for (; j >= 0 && arr[j] > key; --j) {
            if (signal.aborted)
                throw new DOMException('Human has completed sort sooner', 'AbortError');
            arr[j + 1] = arr[j];
            await beep(arr[j], signal);
        }
        arr[j + 1] = arr[i];
    }
}
export async function startInsertionSortBot(arr, signal) {
    try {
        await insertionSortBot(arr, signal);
    }
    catch (e) {
        if (e instanceof DOMException && e.name === "AbortError")
            return;
        throw e;
    }
    return;
}
