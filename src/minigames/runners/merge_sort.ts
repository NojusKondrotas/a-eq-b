import { addComparisonLog } from "../../sorts/sort_logger.ts";
import { Queue } from "../../utils/queue.ts";
import { createInputGradualEl, createInputImmediateEl, createOutputEl, deleteChildren } from "../minigame_utils.ts";
import { DSCModel } from "../models/double_stream_contiguous.ts";
import { AlgorithmState, Runner } from "./runner.ts";

class Partition {
    l: number
    m: number
    r: number

    constructor(l: number, m: number, r: number) {
        this.l = l;
        this.m = m;
        this.r = r;
    }
}

export class MergeRunner implements Runner {
    model: DSCModel | null = null;
    partitions: Queue<Partition> | null = null;

    removeFromInput(arrDOM: HTMLElement) {
        if (arrDOM.firstChild)
            arrDOM.removeChild(arrDOM.firstChild);
    }

    moveLeft(model: DSCModel, checkDone: () => AlgorithmState) {
        const val = parseInt(model.leftCurrDOM.textContent);
        const outEl = createOutputEl(val.toString());
        model.arr[model.i++] = val;
        model.sortedArrDOM.appendChild(outEl);

        deleteChildren(model.leftCurrDOM);
        if (model.leftDOM.firstChild) {
            const newVal = model.leftDOM.firstChild.textContent;
            const btn = createInputImmediateEl('button', newVal!);
            this.initLeftImmListeners(btn, model, checkDone);
            model.leftCurrDOM.appendChild(btn);
            this.removeFromInput(model.leftDOM);
        }

        checkDone();
    }

    moveRight(model: DSCModel, checkDone: () => AlgorithmState) {
        const val = parseInt(model.rightCurrDOM.textContent);
        const outEl = createOutputEl(val.toString());
        model.arr[model.i++] = val;
        model.sortedArrDOM.appendChild(outEl);

        deleteChildren(model.rightCurrDOM);
        if (model.rightDOM.firstChild) {
            const newVal = model.rightDOM.firstChild.textContent;
            const btn = createInputImmediateEl('button', newVal!);
            this.initRightImmListeners(btn, model, checkDone);
            model.rightCurrDOM.appendChild(btn);
            this.removeFromInput(model.rightDOM);
        }

        checkDone();
    }

    initLeftImmListeners(el: HTMLElement, model: DSCModel, checkDone: () => AlgorithmState) {
        el.addEventListener('mousedown', () => {
            this.moveLeft(model, checkDone);
            addComparisonLog();
        })
    }

    initRightImmListeners(el: HTMLElement, model: DSCModel, checkDone: () => AlgorithmState) {
        el.addEventListener('mousedown', () => {
            this.moveRight(model, checkDone);
            addComparisonLog();
        });
    }

    addBatch(model: DSCModel, partition: Partition, checkDone: () => AlgorithmState): void {
        {
            const btn = createInputImmediateEl('button', model.arr[partition.l].toString());
            this.initLeftImmListeners(btn, model, checkDone);
            model.leftCurrDOM.appendChild(btn);
        }
        for (let i = partition.l + 1; i <= partition.m; ++i) {
            const btn = createInputGradualEl('button', model.arr[i].toString());
            model.leftDOM.appendChild(btn);
        }
        {
            const btn = createInputImmediateEl('button', model.arr[partition.m + 1].toString());
            this.initRightImmListeners(btn, model, checkDone);
            model.rightCurrDOM.appendChild(btn);
        }
        for (let i = partition.m + 2; i <= partition.r; ++i) {
            const btn = createInputGradualEl('button', model.arr[i].toString());
            model.rightDOM.appendChild(btn);
        }

        model.i = partition.l;
    }

    getMergePartitions(queue: Queue<Partition>, l: number, r: number): void {
        if (l >= r) {
            return;
        }
        const m = Math.floor(l + (r - l) / 2);
        this.getMergePartitions(queue, l, m);
        this.getMergePartitions(queue, m + 1, r);
        queue.push(new Partition(l, m, r));
    }

    run(arr: Array<number>): Promise<void> {
        try {
            this.model = new DSCModel(arr);
        } catch (err) {
            return Promise.reject(err);
        }

        this.partitions = new Queue<Partition>();
        this.getMergePartitions(this.partitions, 0, arr.length - 1)
        const model = this.model;
        const partitions = this.partitions
        let currentPartition: Partition | null;

        return new Promise((resolve) => {
            const checkDone = () => {
                let ret = 0;
                if (model.leftDOM.children.length === 0
                    && model.rightDOM.children.length === 0
                    && model.leftCurrDOM.children.length === 0
                    && model.rightCurrDOM.children.length === 0
                ) {
                    deleteChildren(model.sortedArrDOM);
                    currentPartition = partitions.shift()
                    if (currentPartition) {
                        this.addBatch(model, currentPartition, checkDone);
                    }
                    
                    ret = AlgorithmState.nextIter;
                }
                
                if (!currentPartition) {
                    model.clearPlayground();
                    resolve()
                    ret = AlgorithmState.terminate;
                }
    
                return ret || AlgorithmState.currentIter;
            }

            model.clearPlayground();
            checkDone();
        });
    }
}