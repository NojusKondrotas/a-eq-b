import { addComparisonLog } from "../../sorts/sort_logger.ts";
import { swap } from "../../utils/numerics.ts";
import { createInputGradualEl, createInputImmediateEl, createOutputEl, deleteChildren } from "../minigame_utils.ts";
import { SSCModel } from "../models/single_stream_contiguous.ts";
import { AlgorithmState, Runner } from "./runner.ts";

export class BubbleRunner implements Runner {
    model: SSCModel | null = null;
    swapped: boolean = false;
    iter: number = 0;

    removeFromInput(model: SSCModel) {
        if (model.rightDOM.firstChild)
            model.rightDOM.removeChild(model.rightDOM.firstChild);
    }

    addToSorted(model: SSCModel) {
        for (let i = model.arr.length - this.iter; i < model.arr.length; ++i) {
            const outEl = createOutputEl(model.arr[i].toString());
            model.sortedArrDOM.appendChild(outEl);
        }
    }

    moveLeft(model: SSCModel, checkDone: () => AlgorithmState) {
        deleteChildren(model.leftCurrDOM);
        deleteChildren(model.rightCurrDOM);
    
        swap(model.arr, model.i - 1, model.i);
        this.swapped = true;
        model.leftDOM.appendChild(createInputGradualEl('button', model.arr[model.i - 1].toString()));
        ++model.i;
    
        this.removeFromInput(model);
    
        if (checkDone() >= AlgorithmState.nextIter)
            return;
    
        this.addLeft(model, checkDone);
        this.addRight(model, checkDone);
    }

    moveRight(model: SSCModel, checkDone: () => AlgorithmState) {
        model.leftDOM.appendChild(createInputGradualEl('button', model.arr[model.i - 1].toString()));
        deleteChildren(model.leftCurrDOM);
        deleteChildren(model.rightCurrDOM);
    
        ++model.i;
    
        this.removeFromInput(model);
    
        if (checkDone() >= AlgorithmState.nextIter)
            return;
    
        this.addLeft(model, checkDone);
        this.addRight(model, checkDone);
    }

    initLeftImmListeners(el: HTMLElement, model: SSCModel, checkDone: () => AlgorithmState) {
        el.addEventListener('mousedown', () => {
            this.moveLeft(model, checkDone);
            addComparisonLog();
        })
    }

    initRightImmListeners(el: HTMLElement, model: SSCModel, checkDone: () => AlgorithmState) {
        el.addEventListener('mousedown', () => {
            this.moveRight(model, checkDone);
            addComparisonLog();
        });
    }

    addLeft(model: SSCModel, checkDone: () => AlgorithmState) {
        const btn = createInputImmediateEl('button', model.arr[model.i - 1].toString());
        this.initLeftImmListeners(btn, model, checkDone);
        model.leftCurrDOM.appendChild(btn);
    }

    addRight(model: SSCModel, checkDone: () => AlgorithmState) {
        const btn = createInputImmediateEl('button', model.arr[model.i].toString());
        this.initRightImmListeners(btn, model, checkDone);
        model.rightCurrDOM.appendChild(btn);
    }

    addBatch(model: SSCModel): void {
        for (let i = 2; i < model.arr.length; ++i) {
            const btn = createInputGradualEl('button', model.arr[i].toString());
            model.rightDOM.appendChild(btn);
        }
    }

    run(arr: Array<number>): Promise<void> {
        try {
            this.model = new SSCModel(arr);
        } catch (err) {
            return Promise.reject(err);
        }

        const model = this.model;

        return new Promise((resolve) => {
            const checkDone = () => {
                let ret = 0;
                if (model.i >= arr.length) {
                    if (this.swapped) {
                        model.clearPlayground();
                        this.addToSorted(model);
                        ++this.iter;
                        model.i = 1;
                        this.addBatch(model);
                        this.addLeft(model, checkDone);
                        this.addRight(model, checkDone);
                        this.swapped = false;
                        ret = AlgorithmState.nextIter;
                    } else {
                        model.clearPlayground();
                        resolve();
                        ret = AlgorithmState.terminate;
                    }
                }
    
                return ret || AlgorithmState.currentIter;
            }

            model.clearPlayground();
            model.i = 1;
            this.iter = 1;
            this.addBatch(model);
            this.addLeft(model, checkDone);
            this.addRight(model, checkDone);
        });
    }
}