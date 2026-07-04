export function deleteChildren(el) {
    while (el.firstChild) {
        el.removeChild(el.lastChild);
    }
}
export function getChild(el, idx) {
    const child = el.children.item(idx);
    if (child)
        return child;
    return child;
}
export function getSortedArrDOM() {
    return document.getElementById('sorted-arr');
}
export function createInputImmediateEl(tagName, text) {
    const el = document.createElement(tagName);
    el.classList.add('box', 'input-el-imm');
    el.textContent = text;
    return el;
}
export function createInputGradualEl(tagName, text) {
    const el = document.createElement(tagName);
    el.classList.add('thin-box', 'input-el-grad');
    el.textContent = text;
    return el;
}
export function gradualToImmediateEl(el) {
    el.classList = '';
    el.classList.add('box', 'input-el-imm');
    return el;
}
export function createOutputEl(text) {
    const container = document.createElement('div');
    const p = document.createElement('p');
    container.classList.add('output-el');
    p.classList.add('thin-box', 'output-el-val');
    p.textContent = text;
    container.appendChild(p);
    return container;
}
export function highlightWrongElement(container) {
    const el = document.createElement('img');
    el.src = 'res/OH.png';
    el.alt = 'Very surprised emoji. Element disatisfies sort order.';
    el.classList.add('output-el-img');
    container.appendChild(el);
}
export function getArrayElementValue(container) {
    const el = container.children[0];
    return parseInt(el.textContent);
}
export function satisfiesSortOrderDOM(container) {
    const children = container.children;
    const len = container.children.length;
    let isCorrect = true;
    for (let i = 1; i < len; ++i) {
        if (getArrayElementValue(children[i - 1]) > getArrayElementValue(children[i])) {
            highlightWrongElement(children[i]);
            isCorrect = false;
        }
    }
    return isCorrect;
}
