import { deleteChildren, getSortedArrDOM } from "../minigame_utils.ts";
import { Model } from "./model.ts";

export class SSSModel implements Model {
    arr: Array<number>;
    i: number;
    j: number;
    leftDOM: HTMLElement;
    rightDOM: HTMLElement;
    keyCurrDOM: HTMLElement;
    inCurrDOM: HTMLElement;
    sortedArrDOM: HTMLElement;

    clearDOM(): void {
        deleteChildren(this.sortedArrDOM);
        deleteChildren(this.leftDOM);
        deleteChildren(this.rightDOM);
        deleteChildren(this.inCurrDOM);
        deleteChildren(this.keyCurrDOM);
    }

    constructor(arr: Array<number>) {
        this.i = 0;
        this.j = 0;
        this.arr = arr;

        const leftElsContainer = document.getElementById('left-sss');
        const rightElsContainer = document.getElementById('right-sss');
        const keyElCurr = document.getElementById('curr-key-sss');
        const inElCurr = document.getElementById('curr-in-sss');
    
        const sortedArrContainer = getSortedArrDOM();

        if (!leftElsContainer || !rightElsContainer || !inElCurr || !keyElCurr || !sortedArrContainer) {
            window.location.href = '../../pages/error/error.html';
            throw new Error("Required DOM elements not found");
        }

        this.leftDOM = leftElsContainer;
        this.rightDOM = rightElsContainer;
        this.keyCurrDOM = keyElCurr;
        this.inCurrDOM = inElCurr;
        this.sortedArrDOM = sortedArrContainer;
    }
}