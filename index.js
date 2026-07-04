import { addMeasuredElEventListeners, measureElement } from "./utils/dom_measurer.js";
import { registerKey, registerKeybind, unregisterKey } from "./utils/keybind-handler.js";
import { hash } from "./utils/numerics.js";
document.addEventListener('DOMContentLoaded', () => {
    const sorts = new Map([
        ['merge', ['A']], ['insertion', ['B']],
        ['selection', ['C']], ['quick', ['D']],
        ['bubble', ['E']], ['heap', ['F']],
    ]);
    for (const [sort, keybinds] of sorts) {
        const sortClickerDOM = document.getElementById(`${sort}-sort`);
        const sortHashDOM = document.getElementById(`${sort}-sort-hash`);
        const sortLabelDOM = document.getElementById(`${sort}-label`);
        if (!sortClickerDOM || !sortHashDOM || !sortLabelDOM) {
            window.location.href = 'pages/error/error.html';
            return;
        }
        sortHashDOM.textContent = hash(sortLabelDOM.textContent);
        sortClickerDOM.addEventListener('mousedown', () => sessionStorage.setItem('selected_sort', sort));
        const measurementsHandler = measureElement(sortLabelDOM, document.body, 5, 0, 5);
        addMeasuredElEventListeners(sortClickerDOM, measurementsHandler);
        measurementsHandler.setDisplay('none');
        registerKeybind(sort, () => {
            sessionStorage.setItem('selected_sort', sort);
            keybinds.forEach(key => unregisterKey(key, { ignoreCase: true }));
            document.location.href = `pages/sorts/${sort}.html`;
        }, keybinds, { ignoreCase: true });
    }
});
document.addEventListener('keydown', (ev) => registerKey(ev.key, { ignoreCase: true }));
document.addEventListener('keyup', (ev) => unregisterKey(ev.key, { ignoreCase: true }));
