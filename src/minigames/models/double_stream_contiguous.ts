import { deleteChildren, getSortedArrDOM } from "../minigame_utils.ts";
import { Model } from "./model.ts";

export class DSCModel implements Model {
    arr: Array<number>;
    i: number;
    leftDOM: HTMLElement;
    rightDOM: HTMLElement;
    leftCurrDOM: HTMLElement;
    rightCurrDOM: HTMLElement;
    sortedArrDOM: HTMLElement;

    clearPlayground(): void {
        deleteChildren(this.leftDOM);
        deleteChildren(this.rightDOM);
        deleteChildren(this.leftCurrDOM);
        deleteChildren(this.rightCurrDOM);
        deleteChildren(this.sortedArrDOM);
    }

    constructor(arr: Array<number>) {
        this.i = 0;
        this.arr = arr;
        
        const leftElsContainer = document.getElementById('left-dsc');
        const rightElsContainer = document.getElementById('right-dsc');
        const leftElCurr = document.getElementById('curr-left-dsc');
        const rightElCurr = document.getElementById('curr-right-dsc');
        const sortedArrContainer = getSortedArrDOM();

        if (!leftElsContainer || !rightElsContainer || !leftElCurr || !rightElCurr || !sortedArrContainer) {
            window.location.href = '../../pages/error/error.html';
            throw new Error("Required DOM elements not found");
        }

        this.leftDOM = leftElsContainer;
        this.rightDOM = rightElsContainer;
        this.leftCurrDOM = leftElCurr;
        this.rightCurrDOM = rightElCurr;
        this.sortedArrDOM = sortedArrContainer;
    }
}