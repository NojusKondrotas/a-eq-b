export function getSortedArrDOM(): HTMLElement | null {
    return document.getElementById('sorted-arr');
}

export function createInputImmediateEl(tagName: string, text: string): HTMLElement {
    const el = document.createElement(tagName);
    el.classList.add('box', 'input-el-imm');
    el.textContent = text;

    return el;
}

export function createInputGradualEl(tagName: string, text: string): HTMLElement {
    const el = document.createElement(tagName);
    el.classList.add('thin-box', 'input-el-grad');
    el.textContent = text;

    return el;
}

export function gradualToImmediateEl(el: HTMLElement): HTMLElement {
    el.classList = '';
    el.classList.add('box', 'input-el-imm');

    return el;
}

export function createOutputEl(text: string): HTMLElement {
    const container = document.createElement('div');
    const p = document.createElement('p');
    container.classList.add('output-el');
    p.classList.add('thin-box', 'output-el-val');
    p.textContent = text;
    container.appendChild(p);

    return container;
}

export function highlightWrongElement(container: Element): void {
    const el: HTMLImageElement = document.createElement('img');
    el.src = 'res/OH.png';
    el.alt = 'Very surprised emoji. Element disatisfies sort order.';
    el.classList.add('output-el-img');
    container.appendChild(el);
}

export function getArrayElementValue(container: Element): number {
    const el = container.children[0];
    console.log(el.textContent);

    return parseInt(el.textContent);
}

export function satisfiesSortOrderDOM(container: HTMLElement): boolean  {
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