import { addTrace, getSortedIndicies, newTrace, TraceArray } from './helper';

export const MergeSort = (arr: number[]): TraceArray => {
  const traces = newTrace(arr);

  if (arr === []) {
    return traces;
  }
  const sorted = MergeSortHelper(traces, arr, 0, arr.length);
  return traces;
};

const MergeSortHelper = (traces: TraceArray, arr: number[], start: number, end: number): number[] => {
  if (start === end - 1) {
    return [arr[start]];
  }

  const middle = Math.floor((start + end) / 2);

  MergeSortHelper(traces, arr, start, middle);
  addTrace(
    traces,
    arr,
    [...Array(middle - start).keys()].map((index: number) => index + start),
  );

  MergeSortHelper(traces, arr, middle, end);
  addTrace(
    traces,
    arr,
    [...Array(end - middle).keys()].map((index: number) => index + middle),
  );

  return merge(traces, arr, start, middle, end);
};

const merge = (traces: TraceArray, arr: number[], start: number, middle: number, end: number): number[] => {
  const leftHalf = arr.slice(start, middle);
  const rightHalf = arr.slice(middle, end);
  //reset colored sorted indices
  addTrace(traces, arr, []);

  let leftIndex = 0;
  let rightIndex = 0;
  let mainIndex = 0;
  while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
    // addTrace(traces, arr, getSortedIndicies(traces), [], [], [start + mainIndex]);
    addTrace(traces, arr, getSortedIndicies(traces), [], [], [start + leftIndex, middle + rightIndex]);

    if (leftHalf[leftIndex] <= rightHalf[rightIndex]) {
      arr[start + mainIndex] = leftHalf[leftIndex];
      leftIndex += 1;
    } else {
      arr[start + mainIndex] = rightHalf[rightIndex];
      rightIndex += 1;
    }

    addTrace(traces, arr, [...getSortedIndicies(traces), start + mainIndex]);
    mainIndex += 1;
  }
  addTrace(traces, arr, [...getSortedIndicies(traces), start + mainIndex]);
  while (leftIndex < leftHalf.length) {
    // addTrace(traces, arr, getSortedIndicies(traces), [], [], [start + mainIndex]);
    addTrace(traces, arr, getSortedIndicies(traces), [], [], [start + leftIndex]);

    arr[start + mainIndex] = leftHalf[leftIndex];
    leftIndex += 1;
    mainIndex += 1;

    addTrace(traces, arr, [...getSortedIndicies(traces), start + mainIndex]);
  }
  while (rightIndex < rightHalf.length) {
    // addTrace(traces, arr, getSortedIndicies(traces), [], [], [start + mainIndex]);
    addTrace(traces, arr, getSortedIndicies(traces), [], [], [middle + rightIndex]);

    arr[start + mainIndex] = rightHalf[rightIndex];
    rightIndex += 1;
    mainIndex += 1;

    addTrace(traces, arr, [...getSortedIndicies(traces), start + mainIndex]);
  }

  return arr.slice(start, end);
};
