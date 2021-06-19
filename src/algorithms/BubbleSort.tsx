import { addTrace, getSortedIndicies, newTrace, swap, TraceArray } from './helper';

export const BubbleSort = (arr: number[]): TraceArray => {
  const trace = newTrace(arr);

  let index = arr.length - 1;

  while (index > 0) {
    for (let i = 0; i < index; i++) {
      // visualize searching index
      // sorted, searched, selected, swaped
      addTrace(trace, arr, getSortedIndicies(trace), [i, i + 1]);

      if (arr[i] > arr[i + 1]) {
        addTrace(trace, arr, getSortedIndicies(trace), [], [], [i, i + 1]);
        swap(arr, i, i + 1);
      }
    }
    addTrace(trace, arr, [...getSortedIndicies(trace), index]);
    index -= 1;
  }
  addTrace(trace, arr, [...getSortedIndicies(trace), index]);

  return trace;
};
