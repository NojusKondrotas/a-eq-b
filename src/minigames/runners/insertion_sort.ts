import { addComparisonLog } from "../../sorts/sort_logger.ts";
import { createInputGradualEl, createInputImmediateEl, createOutputEl, deleteChildren } from "../minigame_utils.ts";
import { SSSModel } from "../models/single_stream_separate.ts";
import { AlgorithmState, Runner } from "./runner.ts";

export class InsertionRunner implements Runner {
    model: SSSModel | null = null;
    key: number = 0;
    doNext: boolean = false;

    removeFromInput(model: SSSModel) {
        if (model.leftDOM.lastChild)
            model.leftDOM.removeChild(model.leftDOM.lastChild);
    }

    addToSorted(model: SSSModel) {
        for (let i = 0; i < model.i; ++i) {
            const outEl = createOutputEl(model.arr[i].toString());
            model.sortedArrDOM.appendChild(outEl);
        }
    }

    move(model: SSSModel, checkDone: () => AlgorithmState) {
        const largerVal = model.inCurrDOM.firstChild!.textContent!;

        model.rightDOM.appendChild(createInputGradualEl('button', largerVal));
        deleteChildren(model.inCurrDOM);

        model.arr[model.j + 1] = model.arr[model.j];
        --model.j;

        if (checkDone() >= AlgorithmState.nextIter)
            return;

        this.removeFromInput(model);
        this.addIn(model, checkDone);
    }

    nextIter(checkDone: () => AlgorithmState) {
        this.doNext = true;
        checkDone();
    }

    initInImmListeners(el: HTMLElement, model: SSSModel, checkDone: () => AlgorithmState) {
        el.addEventListener('mousedown', () => {
            this.move(model, checkDone);
            addComparisonLog();
        })
    }

    initKeyImmListeners(el: HTMLElement, model: SSSModel, checkDone: () => AlgorithmState) {
        el.addEventListener('mousedown', () => {
            this.nextIter(checkDone);
            addComparisonLog();
        });
    }

    addIn(model: SSSModel, checkDone: () => AlgorithmState) {
        const btn = createInputImmediateEl('button', model.arr[model.j].toString());
        this.initInImmListeners(btn, model, checkDone);
        model.inCurrDOM.appendChild(btn);
    }

    addKey(model: SSSModel, checkDone: () => AlgorithmState) {
        const btn = createInputImmediateEl('button', model.arr[model.i].toString());
        this.initKeyImmListeners(btn, model, checkDone);
        model.keyCurrDOM.appendChild(btn);
    }

    addBatch(model: SSSModel): void {
        for (let i = 0; i < model.j; ++i) {
            const btn = createInputGradualEl('button', model.arr[i].toString());
            model.leftDOM.appendChild(btn);
        }
    }

    run(arr: Array<number>): Promise<void> {
        try {
            this.model = new SSSModel(arr);
        } catch {
            return Promise.reject(new Error("Required DOM elements not found"));
        }

        const model = this.model;

        return new Promise((resolve) => {
            const checkDone = () => {
                let ret = 0;
                if (this.doNext
                    || model.leftDOM.children.length === 0
                    || model.j < 0) {
                    model.arr[model.j + 1] = this.key;
                    model.clearPlayground();
                    ++model.i;
                    model.j = model.i - 1;
                    this.addToSorted(model);
                    if (model.i < model.arr.length) {
                        this.key = model.arr[model.i]
                        this.addBatch(model);
                        this.addIn(model, checkDone);
                        this.addKey(model, checkDone);
                    }
                    this.doNext = false;
                    ret = AlgorithmState.nextIter;
                }
                
                if (model.i >= model.arr.length) {
                    resolve()
                    ret = AlgorithmState.terminate;
                }
    
                return ret || AlgorithmState.currentIter;
            }

            model.clearPlayground();
            model.i = 1;
            model.j = 0;
            this.key = model.arr[model.i]
            this.addBatch(model);
            this.addIn(model, checkDone);
            this.addKey(model, checkDone);
        });
    }
}