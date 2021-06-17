import { addTrace, getSortedIndicies, newTrace, swap, TraceArray } from './helper';

export const SelectionSort = (arr: number[]): TraceArray => {
  const trace = newTrace(arr);

  let i, j, min_idx;
  const n = arr.length;
  for (i = 0; i < n - 1; i++) {
    min_idx = i;
    for (j = i + 1; j < n; j++) {
      // visualize searching index
      // sorted, searched, selected, swaped
      addTrace(trace, arr, getSortedIndicies(trace), [j], [min_idx]);

      if (arr[j] < arr[min_idx]) {
        addTrace(trace, arr, getSortedIndicies(trace), [j], [min_idx]);

        min_idx = j;

        //visualize selected index
        addTrace(trace, arr, getSortedIndicies(trace), [j], [min_idx]);
      }
    }

    //visualize swaping indices
    addTrace(trace, arr, getSortedIndicies(trace), [], [], [i, min_idx]);

    swap(arr, i, min_idx);

    //visualize sorted indices
    addTrace(trace, arr, [...getSortedIndicies(trace), i]);
  }

  //visualize sorted indices
  addTrace(trace, arr, [...getSortedIndicies(trace), n - 1]);

  return trace;
};
