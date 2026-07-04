export enum SortType {
    MergeSort,
    InsertionSort,
    SelectionSort,
    BubbleSort,
    QuickSort,
    HeapSort,
}

export interface SortRunner {
    sortType: SortType;

    run(): void;
}