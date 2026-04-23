import { hash } from "./numerics.ts";

document.addEventListener('DOMContentLoaded', () => {
    const mergeSort = document.getElementById('merge-sort');
    const insertionSort = document.getElementById('insertion-sort');

    const mergeSortHash = document.getElementById('merge-sort-hash');
    const insertionSortHash = document.getElementById('insertion-sort-hash');

    if (!mergeSort || !insertionSort || !mergeSortHash || !insertionSortHash) {
        window.location.href = 'pages/error/error.html';
        return;
    }

    mergeSortHash.textContent = hash('merge sort');
    insertionSortHash.textContent = hash('insertion sort');

    mergeSort.addEventListener('click', () => sessionStorage.setItem('selected_sort', 'merge'));
    insertionSort.addEventListener('click', () => sessionStorage.setItem('selected_sort', 'insertion'));
})