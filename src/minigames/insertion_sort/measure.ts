import { ElMeasurementsHandler, measureElement, shiftMeasurementHorizontal } from "../../utils/dom_measurer.ts";
import { createInputGradualEl, createInputImmediateEl } from "../minigame_utils.ts";

export function measureInsertionSortPlacements() {
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
    selectableEls.id = 'selectable-els-insertion';
    const currBothEls = document.createElement('div');
    currBothEls.id = 'curr-both-insertion';
    const leftEls = document.createElement('div');
    leftEls.id = 'left-insertion';
    const rightEls = document.createElement('div');
    rightEls.id = 'right-insertion';
    const leftCurr = document.createElement('div');
    leftCurr.id = 'curr-left-insertion';
    const rightCurr = document.createElement('div');
    rightCurr.id = 'curr-right-insertion';
    selectableEls.appendChild(leftEls);
    currBothEls.appendChild(leftCurr);
    currBothEls.appendChild(rightCurr);
    selectableEls.appendChild(currBothEls);
    selectableEls.appendChild(rightEls);
    playground.appendChild(sortedArr);
    playground.appendChild(selectableEls);
    container.appendChild(playground);
    parent.appendChild(container);
    document.body.appendChild(parent);

    const measurements: Array<ElMeasurementsHandler> = [];
    const els = [
        createInputImmediateEl('button', '4'),
        createInputImmediateEl('button', '3'),

        createInputGradualEl('button', '5'),
        createInputGradualEl('button', '2'),

        createInputGradualEl('button', '6'),
        createInputGradualEl('button', '1')
    ];

    leftCurr.appendChild(els[0]);
    rightCurr.appendChild(els[1]);

    leftEls.appendChild(els[2]);
    rightEls.appendChild(els[3]);

    leftEls.appendChild(els[4]);
    rightEls.appendChild(els[5]);

    measurements.push(measureElement(els[0], document.body, 0, 0, 0));
    measurements.push(measureElement(els[1], document.body, 0, 0, 0));
    measurements.push(measureElement(els[4], document.body, 0, 0, 0));
    measurements.push(measureElement(els[3], document.body, 0, 0, 0));
    measurements.push(measureElement(els[2], document.body, 0, 0, 0));
    measurements.push(measureElement(els[5], document.body, 0, 0, 0));

    leftCurr.removeChild(els[0]);
    rightCurr.removeChild(els[1]);
    leftEls.removeChild(els[2]);
    rightEls.removeChild(els[3]);
    leftEls.removeChild(els[4]);
    rightEls.removeChild(els[5]);

    measurements.forEach(mes => {
        shiftMeasurementHorizontal(mes, "100%");
        mes.setDisplay('none');
    });

    document.body.removeChild(parent);

    return measurements;
}