import { addComparisonLog } from "../../sorts/sort_logger.ts";
import { createInputGradualEl, createInputImmediateEl, createOutputEl, getSortedArrDOM, gradualToImmediateEl } from "../minigame_utils.ts";

let leftEls: Array<HTMLElement>, rightEls: Array<HTMLElement>;
let lDOM: number, rDOM: number, w: number;

export function deleteChildren(el: HTMLElement) {
    while (el.firstChild) {
        el.removeChild(el.lastChild as ChildNode);
    }
}

function handleUpdateLeft(parent: HTMLElement, sortedArr: Array<number>, sortedArrContainer: HTMLElement,
                          checkDone: () => void): void {
    const val = parseInt(leftEls[lDOM].textContent);
    const outEl = createOutputEl(val.toString());
    sortedArrContainer.appendChild(outEl);
    parent.removeChild(leftEls[lDOM]);
    ++lDOM < leftEls.length ? gradualToImmediateEl(leftEls[lDOM]) : lDOM;
    sortedArr[w++] = val;
    checkDone();
}

function handleUpdateRight(parent: HTMLElement, sortedArr: Array<number>, sortedArrContainer: HTMLElement,
                          checkDone: () => void): void {
    const val = parseInt(rightEls[rDOM].textContent);
    const outEl = createOutputEl(val.toString());
    sortedArrContainer.appendChild(outEl);
    parent.removeChild(rightEls[rDOM]);
    ++rDOM < rightEls.length ? gradualToImmediateEl(rightEls[rDOM]) : rDOM;
    sortedArr[w++] = val;
    checkDone();
}

function addItemsBatch(parent: HTMLElement, arr: Array<number>, arrDOM: Array<HTMLElement>, sortedArrContainer:
                       HTMLElement, writableArr: Array<number>,
                       isleft: boolean, checkDone: () => void) {
    arr.forEach((num, idx) => {
        let btn: HTMLElement;
        if (idx == 0) {
            btn = createInputImmediateEl('button', num.toString());
        } else {
            btn = createInputGradualEl('button', num.toString());
        }

        btn.addEventListener('mousedown', () => {
            isleft
            ? handleUpdateLeft(parent, writableArr, sortedArrContainer, checkDone)
            : handleUpdateRight(parent, writableArr, sortedArrContainer, checkDone);

            addComparisonLog();
        });

        parent.appendChild(btn);
        arrDOM.push(btn);
    });
}

export function handleMergeDrawing(arr: Array<number>, l: number, m: number, r: number): Promise<void> {
    const leftElsContainer = document.getElementById('left-els');
    const rightElsContainer = document.getElementById('right-els');
    const sortedArrContainer = getSortedArrDOM();

    if (!leftElsContainer || !rightElsContainer || !sortedArrContainer) {
        window.location.href = '../../pages/error/error.html';
    }

    deleteChildren(sortedArrContainer as HTMLElement);
    
    let left = arr.slice(l, m+1);
    let right = arr.slice(m+1, r+1);

    lDOM = 0;
    rDOM = 0;
    w = l;

    leftEls = [], rightEls = [];

    return new Promise((resolve) => {
        const checkDone = () => {
            if ((leftElsContainer as HTMLElement).children.length === 0
                && (rightElsContainer as HTMLElement).children.length === 0)
                resolve();
        }

        addItemsBatch(leftElsContainer as HTMLElement, left, leftEls, sortedArrContainer as HTMLElement, arr, true, checkDone);
        addItemsBatch(rightElsContainer as HTMLElement, right, rightEls, sortedArrContainer as HTMLElement, arr, false, checkDone);
    });
}