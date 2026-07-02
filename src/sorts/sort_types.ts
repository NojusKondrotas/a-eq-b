export enum SortType {
    MergeSort,
    InsertionSort,
    SelectionSort,
    BubbleSort,
    QuickSort,
}

export interface SortRunner {
    sortType: SortType;

    run(): void;
}