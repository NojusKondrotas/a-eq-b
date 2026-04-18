export enum SortType {
    MergeSort,
    InsertionSort
}

export interface SortRunner {
    sortType: SortType;

    run(): void;
}