import { trace } from 'console';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { addTrace, getSortedIndicies, newTrace, swap, TraceArray } from './algorithms/helper';
import SortingVisualizer from './components/SortVisualizer';

function AlgorithmVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [arrayLength, setArrayLength] = useState<number>(100);
  const [traces, setTraces] = useState<TraceArray>([]);

  const resetArray = (arrayLength: number) => {
    const max = 1000;
    const min = 5;
    setArray([...Array(arrayLength)].map(() => Math.floor(Math.random() * (max - min + 1)) + min));
  };

  const handleSelectionSort = () => {
    // selectionSort(array);
    createTraces();
  };

  const selectionSort = (arr: number[]) => {
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

  const handleResetArray = () => {
    resetArray(arrayLength);
  };

  const createTraces = () => {
    const sorted = selectionSort([...array]);
    if (sorted) {
      setTraces(sorted);
    }
  };

  useEffect(() => {
    resetArray(arrayLength);
    console.log('mounted');
  }, [arrayLength]);

  return (
    <Wrapper>
      <SortingVisualizer array={array} traces={traces} />
      <ControllerWrapper>
        <button onClick={handleResetArray}>Reset Array</button>
        <button onClick={handleSelectionSort}>Set Selection Sort</button>
      </ControllerWrapper>
    </Wrapper>
  );
}

const ControllerWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100px;
  background: black;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100vw;
  height: 100vh;
  background: grey;
`;

export default AlgorithmVisualizer;
