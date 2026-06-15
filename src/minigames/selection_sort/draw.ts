import { createInputGradualEl, createInputImmediateEl, getSortedArrDOM } from "../minigame_utils.ts";

class SortModel {
    min_idx: number;
    i: number;
    j: number;
    arr: Array<number>;
    leftArr: HTMLElement;
    rightArr: HTMLElement;
    leftCurr: HTMLElement;
    rightCurr: HTMLElement;

    constructor(i: number, arr: Array<number>, lArr: HTMLElement, rArr: HTMLElement, lCurr: HTMLElement, rCurr: HTMLElement) {
        this.min_idx = i;
        this.i = i;
        this.j = i + 1;
        this.arr = arr;
        this.leftArr = lArr;
        this.rightArr = rArr;
        this.leftCurr = lCurr;
        this.rightCurr = rCurr;
    }
}

export function deleteChildren(el: HTMLElement) {
    while (el.firstChild) {
        el.removeChild(el.lastChild as ChildNode);
    }
}

function removeFromInput(sortModel: SortModel) {
    if (sortModel.leftArr.lastChild)
        sortModel.leftArr.removeChild(sortModel.leftArr.lastChild);
}

function moveLeft(sortModel: SortModel, checkDone: () => boolean) {
    sortModel.rightArr.appendChild(createInputGradualEl('button', sortModel.leftCurr.firstChild!.textContent!));
    deleteChildren(sortModel.leftCurr);
    deleteChildren(sortModel.rightCurr);

    sortModel.min_idx = sortModel.j;
    sortModel.j++;

    if (checkDone())
        return;

    removeFromInput(sortModel);
    addLeft(sortModel, checkDone);
    addRight(sortModel, checkDone);
}

function moveRight(sortModel: SortModel, checkDone: () => boolean) {
    sortModel.rightArr.appendChild(createInputGradualEl('button', sortModel.leftCurr.firstChild!.textContent!));
    deleteChildren(sortModel.leftCurr);

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
    sortModel.leftCurr.appendChild(btn);
}

function addRight(sortModel: SortModel, checkDone: () => boolean) {
    const btn = createInputImmediateEl('button', sortModel.arr[sortModel.min_idx].toString());
    initRightImmListeners(btn, sortModel, checkDone);
    sortModel.rightCurr.appendChild(btn);
}

function addBatch(sortModel: SortModel): void {
    for (let i = sortModel.j + 1; i < sortModel.arr.length; ++i) {
        const btn = createInputGradualEl('button', sortModel.arr[i].toString());
        sortModel.leftArr.appendChild(btn);
    }
}

export function handleSelectionDrawing(arr: Array<number>, i: number): Promise<void> {
    const leftElsContainer = document.getElementById('left-selection');
    const rightElsContainer = document.getElementById('right-selection');
    const leftElCurr = document.getElementById('curr-left-selection');
    const rightElCurr = document.getElementById('curr-right-selection');

    const sortedArrContainer = getSortedArrDOM();

    if (!leftElsContainer || !rightElsContainer || !leftElCurr || !rightElCurr || !sortedArrContainer) {
        window.location.href = '../../pages/error/error.html';
        return Promise.reject(new Error("Required DOM elements not found"));
    }

    deleteChildren(sortedArrContainer);
    const sortModel = new SortModel(i, arr, leftElsContainer, rightElsContainer, leftElCurr, rightElCurr);

    return new Promise((resolve) => {
        const checkDone = () => {
            if (sortModel.leftArr.children.length === 0) {
                [sortModel.arr[sortModel.i], sortModel.arr[sortModel.min_idx]] = [sortModel.arr[sortModel.min_idx], sortModel.arr[sortModel.i]];
                deleteChildren(sortModel.leftArr);
                deleteChildren(sortModel.leftCurr);
                deleteChildren(sortModel.rightCurr);
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