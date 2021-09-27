import styled from 'styled-components';
import { AlgorithmTypes } from './AlgorithmVisualizer';

interface AlgorithmCaptionProps {
  selectedAlgorithm: AlgorithmTypes;
}

function AlgorithmCaption({ selectedAlgorithm }: AlgorithmCaptionProps): JSX.Element {
  const algorithmCaptions = {
    'Selection Sort': {
      timeComplexity: 'O(n^2)',
      auxiliarySpace: 'O(1)',
      caption: 'Sorts by repeatedly finding the minimum element from unsorted part and putting it at the beginning',
    },
    'Bubble Sort': {
      timeComplexity: 'O(n^2) worst & avg',
      auxiliarySpace: 'O(1)',
      caption: 'Sorts by repeatedly swapping the adjacent elements if they are in wrong order',
    },
    'Insertion Sort': {
      timeComplexity: 'O(n^2)',
      auxiliarySpace: 'O(1)',
      caption: 'Values from the unsorted part are picked and placed at the correct position in the sorted part',
    },
    'Merge Sort': {
      timeComplexity: 'O(nlogn)',
      auxiliarySpace: 'O(n)',
      caption:
        'Sorts by dividing the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.',
    },
    'Quick Sort': {
      timeComplexity: 'O(nlogn) avg, O(n^2) worst',
      auxiliarySpace: 'O(1)',
      caption: 'Sorts by picking an element as pivot and partitions the given array around the picked pivot',
    },
  };
  return (
    <Wrapper>
      <div style={{ fontWeight: 600, fontSize: '1.8vw', alignSelf: 'center' }}>{selectedAlgorithm}</div>
      <div>
        <span>Time Complexity: </span> {algorithmCaptions[selectedAlgorithm].timeComplexity}
      </div>
      <div>
        <span>Auxiliary Space: </span> {algorithmCaptions[selectedAlgorithm].auxiliarySpace}
      </div>
      <div>{algorithmCaptions[selectedAlgorithm].caption}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  align-items: start;
  justify-content: space-between;
  padding: 0 5vw 0 5vw;

  div {
    font-size: 1.4vw;
    padding-top: 0.2vw;
  }

  span {
    font-size: 1.4vw;
    font-weight: 500;
    padding-left: 9vw;
  }
`;

export default AlgorithmCaption;
