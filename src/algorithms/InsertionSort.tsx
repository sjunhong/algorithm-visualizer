import { addTrace, getSortedIndicies, newTrace, TraceArray } from './helper';

export const InsertionSort = (arr: number[]): TraceArray => {
  const traces = newTrace(arr);
  // sorted, searched, selected, swaped
  for (let i = 0; i < arr.length; i++) {
    addTrace(traces, arr, [...getSortedIndicies(traces), i], [], [i], []);
    const temp = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      addTrace(traces, arr, getSortedIndicies(traces), [j + 1], [], []);
      addTrace(traces, arr, getSortedIndicies(traces), [], [], [j, j + 1]);
      j--;
    }
    arr[j + 1] = temp;
    addTrace(traces, arr, getSortedIndicies(traces));
  }

  return traces;
};
