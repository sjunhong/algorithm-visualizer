import styled from 'styled-components';
import { Trace } from '../algorithms/helper';
import Bar from './Bar';

const genBarGraph = ({ array, sortedIndices, searched, selected, swaped }: Trace) => {
  return array.map((num, idx) => {
    const width = 100 / array.length;
    const height = (num / 1000) * 100;
    const IsSorted = sortedIndices.includes(idx);
    const IsSearched = searched.includes(idx);
    const IsSelected = selected.includes(idx);
    const IsSwaped = swaped.includes(idx);
    return (
      <Bar
        key={`${idx}_${num}`}
        width={width}
        height={height}
        IsSorted={IsSorted}
        IsSearched={IsSearched}
        IsSelected={IsSelected}
        IsSwaped={IsSwaped}
      ></Bar>
    );
  });
};

const SortChart = ({ array, sortedIndices, searched, selected, swaped }: Trace): JSX.Element => {
  return <Wrapper>{genBarGraph({ array, sortedIndices, searched, selected, swaped })}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  background: white;
`;

export default SortChart;
