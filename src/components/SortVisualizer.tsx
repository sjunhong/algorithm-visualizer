import { TraceArray, Trace } from '../algorithms/helper';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SortChart from './SortChart';

interface SortingVisualizerProps {
  array: number[];
  traces: TraceArray;
}

function SortingVisualizer(props: SortingVisualizerProps) {
  const [visualState, setVisualState] = useState<Trace>({
    array: [],
    sortedIndices: [],
    searched: [],
    selected: [],
    swaped: [],
  });
  const [traces, setTraces] = useState<TraceArray>([]);

  useEffect(() => {
    if (visualState.array !== props.array) {
      console.log('reset array');
      _reset(props.array);
    }

    if (traces !== props.traces) {
      console.log('reset trace');
      setTraces(props.traces);
    }
  }, [props.array, props.traces]);

  const _reset = (array: number[]) => {
    setVisualState({
      array,
      sortedIndices: [],
      searched: [],
      selected: [],
      swaped: [],
    });
  };

  const _changeVisualState = (trace: Trace) => {
    setVisualState({
      array: trace.array,
      sortedIndices: trace.sortedIndices,
      searched: trace.searched,
      selected: trace.selected,
      swaped: trace.swaped,
    });
  };

  const run = () => {
    traces.forEach((trace, i) => {
      setTimeout(
        (item) => {
          _changeVisualState(item);
        },
        i * 5,
        trace,
      );
    });
  };

  return (
    <>
      <Wrapper>
        <SortChart
          array={visualState.array}
          sortedIndices={visualState.sortedIndices}
          searched={visualState.searched}
          selected={visualState.selected}
          swaped={visualState.swaped}
        />
      </Wrapper>
      <button onClick={run}>run</button>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100vw;
  height: 100vh;
  background: grey;
`;

export default SortingVisualizer;
