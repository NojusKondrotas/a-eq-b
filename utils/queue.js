// https://github.com/sanori/queue-js.git
export class Queue {
    _stack1 = [];
    _stack2 = [];
    constructor() { }
    push(item) {
        this._stack1.push(item);
    }
    shift() {
        if (this._stack2.length === 0) {
            const tmp = this._stack2;
            this._stack2 = this._stack1.reverse();
            this._stack1 = tmp;
        }
        const val = this._stack2.pop();
        return val ? val : null;
    }
    get length() {
        return this._stack1.length + this._stack2.length;
    }
}
