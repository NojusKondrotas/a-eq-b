export function shuffle(arr: Array<number>): void {
    for (let i = arr.length - 1; i > 0; --i) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

export function hash(str: string): string {
    let hash = 5381;
    for (let c of str) {
        hash = (((hash<<5)>>>0) + hash) + c.charCodeAt(0);
    }

    return hash.toString(16);
}

export function swap(arr: Array<number>, i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}