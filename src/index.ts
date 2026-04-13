import { beep } from "./beep.ts";

document.addEventListener('DOMContentLoaded', () => {
    const mergeSort = document.getElementById('merge-sort');
    const insertionSort = document.getElementById('insertion-sort');

    if (!mergeSort || !insertionSort)
        window.location.href = 'pages/error/error.html';

    (mergeSort as HTMLElement).addEventListener('click', () => sessionStorage.setItem('selected_sort', 'merge'));
    (insertionSort as HTMLElement).addEventListener('click', () => sessionStorage.setItem('selected_sort', 'insertion'));
})