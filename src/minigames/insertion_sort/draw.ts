import { createInputGradualEl, createInputImmediateEl, deleteChildren, getSortedArrDOM } from "../minigame_utils.ts";

class SortModel {
    key: number;
    j: number;
    arr: Array<number>;
    leftArr: HTMLElement;
    rightArr: HTMLElement;
    inCurr: HTMLElement;
    keyCurr: HTMLElement;
    doTerminate: boolean;

    constructor(j: number, arr: Array<number>, lArr: HTMLElement, rArr: HTMLElement, inCurr: HTMLElement, keyCurr: HTMLElement) {
        this.key = arr[j + 1];
        this.j = j;
        this.arr = arr;
        this.leftArr = lArr;
        this.rightArr = rArr;
        this.inCurr = inCurr;
        this.keyCurr = keyCurr;
        this.doTerminate = false;
    }
}

function removeFromInput(sortModel: SortModel) {
    if (sortModel.leftArr.lastChild)
        sortModel.leftArr.removeChild(sortModel.leftArr.lastChild);
}

function move(sortModel: SortModel, checkDone: () => boolean) {
    const largerVal = sortModel.inCurr.firstChild!.textContent!;

    sortModel.rightArr.appendChild(createInputGradualEl('button', largerVal));
    deleteChildren(sortModel.inCurr);

    sortModel.arr[sortModel.j + 1] = sortModel.arr[sortModel.j];
    sortModel.j--;

    if (checkDone())
        return;

    removeFromInput(sortModel);
    addLeft(sortModel, checkDone);
}

function terminate(sortModel: SortModel, checkDone: () => boolean) {
    sortModel.arr[sortModel.j + 1] = sortModel.key;
    sortModel.doTerminate = true;
    checkDone();
}

function initLeftImmListeners(el: HTMLElement, sortModel: SortModel, checkDone: () => boolean) {
    el.addEventListener('mousedown', () => {
        move(sortModel, checkDone);
    })
}

function initRightImmListeners(el: HTMLElement, sortModel: SortModel, checkDone: () => boolean) {
    el.addEventListener('mousedown', () => {
        terminate(sortModel, checkDone);
    });
}

function addLeft(sortModel: SortModel, checkDone: () => boolean) {
    const btn = createInputImmediateEl('button', sortModel.arr[sortModel.j].toString());
    initLeftImmListeners(btn, sortModel, checkDone);
    sortModel.inCurr.appendChild(btn);
}

function addRight(sortModel: SortModel, checkDone: () => boolean) {
    const btn = createInputImmediateEl('button', sortModel.key.toString());
    initRightImmListeners(btn, sortModel, checkDone);
    sortModel.keyCurr.appendChild(btn);
}

function addBatch(sortModel: SortModel): void {
    for (let i = 0; i < sortModel.j; ++i) {
        const btn = createInputGradualEl('button', sortModel.arr[i].toString());
        sortModel.leftArr.appendChild(btn);
    }
}

export function handleInsertionDrawing(arr: Array<number>, j: number): Promise<void> {
    const leftElsContainer = document.getElementById('left-sss');
    const rightElsContainer = document.getElementById('right-sss');
    const inElCurr = document.getElementById('curr-in-sss');
    const keyElCurr = document.getElementById('curr-key-sss');

    const sortedArrContainer = getSortedArrDOM();

    if (!leftElsContainer || !rightElsContainer || !inElCurr || !keyElCurr || !sortedArrContainer) {
        window.location.href = '../../pages/error/error.html';
        return Promise.reject(new Error("Required DOM elements not found"));
    }

    deleteChildren(sortedArrContainer);
    const sortModel = new SortModel(j, arr, leftElsContainer, rightElsContainer, inElCurr, keyElCurr);

    return new Promise((resolve) => {
        const checkDone = () => {
            if (sortModel.doTerminate
                || sortModel.leftArr.children.length === 0
                || sortModel.j < 0
            ) {
                sortModel.arr[sortModel.j + 1] = sortModel.key;
                deleteChildren(sortModel.leftArr);
                deleteChildren(sortModel.inCurr);
                deleteChildren(sortModel.keyCurr);
                deleteChildren(sortModel.rightArr);
                resolve();
                return true;
            }

            return false;
        }

        addBatch(sortModel);
        addLeft(sortModel, checkDone);
        addRight(sortModel, checkDone);
    });
}