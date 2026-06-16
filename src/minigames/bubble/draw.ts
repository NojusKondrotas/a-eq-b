import { createInputGradualEl, createInputImmediateEl, getSortedArrDOM } from "../minigame_utils.ts";

class SortModel {
    arr: Array<number>;
    i: number;
    swappedObj: { swapped: boolean };
    leftArr: HTMLElement;
    rightArr: HTMLElement;
    leftCurr: HTMLElement;
    rightCurr: HTMLElement;

    constructor(arr: Array<number>, swappedObj: { swapped: boolean }, lArr: HTMLElement, rArr: HTMLElement, lCurr: HTMLElement, rCurr: HTMLElement) {
        this.i = 1;
        this.arr = arr;
        this.swappedObj = swappedObj;
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
    if (sortModel.rightArr.firstChild)
        sortModel.rightArr.removeChild(sortModel.rightArr.firstChild);
}

function moveLeft(sortModel: SortModel, checkDone: () => boolean) {
    deleteChildren(sortModel.leftCurr);
    deleteChildren(sortModel.rightCurr);

    [sortModel.arr[sortModel.i - 1], sortModel.arr[sortModel.i]] = [sortModel.arr[sortModel.i], sortModel.arr[sortModel.i - 1]];
    sortModel.swappedObj.swapped = true;
    sortModel.leftArr.appendChild(createInputGradualEl('button', sortModel.arr[sortModel.i - 1].toString()));
    sortModel.i++;

    removeFromInput(sortModel);

    if (checkDone())
        return;

    addLeft(sortModel, checkDone);
    addRight(sortModel, checkDone);
}

function moveRight(sortModel: SortModel, checkDone: () => boolean) {
    sortModel.leftArr.appendChild(createInputGradualEl('button', sortModel.arr[sortModel.i - 1].toString()));
    deleteChildren(sortModel.leftCurr);
    deleteChildren(sortModel.rightCurr);

    sortModel.i++;

    removeFromInput(sortModel);

    if (checkDone())
        return;

    addLeft(sortModel, checkDone);
    addRight(sortModel, checkDone);
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
    const btn = createInputImmediateEl('button', sortModel.arr[sortModel.i - 1].toString());
    initLeftImmListeners(btn, sortModel, checkDone);
    sortModel.leftCurr.appendChild(btn);
}

function addRight(sortModel: SortModel, checkDone: () => boolean) {
    const btn = createInputImmediateEl('button', sortModel.arr[sortModel.i].toString());
    initRightImmListeners(btn, sortModel, checkDone);
    sortModel.rightCurr.appendChild(btn);
}

function addBatch(sortModel: SortModel): void {
    for (let i = 2; i < sortModel.arr.length; ++i) {
        const btn = createInputGradualEl('button', sortModel.arr[i].toString());
        sortModel.rightArr.appendChild(btn);
    }
}

export function handleBubbleDrawing(arr: Array<number>, swappedObj: { swapped: boolean }): Promise<void> {
    const leftElsContainer = document.getElementById('left-ssc');
    const rightElsContainer = document.getElementById('right-ssc');
    const leftElCurr = document.getElementById('curr-left-ssc');
    const rightElCurr = document.getElementById('curr-right-ssc');

    const sortedArrContainer = getSortedArrDOM();

    if (!leftElsContainer || !rightElsContainer || !leftElCurr || !rightElCurr || !sortedArrContainer) {
        window.location.href = '../../pages/error/error.html';
        return Promise.reject(new Error("Required DOM elements not found"));
    }

    deleteChildren(sortedArrContainer);
    const sortModel = new SortModel(arr, swappedObj, leftElsContainer, rightElsContainer, leftElCurr, rightElCurr);

    return new Promise((resolve) => {
        const checkDone = () => {
            if (sortModel.i >= sortModel.arr.length) {
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