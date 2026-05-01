import { initElementMeasurement } from "./dom_measurer.ts";
import { hash } from "./numerics.ts";

document.addEventListener('DOMContentLoaded', () => {
    const sorts = ['merge', 'insertion', 'selection', 'quick', 'bubble', 'heap'];
    sorts.forEach(sort => {
        const sortClickerDOM = document.getElementById(`${sort}-sort`);
        const sortHashDOM = document.getElementById(`${sort}-sort-hash`);
        const sortLabelDOM = document.getElementById(`${sort}-label`);

        if (!sortClickerDOM || !sortHashDOM || !sortLabelDOM) {
            window.location.href = 'pages/error/error.html';
            return;
        }

        sortHashDOM.textContent = hash(sortLabelDOM.textContent);
        sortClickerDOM.addEventListener('click', () => sessionStorage.setItem('selected_sort', sort));

        const measurementsHandler = initElementMeasurement(sortLabelDOM, document.body, 5, 0, 5);
        measurementsHandler.setDisplay('none');
    });
});