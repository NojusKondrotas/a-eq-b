import { ElMeasurementsHandler, measureElement, shiftMeasurementHorizontal } from "../../utils/dom_measurer.ts";
import { createInputGradualEl, createInputImmediateEl } from "../minigame_utils.ts";

export function measureMergeSortPlacements() {
    const parent = document.createElement('div');
    Object.assign(parent.style, {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "100%",
        margin: "0"
    });
    const container = document.createElement('div');
    container.classList.add('flex', 'w-full', 'h-full', 'flex-col')
    const playground = document.createElement('div');
    playground.id = 'playground';
    const sortedArr = document.createElement('div');
    sortedArr.id = 'sorted-arr';
    const selectableEls = document.createElement('div');
    selectableEls.id = 'selectable-els';
    const leftEls = document.createElement('div');
    leftEls.id = 'left-els';
    const rightEls = document.createElement('div');
    rightEls.id = 'right-els';
    selectableEls.appendChild(leftEls);
    selectableEls.appendChild(rightEls);
    playground.appendChild(sortedArr);
    playground.appendChild(selectableEls);
    container.appendChild(playground);
    parent.appendChild(container);
    document.body.appendChild(parent);

    const measurements: Array<ElMeasurementsHandler> = [];

    const els = [
        createInputImmediateEl('button', '1'),
        createInputImmediateEl('button', '2'),
        createInputGradualEl('button', '3'),
        createInputGradualEl('button', '4'),
        createInputGradualEl('button', '5'),
        createInputGradualEl('button', '6')
    ];
    for (let i = 0; i < els.length; ++i) {
        if (i % 2 == 0) {
            leftEls.appendChild(els[i]);
        } else {
            rightEls.appendChild(els[i]);
        }
        measurements.push(measureElement(els[i], document.body, 0, 0, 0));
    }
    for (let i = 0; i < els.length; ++i) {
        if (i % 2 == 0) {
            leftEls.removeChild(els[i]);
        } else {
            rightEls.removeChild(els[i]);
        }
    }

    measurements.forEach(mes => {
        shiftMeasurementHorizontal(mes, "100%");
        mes.setDisplay('none');
    });

    document.body.removeChild(parent);

    return measurements;
}