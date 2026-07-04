import { addComparisonLog } from "../../sorts/sort_logger.js";
import { swap } from "../../utils/numerics.js";
import { createInputImmediateEl, createOutputEl, deleteChildren } from "../minigame_utils.js";
import { SSSModel } from "../models/single_stream_separate.js";
import { AlgorithmState } from "./runner.js";
export class HeapRunner {
    model = null;
    key = 0;
    left = 0;
    right = 0;
    doNextCounter = 0;
    clearInput(model) {
        deleteChildren(model.keyCurrDOM);
        deleteChildren(model.inCurrDOM);
    }
    addToSorted(model, val) {
        const outEl = createOutputEl(val.toString());
        model.sortedArrDOM.insertBefore(outEl, model.sortedArrDOM.firstChild);
    }
    moveTop(model, checkDone) {
        ++this.doNextCounter;
        checkDone();
    }
    moveBottom(model, checkDone) {
        switch (this.doNextCounter) {
            case 0:
                this.key = this.left;
                break;
            case 1:
                this.key = this.right;
                break;
        }
        ++this.doNextCounter;
        checkDone();
    }
    initTopImmListeners(el, model, checkDone) {
        el.addEventListener('mousedown', () => {
            this.moveTop(model, checkDone);
            addComparisonLog();
        });
    }
    initBottomImmListeners(el, model, checkDone) {
        el.addEventListener('mousedown', () => {
            this.moveBottom(model, checkDone);
            addComparisonLog();
        });
    }
    getLeftIndex = (i) => i * 2 + 1;
    getRightIndex = (i) => i * 2 + 2;
    addBatch(model, checkDone) {
        this.clearInput(model);
        let btn;
        btn = createInputImmediateEl('button', model.arr[this.key].toString());
        this.initTopImmListeners(btn, model, checkDone);
        model.keyCurrDOM.appendChild(btn);
        let idx;
        if (this.doNextCounter === 0) {
            idx = this.left;
        }
        else {
            idx = this.right;
        }
        if (idx < model.j) {
            btn = createInputImmediateEl('button', model.arr[idx].toString());
            this.initBottomImmListeners(btn, model, checkDone);
            model.inCurrDOM.appendChild(btn);
        }
    }
    maxHeapify(model, i) {
        const left = this.getLeftIndex(i);
        const right = this.getRightIndex(i);
        let largest = i;
        if (left < model.j && model.arr[left] > model.arr[largest])
            largest = left;
        if (right < model.j && model.arr[right] > model.arr[largest])
            largest = right;
        if (largest != i) {
            swap(model.arr, i, largest);
            this.maxHeapify(model, largest);
        }
    }
    buildMaxHeap(model) {
        for (let i = Math.floor(model.arr.length / 2) - 1; i >= 0; --i) {
            this.maxHeapify(model, i);
        }
    }
    run(arr) {
        try {
            this.model = new SSSModel(arr);
        }
        catch (err) {
            return Promise.reject(err);
        }
        const model = this.model;
        model.j = model.arr.length;
        this.buildMaxHeap(model);
        return new Promise((resolve) => {
            const checkDone = () => {
                let ret = 0;
                if (model.j === 1) {
                    this.addToSorted(model, model.arr[0]);
                    this.clearInput(model);
                    resolve();
                    ret = AlgorithmState.terminate;
                }
                else {
                    switch (this.doNextCounter) {
                        case 0:
                        case 1:
                            this.addBatch(model, checkDone);
                            if (model.inCurrDOM.children.length === 0) {
                                this.doNextCounter = 2;
                            }
                            break;
                    }
                    while (this.doNextCounter === 2 && model.j > 1) {
                        if (model.i === this.key) {
                            model.i = this.key = 0;
                            this.addToSorted(model, model.arr[0]);
                            --model.j;
                            swap(model.arr, 0, model.j);
                        }
                        else {
                            swap(model.arr, model.i, this.key);
                            model.i = this.key;
                        }
                        this.left = this.getLeftIndex(this.key);
                        this.right = this.getRightIndex(this.key);
                        this.doNextCounter = 0;
                        this.addBatch(model, checkDone);
                        if (model.inCurrDOM.children.length === 0) {
                            this.doNextCounter = 2;
                        }
                    }
                    if (model.j === 1) {
                        model.clearPlayground();
                        resolve();
                        ret = AlgorithmState.terminate;
                    }
                }
                return ret || AlgorithmState.currentIter;
            };
            model.clearPlayground();
            this.doNextCounter = 2;
            checkDone();
        });
    }
}
