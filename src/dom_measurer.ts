export interface ElementMeasurements {
    lineTop: HTMLElement;
    lineRight: HTMLElement;
    lineBottom: HTMLElement;
    lineLeft: HTMLElement;
    lineDiagonal: HTMLElement;
}

export class ElMeasurementsHandler {
    elMeasurements: ElementMeasurements;
    constructor(el_measurements: ElementMeasurements) {
        this.elMeasurements = {...el_measurements};
    }

    setDisplay(mode: string) {
        this.elMeasurements.lineTop.style.display = mode;
        this.elMeasurements.lineBottom.style.display = mode;
        this.elMeasurements.lineLeft.style.display = mode;
        this.elMeasurements.lineRight.style.display = mode;
        this.elMeasurements.lineDiagonal.style.display = mode;
    }
}

export function measureElement(el: HTMLElement, container: HTMLElement,
    borderWidth: number, offset: number, rotationOffset: number): ElMeasurementsHandler {
    const lineTop = createHorizontalLine(el, borderWidth, offset, '#7c1616');
    const lineBottom = createHorizontalLine(el, borderWidth, el.offsetHeight, 'rgb(156, 19, 19)');
    const lineLeft = createVerticalLine(el, borderWidth, offset, 'rgb(156, 19, 19)');
    const lineRight = createVerticalLine(el, borderWidth, el.offsetWidth, '#7c1616');
    const lineDiagonal = createHorizontalLine(el, borderWidth, offset + 1, 'rgb(156, 19, 19)');
    lineDiagonal.style.width = '200%';
    lineDiagonal.style.height = '200%';
    rotateLine(lineDiagonal, el, rotationOffset);
    container.appendChild(lineTop);
    container.appendChild(lineBottom);
    container.appendChild(lineLeft);
    container.appendChild(lineRight);
    container.appendChild(lineDiagonal);

    return new ElMeasurementsHandler({ lineTop, lineRight, lineBottom, lineLeft, lineDiagonal } satisfies ElementMeasurements);
}

export function getAbsoluteTop(el: HTMLElement) {
    let sum = 0;
    while (el) {
        sum += el.offsetTop;
        el = el.offsetParent as HTMLElement;
    }
    
    return sum;
}

export function getAbsoluteLeft(el: HTMLElement) {
    let sum = 0;
    while (el) {
        sum += el.offsetLeft;
        el = el.offsetParent as HTMLElement;
    }
    
    return sum;
}

export function createHorizontalLine(el: HTMLElement, borderWidth: number, offset: number, color: string): HTMLElement {
    const top = getAbsoluteTop(el) + borderWidth + offset;
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = '100%';
    line.style.borderTop = `1px dashed ${color}`;
    line.style.top = `${top}px`;
    line.style.pointerEvents = 'none';

    return line;
}

export function createVerticalLine(el: HTMLElement, borderWidth: number, offset: number, color: string): HTMLElement {
    const left = getAbsoluteLeft(el) + borderWidth + offset;
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.height = '100%';
    line.style.borderLeft = `1px dashed ${color}`;
    line.style.top = '0';
    line.style.left = `${left}px`;
    line.style.pointerEvents = 'none';

    return line;
}

export function rotateLine(el: HTMLElement, refEl: HTMLElement, offset: number) {
    const left = getAbsoluteLeft(refEl) + refEl.offsetWidth + offset;
    const height = refEl.offsetHeight;
    const width = refEl.offsetWidth;
    const angle = Math.atan(width / height) + Math.PI / 2;
    el.style.transformOrigin = `${left}px 0px`;
    el.style.transform = `rotate(${angle}rad)`;
}