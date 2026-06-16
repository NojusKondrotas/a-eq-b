import { createInputGradualEl, createInputImmediateEl, deleteChildren, getSortedArrDOM } from "../minigame_utils.ts";

class SortModel {
    min_idx: number;
    i: number;
    j: number;
    arr: Array<number>;
    leftArr: HTMLElement;
    rightArr: HTMLElement;
    keyCurr: HTMLElement;
    inCurr: HTMLElement;

    constructor(i: number, arr: Array<number>, lArr: HTMLElement, rArr: HTMLElement, inCurr: HTMLElement, keyCurr: HTMLElement) {
        this.min_idx = i;
        this.i = i;
        this.j = i + 1;
        this.arr = arr;
        this.leftArr = lArr;
        this.rightArr = rArr;
        this.inCurr = inCurr;
        this.keyCurr = keyCurr;
    }
}

function removeFromInput(sortModel: SortModel) {
    if (sortModel.leftArr.lastChild)
        sortModel.leftArr.removeChild(sortModel.leftArr.lastChild);
}

function moveLeft(sortModel: SortModel, checkDone: () => boolean) {
    sortModel.rightArr.appendChild(createInputGradualEl('button', sortModel.inCurr.firstChild!.textContent!));
    deleteChildren(sortModel.inCurr);
    deleteChildren(sortModel.keyCurr);

    sortModel.min_idx = sortModel.j;
    sortModel.j++;

    if (checkDone())
        return;

    removeFromInput(sortModel);
    addLeft(sortModel, checkDone);
    addRight(sortModel, checkDone);
}

function moveRight(sortModel: SortModel, checkDone: () => boolean) {
    sortModel.rightArr.appendChild(createInputGradualEl('button', sortModel.inCurr.firstChild!.textContent!));
    deleteChildren(sortModel.inCurr);

    sortModel.j++;

    if (checkDone())
        return;

    removeFromInput(sortModel);
    addLeft(sortModel, checkDone);
}

function initLeftImmListeners(el: HTMLElement, sortModel: SortModel, checkDone: () => boolean) {
    el.addEventListener('mousedown', () => {
        moveLeft(sortModel, checkDone);
    })
}

function initRightImmListeners(el: HTMLElement, sortModel: SortModel, checkDone: () => boolean) {
    el.addEventListener('mousedown', () => {
        moveRight(sortModel, checkDone);
    });
}

function addLeft(sortModel: SortModel, checkDone: () => boolean) {
    const btn = createInputImmediateEl('button', sortModel.arr[sortModel.j].toString());
    initLeftImmListeners(btn, sortModel, checkDone);
    sortModel.inCurr.appendChild(btn);
}

function addRight(sortModel: SortModel, checkDone: () => boolean) {
    const btn = createInputImmediateEl('button', sortModel.arr[sortModel.min_idx].toString());
    initRightImmListeners(btn, sortModel, checkDone);
    sortModel.keyCurr.appendChild(btn);
}

function addBatch(sortModel: SortModel): void {
    for (let i = sortModel.j + 1; i < sortModel.arr.length; ++i) {
        const btn = createInputGradualEl('button', sortModel.arr[i].toString());
        sortModel.leftArr.appendChild(btn);
    }
}

export function handleSelectionDrawing(arr: Array<number>, i: number): Promise<void> {
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
    const sortModel = new SortModel(i, arr, leftElsContainer, rightElsContainer, inElCurr, keyElCurr);

    return new Promise((resolve) => {
        const checkDone = () => {
            if (sortModel.leftArr.children.length === 0) {
                [sortModel.arr[sortModel.i], sortModel.arr[sortModel.min_idx]] = [sortModel.arr[sortModel.min_idx], sortModel.arr[sortModel.i]];
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