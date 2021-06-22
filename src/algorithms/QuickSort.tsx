import { addTrace, getSortedIndicies, newTrace, swap, TraceArray } from './helper';

export const QuickSort = (arr: number[]): TraceArray => {
  const traces = newTrace(arr);

  return quickSortHelper(traces, arr, 0, arr.length - 1);
};

const quickSortHelper = (traces: TraceArray, arr: number[], low: number, high: number): TraceArray => {
  if (low < high) {
    const pivot = partition2(traces, arr, low, high);

    console.log('call helper1', low, pivot - 1);
    quickSortHelper(traces, arr, low, pivot - 1);
    console.log('call helper', pivot + 1, high);
    quickSortHelper(traces, arr, pivot + 1, high);
  } else if (low === high) {
    addTrace(traces, arr, [...getSortedIndicies(traces), low], [], [], []);
  }
  return traces;
};

// const partition1 = (traces: TraceArray, arr: number[], low: number, high: number) => {
//   let swapIndex = low;
//   const pivot = arr[high];

//   while (low < high) {
//     // console.log('swaping', low, high);
//     addTrace(traces, arr, getSortedIndicies(traces), [low, swapIndex], [high]);
//     if (arr[low] < pivot) {
//       addTrace(traces, arr, getSortedIndicies(traces), [], [high], [low, swapIndex]);
//       swap(arr, low, swapIndex);
//       addTrace(traces, arr, getSortedIndicies(traces), [], [high], [low, swapIndex]);
//       swapIndex += 1;
//     }
//     low += 1;
//   }
//   addTrace(traces, arr, getSortedIndicies(traces), [], [], [high, swapIndex]);
//   swap(arr, swapIndex, high);

//   addTrace(traces, arr, [...getSortedIndicies(traces), swapIndex], [], [], []);

//   return swapIndex;
// };

const partition2 = (traces: TraceArray, arr: number[], low: number, high: number) => {
  const pivotIndex = high;
  const pivot = arr[high];

  while (low < high) {
    while (low < arr.length && arr[low] < pivot) {
      addTrace(traces, arr, getSortedIndicies(traces), [low, high], [pivotIndex]);
      low += 1;
    }
    while (high > 0 && arr[high] >= pivot) {
      addTrace(traces, arr, getSortedIndicies(traces), [low, high], [pivotIndex]);
      high -= 1;
    }

    if (low < high) {
      addTrace(traces, arr, getSortedIndicies(traces), [], [pivotIndex], [low, high]);
      swap(arr, low, high);
      addTrace(traces, arr, getSortedIndicies(traces), [], [pivotIndex], [low, high]);
    }
  }
  addTrace(traces, arr, getSortedIndicies(traces), [], [], [pivotIndex, low]);
  swap(arr, pivotIndex, low);
  addTrace(traces, arr, [...getSortedIndicies(traces), low], [], [], []);

  return low;
};
