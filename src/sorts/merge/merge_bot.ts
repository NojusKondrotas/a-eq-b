import { beep } from "../../beep.ts";

async function mergeSortBot(arr: Array<number>, l: number, r: number) {
    if (l >= r)
        return;
    
    let m = Math.floor(l + (r - l) / 2);
    await mergeSortBot(arr, l, m);
    await mergeSortBot(arr, m + 1, r);
    await mergeBot(arr, l, m, r);
}

async function mergeBot(arr: Array<number>, l: number, m: number, r: number) {
    let left = arr.slice(l, m+1);
    let right = arr.slice(m+1, r+1);

    let i = 0, j = 0;
    let w = l;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[w] = left[i];
            await beep(left[i]);
            i += 1;
        } else {
            arr[w] = right[j];
            await beep(right[j]);
            j += 1;
        }

        w += 1;
    }

    while (i < left.length) {
        arr[w] = left[i];
        await beep(left[i]);
        w += 1;
        i += 1;
    }
    while (j < right.length) {
        arr[w] = right[j];
        await beep(right[j]);
        w += 1;
        j += 1;
    }
}

export async function startMergeSortBot(arr: Array<number>): Promise<void> {
    await mergeSortBot(arr, 0, arr.length - 1);
    console.log("Sorted bot:", arr);
    return;
}