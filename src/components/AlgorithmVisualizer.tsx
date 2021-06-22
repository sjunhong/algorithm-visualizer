import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BubbleSort } from '../algorithms/BubbleSort';
import { TraceArray } from '../algorithms/helper';
import { InsertionSort } from '../algorithms/InsertionSort';
import { MergeSort } from '../algorithms/MergeSort';
import { QuickSort } from '../algorithms/QuickSort';
import { SelectionSort } from '../algorithms/SelectionSort';
import Navbar from './Navbar';
import SortingVisualizer from './SortVisualizer';

interface Algorithms {
  [name: string]: (arr: number[]) => TraceArray;
}

function AlgorithmVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [arrayLength, setArrayLength] = useState<number>(100);
  const [traces, setTraces] = useState<TraceArray>([]);
  const [algorithm, setAlgorithm] = useState<string>('Selection Sort');

  const ALGORITHMS: Algorithms = {
    'Selection Sort': SelectionSort,
    'Bubble Sort': BubbleSort,
    'Insertion Sort': InsertionSort,
    'Merge Sort': MergeSort,
    'Quick Sort': QuickSort,
  };

  const resetArray = (arrayLength: number) => {
    const max = 1000;
    const min = 10;
    setTraces([]);
    console.log('set trace to []');
    setArray([...Array(arrayLength)].map(() => Math.floor(Math.random() * (max - min + 1)) + min));
  };

  const handleSetAlgorithm = (name: string) => {
    setAlgorithm(name);
  };

  const handleSetArrayLength = (arrayLength: number) => {
    setArrayLength(arrayLength);
  };

  const handleResetArray = () => {
    resetArray(arrayLength);
  };

  const createTraces = () => {
    const sort = ALGORITHMS[algorithm];

    if (sort) {
      const sorted = sort([...array]);
      setTraces(sorted);
      console.log('create trace');
    }
  };

  useEffect(() => {
    setTraces([]);
    console.log('algo changed, resetting the traces');
    createTraces();
  }, [algorithm]);

  useEffect(() => {
    resetArray(arrayLength);
  }, [arrayLength]);

  useEffect(() => {
    createTraces();
  }, [array]);

  return (
    <Wrapper>
      <Navbar
        handleResetArray={handleResetArray}
        handleSetAlgorithm={handleSetAlgorithm}
        handleSetArrayLengh={handleSetArrayLength}
      />
      <SortingVisualizer array={array} traces={traces} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: white;
`;

export default AlgorithmVisualizer;