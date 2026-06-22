import { createInputGradualEl, createInputImmediateEl, deleteChildren, getSortedArrDOM } from "../minigame_utils.ts";
import { SSSModel } from "../models/single_stream_separate.ts";
import { Runner } from "./runner.ts";

enum AlgorithmState {
    currentIter = 1,
    nextIter,
    terminate,
}

export class SelectionRunner implements Runner {
    model: SSSModel | null = null;
    key: number = 0;

    removeFromInput(model: SSSModel) {
        if (model.rightDOM.firstChild)
            model.rightDOM.removeChild(model.rightDOM.firstChild);
    }
    
    moveIn(model: SSSModel, checkDone: () => AlgorithmState) {
        const smallerValue = model.inCurrDOM.firstChild!.textContent!;

        model.leftDOM.appendChild(createInputGradualEl('button', smallerValue));
        deleteChildren(model.inCurrDOM);
        deleteChildren(model.keyCurrDOM);
    
        this.key = model.j;
        ++model.j;
    
        if (checkDone() >= AlgorithmState.nextIter)
            return;
    
        this.removeFromInput(model);
        this.addIn(model, checkDone);
        this.addKey(model, checkDone);
    }
    
    moveKey(model: SSSModel, checkDone: () => AlgorithmState) {
        const smallerValue = model.inCurrDOM.firstChild!.textContent!;

        model.leftDOM.appendChild(createInputGradualEl('button', smallerValue));
        deleteChildren(model.inCurrDOM);
    
        ++model.j;
    
        if (checkDone() >= AlgorithmState.nextIter)
            return;
    
        this.removeFromInput(model);
        this.addIn(model, checkDone);
    }
    
    initInImmListeners(el: HTMLElement, model: SSSModel, checkDone: () => AlgorithmState) {
        el.addEventListener('mousedown', () => {
            this.moveIn(model, checkDone);
        })
    }
    
    initKeyImmListeners(el: HTMLElement, model: SSSModel, checkDone: () => AlgorithmState) {
        el.addEventListener('mousedown', () => {
            this.moveKey(model, checkDone);
        });
    }
    
    addIn(model: SSSModel, checkDone: () => AlgorithmState) {
        const btn = createInputImmediateEl('button', model.arr[model.j].toString());
        this.initInImmListeners(btn, model, checkDone);
        model.inCurrDOM.appendChild(btn);
    }
    
    addKey(model: SSSModel, checkDone: () => AlgorithmState) {
        const btn = createInputImmediateEl('button', model.arr[this.key].toString());
        this.initKeyImmListeners(btn, model, checkDone);
        model.keyCurrDOM.appendChild(btn);
    }
    
    addBatch(model: SSSModel): void {
        for (let i = 0; i < model.i; ++i) {
            const btn = createInputGradualEl('button', model.arr[i].toString());
            model.leftDOM.appendChild(btn);
        }
        for (let i = model.j + 1; i < model.arr.length; ++i) {
            const btn = createInputGradualEl('button', model.arr[i].toString());
            model.rightDOM.appendChild(btn);
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
                if (model.rightDOM.children.length === 0) {
                    [model.arr[model.i], model.arr[this.key]] = [model.arr[this.key], model.arr[model.i]];
                    ++model.i;
                    model.clearPlayground();
                    model.j = model.i + 1;
                    this.key = model.i;
                    if (model.j < model.arr.length) {
                        this.addBatch(model);
                        this.addIn(model, checkDone);
                        this.addKey(model, checkDone);
                    }
                    ret = AlgorithmState.nextIter;
                }

                if (model.i == model.arr.length - 1) {
                    model.clearPlayground();
                    resolve()
                    ret = AlgorithmState.terminate;
                }
    
                return ret || AlgorithmState.currentIter;
            }
    
            model.i = 0, model.j = 1, this.key = 0;
            model.clearPlayground();
            this.addBatch(model);
            this.addIn(model, checkDone);
            this.addKey(model, checkDone);
        });
    }
}