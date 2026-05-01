export enum MeasureLine {
    Top,
    Right,
    Bottom,
    Left,
    SlashDiagonal,
    // BackslashDiagonal
}

export class ElMeasurementsHandler {
    measurementLines: Array<HTMLElement>;
    constructor(measurement_lines: Array<HTMLElement>) {
        this.measurementLines = [...measurement_lines];
    }

    setDisplay(mode: string) {
        this.measurementLines.forEach(line => {
            line.style.display = mode;
        });
    }
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
    lineDiagonal.style.width = '200%';
    lineDiagonal.style.height = '200%';
    rotateLine(lineDiagonal, el, rotationOffset);
    container.appendChild(lineDiagonal);

    return lineDiagonal;
}

export function measureElement(el: HTMLElement, container: HTMLElement,
    borderWidth: number, offset: number, rotationOffset: number, lines?: Array<MeasureLine>): ElMeasurementsHandler {
    const measurementLines: Array<HTMLElement> = [];
    if (!lines) {
        lines = Object.values(MeasureLine) as MeasureLine[];
    }
    lines.forEach(line => {
        switch(line) {
            case MeasureLine.Top:
                measurementLines.push(measureElementTop(el, container, borderWidth, offset, '#7c1616'));
                break;
            case MeasureLine.Right:
                measurementLines.push(measureElementRight(el, container, borderWidth, '#7c1616'));
                break;
            case MeasureLine.Bottom:
                measurementLines.push(measureElementBottom(el, container, borderWidth, el.offsetHeight, 'rgb(156, 19, 19)'));
                break;
            case MeasureLine.Left:
                measurementLines.push(measureElementLeft(el, container, borderWidth, offset, 'rgb(156, 19, 19)'));
                break;
            case MeasureLine.SlashDiagonal:
                measurementLines.push(measureElementDiagonal(el, container, borderWidth, offset, rotationOffset + 1, 'rgb(156, 19, 19)'));
                break;
        }
    });

    return new ElMeasurementsHandler(measurementLines);
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