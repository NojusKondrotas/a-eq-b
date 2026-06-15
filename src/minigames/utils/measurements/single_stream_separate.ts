import { ElMeasurementsHandler, measureElement, shiftMeasurementHorizontal } from "../../../utils/dom_measurer.ts";
import { createInputGradualEl, createInputImmediateEl } from "../../minigame_utils.ts";

export function measureSSSPlacements() {
    const parent = document.createElement('div');
    Object.assign(parent.style, {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "100%",
        margin: "0"
    });

    const leftSSS = document.createElement('div');
    leftSSS.id = 'left-sss';
    const currInSSS = document.createElement('div');
    currInSSS.id = 'curr-in-sss';
    const rightSSS = document.createElement('div');
    rightSSS.id = 'right-sss';

    const currKeySSS = document.createElement('div');
    currKeySSS.id = 'curr-key-sss';
    const selectableElsSSS = document.createElement('div');
    selectableElsSSS.id = 'selectable-els-sss';
    selectableElsSSS.appendChild(leftSSS);
    selectableElsSSS.appendChild(currInSSS);
    selectableElsSSS.appendChild(rightSSS);

    const interactiveSSS = document.createElement('div');
    interactiveSSS.id = 'interactive-sss';
    interactiveSSS.appendChild(currKeySSS);
    interactiveSSS.appendChild(selectableElsSSS);
    const sortedArr = document.createElement('div');
    sortedArr.id = 'sorted-arr';
    sortedArr.classList.add('arr-container');

    const playground = document.createElement('div');
    playground.id = 'playground';
    playground.appendChild(sortedArr);
    playground.appendChild(interactiveSSS);

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

    currInSSS.appendChild(els[0]);
    currKeySSS.appendChild(els[1]);

    leftSSS.appendChild(els[2]);
    rightSSS.appendChild(els[3]);

    leftSSS.appendChild(els[4]);
    rightSSS.appendChild(els[5]);

    measurements.push(measureElement(els[0], document.body, 0, 0, 0));
    measurements.push(measureElement(els[1], document.body, 0, 0, 0));
    measurements.push(measureElement(els[4], document.body, 0, 0, 0));
    measurements.push(measureElement(els[3], document.body, 0, 0, 0));
    measurements.push(measureElement(els[2], document.body, 0, 0, 0));
    measurements.push(measureElement(els[5], document.body, 0, 0, 0));

    currInSSS.removeChild(els[0]);
    currKeySSS.removeChild(els[1]);
    leftSSS.removeChild(els[2]);
    rightSSS.removeChild(els[3]);
    leftSSS.removeChild(els[4]);
    rightSSS.removeChild(els[5]);

    measurements.forEach(mes => {
        shiftMeasurementHorizontal(mes, "100%");
        mes.setDisplay('none');
    });

    document.body.removeChild(parent);

    return measurements;
}