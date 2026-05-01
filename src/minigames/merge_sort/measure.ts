import { ElMeasurementsHandler, measureElement } from "../../dom_measurer.ts";
import { createInputGradualEl, createInputImmediateEl } from "../minigame_utils.ts";

export function measureMergeSortPlacements() {
    const leftEls = document.getElementById('left-els');
    const rightEls = document.getElementById('right-els');
    if (!leftEls || !rightEls) {
        window.location.href = '../../pages/error/error.html';
        return null;
    }

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

    measurements.forEach(mes => mes.setDisplay('none'));

    return measurements;
}