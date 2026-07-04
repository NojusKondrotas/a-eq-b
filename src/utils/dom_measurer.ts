export enum MeasureLine {
    Top,
    Right,
    Bottom,
    Left,
    SlashDiagonal,
    // BackslashDiagonal
}

export class ElMeasurementsHandler {
    measurementContainer: HTMLElement;
    constructor(cont: HTMLElement) {
        this.measurementContainer = cont;
    }

    setDisplay(mode: string) {
        this.measurementContainer.style.display = mode;
    }
}

export function shiftMeasurementHorizontal(mes: ElMeasurementsHandler, val: string) {
    const left = getComputedStyle(mes.measurementContainer).left;
    mes.measurementContainer.style.left = `calc(${left} - ${val})`
}

export function addMeasuredElEventListeners(el: HTMLElement, measurements: ElMeasurementsHandler) {
    el.addEventListener('mouseover', () => measurements.setDisplay(''));
    el.addEventListener('mouseleave', () => measurements.setDisplay('none'));
}

export function measureElementTop(el: HTMLElement, container: HTMLElement,
    borderWidth: number, offset: number, color: string) {
    const lineTop = createHorizontalLine(el, borderWidth, offset, color);
    container.appendChild(lineTop);

    return lineTop;
}

export function measureElementRight(el: HTMLElement, container: HTMLElement,
    borderWidth: number, color: string) {
    const lineRight = createVerticalLine(el, borderWidth, el.offsetWidth, color);
    container.appendChild(lineRight);

    return lineRight;
}

export function measureElementBottom(el: HTMLElement, container: HTMLElement,
    borderWidth: number, offset: number, color: string) {
    const lineBottom = createHorizontalLine(el, borderWidth, el.offsetHeight, color);
    container.appendChild(lineBottom);

    return lineBottom;
}

export function measureElementLeft(el: HTMLElement, container: HTMLElement,
    borderWidth: number, offset: number, color: string) {
    const lineLeft = createVerticalLine(el, borderWidth, offset, color);
    container.appendChild(lineLeft);

    return lineLeft;
}

export function measureElementDiagonal(el: HTMLElement, container: HTMLElement,
    borderWidth: number, offset: number, rotationOffset: number,  color: string) {
    const lineDiagonal = createHorizontalLine(el, borderWidth, offset, color);
    lineDiagonal.style.width = '300%';
    lineDiagonal.style.height = '300%';
    rotateLine(lineDiagonal, el, rotationOffset);
    container.appendChild(lineDiagonal);

    return lineDiagonal;
}

export function measureElement(el: HTMLElement, container: HTMLElement,
    borderWidth: number, offset: number, rotationOffset: number, lines?: Array<MeasureLine>): ElMeasurementsHandler {
    const parent = document.createElement('div');
    parent.classList.add('absolute', 'top-0', 'left-0', 'm-0', 'w-full', 'h-full', 'pointer-events-none')
    if (!lines) {
        lines = Object.values(MeasureLine) as MeasureLine[];
    }
    lines.forEach(line => {
        switch(line) {
            case MeasureLine.Top:
                measureElementTop(el, parent, borderWidth, offset, '#7c1616');
                break;
            case MeasureLine.Right:
                measureElementRight(el, parent, borderWidth, '#7c1616');
                break;
            case MeasureLine.Bottom:
                measureElementBottom(el, parent, borderWidth, el.offsetHeight, 'rgb(156, 19, 19)');
                break;
            case MeasureLine.Left:
                measureElementLeft(el, parent, borderWidth, offset, 'rgb(156, 19, 19)');
                break;
            case MeasureLine.SlashDiagonal:
                measureElementDiagonal(el, parent, borderWidth, offset, rotationOffset + 1, 'rgb(156, 19, 19)');
                break;
        }
    });

    document.body.appendChild(parent);

    return new ElMeasurementsHandler(parent);
}

export function initElementMeasurement(el: HTMLElement, container: HTMLElement,
    borderWidth: number, offset: number, rotationOffset: number, lines?: Array<MeasureLine>): ElMeasurementsHandler {
    const handler = measureElement(el, container, borderWidth, offset, rotationOffset, lines);
    addMeasuredElEventListeners(el, handler);

    return handler;
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
    line.style.width = '200%';
    line.style.borderTop = `1px dashed ${color}`;
    line.style.top = `${top}px`;
    line.style.pointerEvents = 'none';

    return line;
}

export function createVerticalLine(el: HTMLElement, borderWidth: number, offset: number, color: string): HTMLElement {
    const left = getAbsoluteLeft(el) + borderWidth + offset;
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.height = '200%';
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