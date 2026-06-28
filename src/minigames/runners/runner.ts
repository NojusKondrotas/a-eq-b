export enum AlgorithmState {
    currentIter = 1,
    nextIter,
    terminate,
}

export interface Runner {
    run(arr: Array<number>): Promise<void>
}