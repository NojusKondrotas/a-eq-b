import { Model } from "../models/model.ts";

export enum AlgorithmState {
    currentIter = 1,
    nextIter,
    terminate,
}

export interface Runner {
    run(arr: Array<number>): Promise<void>
}