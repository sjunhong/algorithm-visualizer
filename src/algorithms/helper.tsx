export interface Trace {
  array: number[];
  sortedIndices: number[];
  searched: number[];
  selected: number[];
  swaped: number[];
}

export type TraceArray = Trace[];

export const newTrace = (array: number[]): TraceArray => {
  return [
    {
      array: [...array],
      sortedIndices: [],
      searched: [],
      selected: [],
      swaped: [],
    },
  ];
};

export const addTrace = (
  trace: TraceArray,
  array: number[],
  sortedIndices: number[] = [],
  searched: number[] = [],
  selected: number[] = [],
  swaped: number[] = [],
): void => {
  trace.push({
    array: [...array],
    sortedIndices: [...sortedIndices],
    searched: [...searched],
    selected: [...selected],
    swaped: [...swaped],
  });
};

export const getSortedIndicies = (trace: TraceArray): number[] => {
  return trace[trace.length - 1].sortedIndices;
};

export const swap = (array: number[], index1: number, index2: number): void => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};
