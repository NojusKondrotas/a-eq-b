export var MeasureLine;
(function (MeasureLine) {
    MeasureLine[MeasureLine["Top"] = 0] = "Top";
    MeasureLine[MeasureLine["Right"] = 1] = "Right";
    MeasureLine[MeasureLine["Bottom"] = 2] = "Bottom";
    MeasureLine[MeasureLine["Left"] = 3] = "Left";
    MeasureLine[MeasureLine["SlashDiagonal"] = 4] = "SlashDiagonal";
    // BackslashDiagonal
})(MeasureLine || (MeasureLine = {}));
export class ElMeasurementsHandler {
    measurementContainer;
    constructor(cont) {
        this.measurementContainer = cont;
    }
    setDisplay(mode) {
        this.measurementContainer.style.display = mode;
    }
}
export function shiftMeasurementHorizontal(mes, val) {
    const left = getComputedStyle(mes.measurementContainer).left;
    mes.measurementContainer.style.left = `calc(${left} - ${val})`;
}
export function addMeasuredElEventListeners(el, measurements) {
    el.addEventListener('mouseover', () => measurements.setDisplay(''));
    el.addEventListener('mouseleave', () => measurements.setDisplay('none'));
}
export function measureElementTop(el, container, borderWidth, offset, color) {
    const lineTop = createHorizontalLine(el, borderWidth, offset, color);
    container.appendChild(lineTop);
    return lineTop;
}
export function measureElementRight(el, container, borderWidth, color) {
    const lineRight = createVerticalLine(el, borderWidth, el.offsetWidth, color);
    container.appendChild(lineRight);
    return lineRight;
}
export function measureElementBottom(el, container, borderWidth, offset, color) {
    const lineBottom = createHorizontalLine(el, borderWidth, el.offsetHeight, color);
    container.appendChild(lineBottom);
    return lineBottom;
}
export function measureElementLeft(el, container, borderWidth, offset, color) {
    const lineLeft = createVerticalLine(el, borderWidth, offset, color);
    container.appendChild(lineLeft);
    return lineLeft;
}
export function measureElementDiagonal(el, container, borderWidth, offset, rotationOffset, color) {
    const lineDiagonal = createHorizontalLine(el, borderWidth, offset, color);
    lineDiagonal.style.width = '300%';
    lineDiagonal.style.height = '300%';
    rotateLine(lineDiagonal, el, rotationOffset);
    container.appendChild(lineDiagonal);
    return lineDiagonal;
}
export function measureElement(el, container, borderWidth, offset, rotationOffset, lines) {
    const parent = document.createElement('div');
    parent.classList.add('absolute', 'top-0', 'left-0', 'm-0', 'w-full', 'h-full', 'pointer-events-none');
    if (!lines) {
        lines = Object.values(MeasureLine);
    }
    lines.forEach(line => {
        switch (line) {
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
export function initElementMeasurement(el, container, borderWidth, offset, rotationOffset, lines) {
    const handler = measureElement(el, container, borderWidth, offset, rotationOffset, lines);
    addMeasuredElEventListeners(el, handler);
    return handler;
}
export function getAbsoluteTop(el) {
    let sum = 0;
    while (el) {
        sum += el.offsetTop;
        el = el.offsetParent;
    }
    return sum;
}
export function getAbsoluteLeft(el) {
    let sum = 0;
    while (el) {
        sum += el.offsetLeft;
        el = el.offsetParent;
    }
    return sum;
}
export function createHorizontalLine(el, borderWidth, offset, color) {
    const top = getAbsoluteTop(el) + borderWidth + offset;
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = '200%';
    line.style.borderTop = `1px dashed ${color}`;
    line.style.top = `${top}px`;
    line.style.pointerEvents = 'none';
    return line;
}
export function createVerticalLine(el, borderWidth, offset, color) {
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
export function rotateLine(el, refEl, offset) {
    const left = getAbsoluteLeft(refEl) + refEl.offsetWidth + offset;
    const height = refEl.offsetHeight;
    const width = refEl.offsetWidth;
    const angle = Math.atan(width / height) + Math.PI / 2;
    el.style.transformOrigin = `${left}px 0px`;
    el.style.transform = `rotate(${angle}rad)`;
}
