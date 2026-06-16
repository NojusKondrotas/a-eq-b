export enum SortType {
    MergeSort,
    InsertionSort,
    SelectionSort,
    BubbleSort,
}

export interface SortRunner {
    sortType: SortType;

    run(): void;
}