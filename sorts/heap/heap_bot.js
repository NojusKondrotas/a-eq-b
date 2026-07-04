import { beep } from "../../utils/beep.js";
import { swap } from "../../utils/numerics.js";
const getLeftIndex = (i) => i * 2 + 1;
const getRightIndex = (i) => i * 2 + 2;
function maxHeapify(arr, i, heapSize) {
    const left = getLeftIndex(i);
    const right = getRightIndex(i);
    let largest = i;
    if (left < heapSize && arr[left] > arr[largest])
        largest = left;
    if (right < heapSize && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != i) {
        swap(arr, i, largest);
        maxHeapify(arr, largest, heapSize);
    }
}
function buildMaxHeap(arr) {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; --i) {
        maxHeapify(arr, i, arr.length);
    }
}
async function maxHeapifyGame(arr, i, heapSize, signal) {
    if (signal.aborted)
        throw new DOMException('Human has completed sort sooner', 'AbortError');
    const left = getLeftIndex(i);
    const right = getRightIndex(i);
    let largest = i;
    if (left < heapSize)
        await beep(arr[left], signal);
    if (arr[left] > arr[largest])
        largest = left;
    if (right < heapSize) {
        await beep(arr[right], signal);
        if (arr[right] > arr[largest])
            largest = right;
    }
    if (largest != i) {
        swap(arr, i, largest);
        await maxHeapifyGame(arr, largest, heapSize, signal);
    }
}
async function heapSortBot(arr, signal) {
    if (signal.aborted)
        throw new DOMException('Human has completed sort sooner', 'AbortError');
    buildMaxHeap(arr);
    let heapSize = arr.length - 1;
    for (; heapSize >= 1; --heapSize) {
        if (signal.aborted)
            throw new DOMException('Human has completed sort sooner', 'AbortError');
        swap(arr, 0, heapSize);
        await maxHeapifyGame(arr, 0, heapSize, signal);
    }
}
export async function startHeapSortBot(arr, signal) {
    try {
        await heapSortBot(arr, signal);
        console.log("Sorted bot:", arr);
    }
    catch (e) {
        if (e instanceof DOMException && e.name === "AbortError")
            return;
        throw e;
    }
    return;
}
