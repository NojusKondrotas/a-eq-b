import { ElMeasurementsHandler, measureElement, shiftMeasurementHorizontal } from "../../../utils/dom_measurer.ts";
import { createInputGradualEl, createInputImmediateEl } from "../../minigame_utils.ts";

export function measureSSCPlacements() {
    const parent = document.createElement('div');
    Object.assign(parent.style, {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "100%",
        margin: "0"
    });

    const leftSSC = document.createElement('div');
    leftSSC.id = 'left-ssc';
    const currLeftSSC = document.createElement('div');
    currLeftSSC.id = 'curr-left-ssc';
    const currRightSSC = document.createElement('div');
    currRightSSC.id = 'curr-right-ssc';
    const rightSSC = document.createElement('div');
    rightSSC.id = 'right-ssc';

    const selectableElsSSC = document.createElement('div');
    selectableElsSSC.id = 'selectable-els-ssc';
    selectableElsSSC.appendChild(leftSSC);
    selectableElsSSC.appendChild(currLeftSSC);
    selectableElsSSC.appendChild(currRightSSC);
    selectableElsSSC.appendChild(rightSSC);
    const sortedArr = document.createElement('div');
    sortedArr.id = 'sorted-arr';
    sortedArr.classList.add('arr-container');

    const playground = document.createElement('div');
    playground.id = 'playground';
    playground.appendChild(sortedArr);
    playground.appendChild(selectableElsSSC);

    const container = document.createElement('div');
    container.classList.add('flex', 'w-full', 'h-full', 'flex-col');
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

    currLeftSSC.appendChild(els[0]);
    currRightSSC.appendChild(els[1]);

    leftSSC.appendChild(els[2]);
    rightSSC.appendChild(els[3]);

    leftSSC.appendChild(els[4]);
    rightSSC.appendChild(els[5]);

    measurements.push(measureElement(els[0], document.body, 0, 0, 0));
    measurements.push(measureElement(els[1], document.body, 0, 0, 0));
    measurements.push(measureElement(els[4], document.body, 0, 0, 0));
    measurements.push(measureElement(els[3], document.body, 0, 0, 0));
    measurements.push(measureElement(els[2], document.body, 0, 0, 0));
    measurements.push(measureElement(els[5], document.body, 0, 0, 0));

    currLeftSSC.removeChild(els[0]);
    currRightSSC.removeChild(els[1]);
    leftSSC.removeChild(els[2]);
    rightSSC.removeChild(els[3]);
    leftSSC.removeChild(els[4]);
    rightSSC.removeChild(els[5]);

    measurements.forEach(mes => {
        shiftMeasurementHorizontal(mes, "100%");
        mes.setDisplay('none');
    });

    document.body.removeChild(parent);

    return measurements;
}