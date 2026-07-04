import { addComparisonLog } from "../../sorts/sort_logger.js";
import { swap } from "../../utils/numerics.js";
import { Queue } from "../../utils/queue.js";
import { createInputGradualEl, createInputImmediateEl, deleteChildren, getChild } from "../minigame_utils.js";
import { SSSModel } from "../models/single_stream_separate.js";
import { AlgorithmState } from "./runner.js";
class Partition {
    l;
    r;
    constructor(l, r) {
        this.l = l;
        this.r = r;
    }
}
export class QuickRunner {
    model = null;
    partitions = null;
    key = 0;
    l = 0;
    r = 0;
    removeFromInput(model) {
        if (model.rightDOM.firstChild)
            model.rightDOM.removeChild(model.rightDOM.firstChild);
    }
    moveIn(model, checkDone) {
        const smallerValue = model.inCurrDOM.firstChild.textContent;
        model.leftDOM.appendChild(createInputGradualEl('button', smallerValue));
        deleteChildren(model.inCurrDOM);
        swap(model.arr, model.i, model.j);
        const childLeft = getChild(model.leftDOM, model.i - this.l);
        const childRight = getChild(model.leftDOM, model.j - this.l);
        if (childLeft)
            childLeft.textContent = model.arr[model.i].toString();
        if (childRight)
            childRight.textContent = model.arr[model.j].toString();
        ++model.i;
        ++model.j;
        if (checkDone() >= AlgorithmState.nextIter)
            return;
        this.removeFromInput(model);
        this.addIn(model, checkDone);
    }
    moveKey(model, checkDone) {
        const smallerValue = model.inCurrDOM.firstChild.textContent;
        model.leftDOM.appendChild(createInputGradualEl('button', smallerValue));
        deleteChildren(model.inCurrDOM);
        ++model.j;
        if (checkDone() >= AlgorithmState.nextIter)
            return;
        this.removeFromInput(model);
        this.addIn(model, checkDone);
    }
    initInImmListeners(el, model, checkDone) {
        el.addEventListener('mousedown', () => {
            this.moveIn(model, checkDone);
            addComparisonLog();
        });
    }
    initKeyImmListeners(el, model, checkDone) {
        el.addEventListener('mousedown', () => {
            this.moveKey(model, checkDone);
            addComparisonLog();
        });
    }
    addIn(model, checkDone) {
        const btn = createInputImmediateEl('button', model.arr[model.j].toString());
        this.initInImmListeners(btn, model, checkDone);
        model.inCurrDOM.appendChild(btn);
    }
    addKey(model, checkDone) {
        const btn = createInputImmediateEl('button', model.arr[this.r].toString());
        this.initKeyImmListeners(btn, model, checkDone);
        model.keyCurrDOM.appendChild(btn);
    }
    partition(partitions, model) {
        if (this.l < model.i - 1)
            partitions.push(new Partition(this.l, model.i - 1));
        if (model.i + 1 < this.r)
            partitions.push(new Partition(model.i + 1, this.r));
    }
    medianOfThree(arr, l, r) {
        const m = Math.floor(l + (r - l) / 2);
        const tmp = [{ idx: l, num: arr[l] }, { idx: m, num: arr[m] }, { idx: r, num: arr[r] }].sort((a, b) => a.num - b.num);
        return tmp[1];
    }
    addBatch(model, partition, checkDone) {
        this.addIn(model, checkDone);
        this.addKey(model, checkDone);
        for (let i = partition.l + 1; i < partition.r; ++i) {
            const btn = createInputGradualEl('button', model.arr[i].toString());
            model.rightDOM.appendChild(btn);
        }
    }
    run(arr) {
        try {
            this.model = new SSSModel(arr);
        }
        catch {
            return Promise.reject(new Error("Required DOM elements not found"));
        }
        const model = this.model;
        this.partitions = new Queue();
        this.partitions.push(new Partition(0, arr.length - 1));
        const partitions = this.partitions;
        let currentPartition;
        let pivot;
        return new Promise((resolve) => {
            const checkDone = () => {
                let ret = 0;
                if (model.j === this.r) {
                    [model.arr[model.i], model.arr[this.r]] = [model.arr[this.r], model.arr[model.i]];
                    model.clearPlayground();
                    this.partition(partitions, model);
                    currentPartition = partitions.shift();
                    if (currentPartition) {
                        this.l = currentPartition.l, this.r = currentPartition.r;
                        model.i = model.j = this.l;
                        pivot = this.medianOfThree(model.arr, this.l, this.r);
                        swap(model.arr, this.r, pivot.idx);
                        this.addBatch(model, currentPartition, checkDone);
                    }
                    ret = AlgorithmState.nextIter;
                }
                if (!currentPartition) {
                    model.clearPlayground();
                    resolve();
                    ret = AlgorithmState.terminate;
                }
                return ret || AlgorithmState.currentIter;
            };
            model.clearPlayground();
            currentPartition = partitions.shift();
            this.l = currentPartition.l, this.r = currentPartition.r;
            pivot = this.medianOfThree(model.arr, this.l, this.r);
            [model.arr[this.r], model.arr[pivot.idx]] = [model.arr[pivot.idx], model.arr[this.r]];
            this.addBatch(model, currentPartition, checkDone);
        });
    }
}
