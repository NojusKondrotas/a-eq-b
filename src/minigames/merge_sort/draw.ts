import { addComparisonLog } from "../../sorts/sort_logger.ts";
import { createInputGradualEl, createInputImmediateEl, createOutputEl, deleteChildren, getSortedArrDOM, gradualToImmediateEl } from "../minigame_utils.ts";

class SortModel {
    arr: Array<number>;
    leftArr: Array<number>;
    rightArr: Array<number>;
    leftContainer: HTMLElement;
    rightContainer: HTMLElement;
    sortedContainer: HTMLElement;

    lDOM: number = 0;
    rDOM: number = 0;
    w: number;

    leftArrDOM: Array<HTMLElement> = [];
    rightArrDOM: Array<HTMLElement> = [];

    constructor(arr: Array<number>, l: number, m: number, r: number,
        lCont: HTMLElement, rCont: HTMLElement, sCont: HTMLElement) {
        this.arr = arr;
        this.leftArr = arr.slice(l, m + 1);
        this.rightArr = arr.slice(m + 1, r + 1);
        this.w = l;
        this.leftContainer = lCont;
        this.rightContainer = rCont;
        this.sortedContainer = sCont;
    }
}

function handleUpdate(sortModel: SortModel, isLeft: boolean, checkDone: () => void): void {
    const targetArray = isLeft ? sortModel.leftArrDOM : sortModel.rightArrDOM;
    const index = isLeft ? sortModel.lDOM : sortModel.rDOM;
    const container = isLeft ? sortModel.leftContainer : sortModel.rightContainer;

    const val = parseInt(targetArray[index].textContent!);
    const outEl = createOutputEl(val.toString());

    sortModel.sortedContainer.appendChild(outEl);
    container.removeChild(targetArray[index]);

    if (isLeft) {
        if (++sortModel.lDOM < sortModel.leftArrDOM.length) gradualToImmediateEl(sortModel.leftArrDOM[sortModel.lDOM]);
    } else {
        if (++sortModel.rDOM < sortModel.rightArrDOM.length) gradualToImmediateEl(sortModel.rightArrDOM[sortModel.rDOM]);
    }

    sortModel.arr[sortModel.w++] = val;
    addComparisonLog();
    checkDone();
}

function addItemsBatch(sortModel: SortModel, checkDone: () => void) {
    sortModel.leftArr.forEach((num, idx) => {
        const btn = (idx === 0) ? createInputImmediateEl('button', num.toString())
            : createInputGradualEl('button', num.toString());
        btn.addEventListener('mousedown', () => handleUpdate(sortModel, true, checkDone));
        sortModel.leftContainer.appendChild(btn);
        sortModel.leftArrDOM.push(btn);
    });

    sortModel.rightArr.forEach((num, idx) => {
        const btn = (idx === 0) ? createInputImmediateEl('button', num.toString())
            : createInputGradualEl('button', num.toString());
        btn.addEventListener('mousedown', () => handleUpdate(sortModel, false, checkDone));
        sortModel.rightContainer.appendChild(btn);
        sortModel.rightArrDOM.push(btn);
    });
}

export function handleMergeDrawing(arr: Array<number>, l: number, m: number, r: number): Promise<void> {
    const leftElsContainer = document.getElementById('left-dsc');
    const rightElsContainer = document.getElementById('right-dsc');
    const sortedArrContainer = getSortedArrDOM();

    if (!leftElsContainer || !rightElsContainer || !sortedArrContainer) {
        window.location.href = '../../pages/error/error.html';
        return Promise.reject(new Error("Required DOM elements not found"));
    }

    deleteChildren(sortedArrContainer);
    const sortModel = new SortModel(arr, l, m, r, leftElsContainer, rightElsContainer, sortedArrContainer);

    return new Promise((resolve) => {
        const checkDone = () => {
            if (sortModel.leftContainer.children.length === 0
                && sortModel.rightContainer.children.length === 0)
                resolve();
        }

        addItemsBatch(sortModel, checkDone);
    });
}