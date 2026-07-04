import { measureElement, shiftMeasurementHorizontal } from "../../../utils/dom_measurer.js";
import { createInputGradualEl, createInputImmediateEl } from "../../minigame_utils.js";
export function measureDSCPlacements() {
    const parent = document.createElement('div');
    Object.assign(parent.style, {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "100%",
        margin: "0"
    });
    const leftDSC = document.createElement('div');
    leftDSC.id = 'left-dsc';
    const rightDSC = document.createElement('div');
    rightDSC.id = 'right-dsc';
    const selectableElsDSC = document.createElement('div');
    selectableElsDSC.id = 'selectable-els-dsc';
    selectableElsDSC.appendChild(leftDSC);
    selectableElsDSC.appendChild(rightDSC);
    const sortedArrContainer = document.createElement('div');
    sortedArrContainer.id = 'sorted-arr';
    sortedArrContainer.classList.add('arr-container');
    const playground = document.createElement('div');
    playground.id = 'playground';
    playground.appendChild(sortedArrContainer);
    playground.appendChild(selectableElsDSC);
    const container = document.createElement('div');
    container.classList.add('flex', 'w-full', 'h-full', 'flex-col');
    container.appendChild(playground);
    parent.appendChild(container);
    document.body.appendChild(parent);
    const measurements = [];
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
            leftDSC.appendChild(els[i]);
        }
        else {
            rightDSC.appendChild(els[i]);
        }
        measurements.push(measureElement(els[i], document.body, 0, 0, 0));
    }
    for (let i = 0; i < els.length; ++i) {
        if (i % 2 == 0) {
            leftDSC.removeChild(els[i]);
        }
        else {
            rightDSC.removeChild(els[i]);
        }
    }
    measurements.forEach(mes => {
        shiftMeasurementHorizontal(mes, "100%");
        mes.setDisplay('none');
    });
    document.body.removeChild(parent);
    return measurements;
}
