import { deleteChildren, getSortedArrDOM } from "../minigame_utils.js";
export class SSCModel {
    arr;
    i;
    leftDOM;
    rightDOM;
    leftCurrDOM;
    rightCurrDOM;
    sortedArrDOM;
    clearPlayground() {
        deleteChildren(this.sortedArrDOM);
        deleteChildren(this.leftDOM);
        deleteChildren(this.rightDOM);
        deleteChildren(this.leftCurrDOM);
        deleteChildren(this.rightCurrDOM);
    }
    constructor(arr) {
        this.i = 0;
        this.arr = arr;
        const leftElsContainer = document.getElementById('left-ssc');
        const rightElsContainer = document.getElementById('right-ssc');
        const leftElCurr = document.getElementById('curr-left-ssc');
        const rightElCurr = document.getElementById('curr-right-ssc');
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
