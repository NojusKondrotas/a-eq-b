export enum SortType {
    MergeSort,
    InsertionSort,
    SelectionSort
}

export interface SortRunner {
    sortType: SortType;

    run(): void;
}