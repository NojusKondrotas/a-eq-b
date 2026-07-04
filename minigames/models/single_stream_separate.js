import { deleteChildren, getSortedArrDOM } from "../minigame_utils.js";
export class SSSModel {
    arr;
    i;
    j;
    leftDOM;
    rightDOM;
    keyCurrDOM;
    inCurrDOM;
    sortedArrDOM;
    clearPlayground() {
        deleteChildren(this.sortedArrDOM);
        deleteChildren(this.leftDOM);
        deleteChildren(this.rightDOM);
        deleteChildren(this.inCurrDOM);
        deleteChildren(this.keyCurrDOM);
    }
    constructor(arr) {
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
