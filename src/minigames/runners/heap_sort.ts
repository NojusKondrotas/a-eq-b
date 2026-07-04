import { addComparisonLog } from "../../sorts/sort_logger.ts";
import { swap } from "../../utils/numerics.ts";
import { createInputImmediateEl, createOutputEl, deleteChildren } from "../minigame_utils.ts";
import { SSSModel } from "../models/single_stream_separate.ts";
import { AlgorithmState, Runner } from "./runner.ts";

export class HeapRunner implements Runner {
    model: SSSModel | null = null;
    key: number = 0;
    left: number = 0;
    right: number = 0;
    doNextCounter: number = 0;


    clearInput(model: SSSModel) {
        deleteChildren(model.keyCurrDOM);
        deleteChildren(model.inCurrDOM);
    }

    addToSorted(model: SSSModel, val: number) {
        const outEl = createOutputEl(val.toString());
        model.sortedArrDOM.insertBefore(outEl, model.sortedArrDOM.firstChild);
    }

    moveTop(model: SSSModel, checkDone: () => AlgorithmState) {
        ++this.doNextCounter;

        checkDone();
    }

    moveBottom(model: SSSModel, checkDone: () => AlgorithmState) {
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

    initTopImmListeners(el: HTMLElement, model: SSSModel, checkDone: () => AlgorithmState) {
        el.addEventListener('mousedown', () => {
            this.moveTop(model, checkDone);
            addComparisonLog();
        })
    }

    initBottomImmListeners(el: HTMLElement, model: SSSModel, checkDone: () => AlgorithmState) {
        el.addEventListener('mousedown', () => {
            this.moveBottom(model, checkDone);
            addComparisonLog();
        });
    }

    getLeftIndex = (i: number) => i * 2 + 1;
    getRightIndex = (i: number) => i * 2 + 2;

    addBatch(model: SSSModel, checkDone: () => AlgorithmState): void {
        this.clearInput(model);
        let btn: HTMLElement;
        btn = createInputImmediateEl('button', model.arr[this.key].toString());
        this.initTopImmListeners(btn, model, checkDone);
        model.keyCurrDOM.appendChild(btn);

        let idx: number;
        if (this.doNextCounter === 0) {
            idx = this.left;
        } else {
            idx = this.right;
        }
        if (idx < model.j) {
            btn = createInputImmediateEl('button', model.arr[idx].toString());
            this.initBottomImmListeners(btn, model, checkDone);
            model.inCurrDOM.appendChild(btn);
        }
    }

    maxHeapify(model: SSSModel, i: number): void {
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
    
    buildMaxHeap(model: SSSModel): void {
        for (let i = Math.floor(model.arr.length / 2) - 1; i >= 0; --i) {
            this.maxHeapify(model, i);
        }
    }

    run(arr: Array<number>): Promise<void> {
        try {
            this.model = new SSSModel(arr);
        } catch (err) {
            return Promise.reject(err);
        }

        const model = this.model;
        model.j = model.arr.length;
        this.buildMaxHeap(model);

        return new Promise((resolve) => {
            const checkDone = (): AlgorithmState => {
                let ret = 0;
                if (model.j === 1) {
                    this.addToSorted(model, model.arr[0]);
                    this.clearInput(model);
                    resolve()
                    ret = AlgorithmState.terminate;
                } else {
                    switch(this.doNextCounter) {
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
                        } else {
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
                        resolve()
                        ret = AlgorithmState.terminate;
                    }
                }
    
                return ret || AlgorithmState.currentIter;
            }

            model.clearPlayground();
            this.doNextCounter = 2;
            checkDone();
        });
    }
}