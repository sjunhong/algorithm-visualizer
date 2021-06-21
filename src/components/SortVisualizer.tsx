import { TraceArray, Trace } from '../algorithms/helper';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SortChart from './SortChart';
import { Button } from '@material-ui/core';

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
  const [timeoutIds, setTimeoutIds] = useState<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (visualState.array !== props.array) {
      console.log('reset array');
      _reset(props.array);
    }

    if (traces !== props.traces) {
      console.log('reset trace');
      setTraces(props.traces);
    }

    clearTimeouts();
  }, [props.array, props.traces]);

  const clearTimeouts = () => {
    timeoutIds.forEach((timeout) => {
      clearTimeout(timeout);
    });

    setTimeoutIds([]);
  };

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
    const timeoutArray: NodeJS.Timeout[] = [];
    const timer = 30;

    traces.forEach((trace, i) => {
      const timeoutId = setTimeout(
        (item) => {
          _changeVisualState(item);
        },
        i * timer,
        trace,
      );

      timeoutArray.push(timeoutId);
    });

    const timeoutId = setTimeout(clearTimeouts, traces.length * timer);
    timeoutArray.push(timeoutId);
    setTimeoutIds(timeoutArray);
  };

  const reset = () => {
    clearTimeouts();
    _reset(visualState.array);
  };

  return (
    <Wrapper>
      <ChartWrapper>
        <SortChart
          array={visualState.array}
          sortedIndices={visualState.sortedIndices}
          searched={visualState.searched}
          selected={visualState.selected}
          swaped={visualState.swaped}
        />
      </ChartWrapper>
      <ButtonWrapper>
        <Button variant="contained" onClick={run} style={{ width: '100px', height: '50px', margin: '10px' }}>
          Run
        </Button>
        <Button variant="contained" onClick={reset} style={{ width: '100px', height: '50px', margin: '10px' }}>
          reset
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10%;
  padding: 10px;
`;

const Wrapper = styled.div`
  width: 90%;
  height: 70%;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;

  background: white;
  padding: 10px;
  border: 3px solid #5f5f5f;
  border-radius: 10px;
`;

export default SortingVisualizer;
