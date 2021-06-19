import { addTrace, getSortedIndicies, newTrace, swap, TraceArray } from './helper';

export const InsertionSort = (arr: number[]): TraceArray => {
  const traces = newTrace(arr);

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i; j < arr.length; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex;
      addTrace(traces, arr, getSortedIndicies(traces), [j], [minIndex]);
    }
    const temp = arr[minIndex];
    for (let j = minIndex; j > i; j--) {
      addTrace(traces, arr, getSortedIndicies(traces), [], [], [j - 1]);
      arr[j] = arr[j - 1];
      addTrace(traces, arr, getSortedIndicies(traces), [], [], [j]);
    }
    arr[i] = temp;
    addTrace(traces, arr, [...getSortedIndicies(traces), i]);
  }

  return traces;
};
