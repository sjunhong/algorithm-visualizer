import { TraceArray, Trace } from '../algorithms/helper';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SortChart from './SortChart';
import { Button } from '@material-ui/core';

interface SortingVisualizerProps {
  array: number[];
  traces: TraceArray;
}

function SortingVisualizer(props: SortingVisualizerProps): JSX.Element {
  const [visualState, setVisualState] = useState<Trace>({
    array: [],
    sortedIndices: [],
    searched: [],
    selected: [],
    swaped: [],
  });
  const [traces, setTraces] = useState<TraceArray>([]);
  const [timeoutIds, setTimeoutIds] = useState<NodeJS.Timeout[]>([]);
  const isPlaying = useRef<boolean>(false);

  useEffect(() => {
    if (visualState.array !== props.array) {
      console.log('reset array');
      _reset(props.array);
    }

    if (traces !== props.traces) {
      console.log('reset trace');
      setTraces(props.traces);
    }
    isPlaying.current = false;
    clearTimeouts();
  }, [props.array, props.traces]);

  const clearTimeouts = () => {
    timeoutIds.forEach((timeout) => {
      clearTimeout(timeout);
    });
    isPlaying.current = false;
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
    if (isPlaying.current == false) {
      isPlaying.current = true;
      console.log('set playing', isPlaying.current);
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
    } else {
      console.log('already playing');
    }
  };

  const reset = () => {
    isPlaying.current = false;
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
        <Button variant="contained" onClick={run} style={ButtonStyle}>
          <span>Run</span>
        </Button>
        <Button variant="contained" onClick={reset} style={ButtonStyle}>
          <span>Stop</span>
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

const ButtonStyle = { width: '10%', height: '100%', margin: '1%' };

const Wrapper = styled.div`
  width: 100vw;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 8vh;
  padding: 1.5vh;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 90%;

  background: white;
  padding: 1%;
  border: 3px solid #5f5f5f;
  border-radius: 10px;
`;

export default SortingVisualizer;
