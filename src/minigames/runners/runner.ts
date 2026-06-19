import { Model } from "../models/model.ts";

export interface Runner {
    run(arr: Array<number>): Promise<void>
}