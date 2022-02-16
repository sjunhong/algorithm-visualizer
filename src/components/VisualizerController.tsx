import { Button, FormControl, MenuItem, Select } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import { AlgorithmTypes } from './AlgorithmVisualizer';

interface VisualizerControllerProps {
  handleResetArray: () => void;
  handleSetAlgorithm: (name: AlgorithmTypes) => void;
  handleSetArrayLengh: (arrayLength: number) => void;
}

function VisualizerController(props: VisualizerControllerProps): JSX.Element {
  const [algorithm, setAlgorithm] = useState<string>('Selection Sort');
  const [arrayLength, setArrayLength] = useState<number>(100);
  const algorithms = ['Selection Sort', 'Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'];
  const arrayLengths = [10, 50, 100, 200];
  return (
    <Wrapper>
      <FormControl margin="none">
        <Select
          value={algorithm}
          onChange={(e) => {
            setAlgorithm(e.target.value as string);
            props.handleSetAlgorithm(e.target.value as AlgorithmTypes);
          }}
          style={formControlStyle('17vw')}
        >
          {algorithms.map((algorithm) => (
            <MenuItem key={algorithm} value={algorithm}>
              <span style={menuItemStyle('17vw')}>{algorithm}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl margin="none">
        <Select
          value={arrayLength}
          onChange={(e) => {
            setArrayLength(e.target.value as number);
            props.handleSetArrayLengh(e.target.value as number);
          }}
          style={formControlStyle('10vw')}
        >
          {arrayLengths.map((arrayLength) => (
            <MenuItem key={arrayLength} value={arrayLength}>
              <span style={menuItemStyle('10vw')}>{arrayLength}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={props.handleResetArray} style={{ minWidth: '8vw', marginLeft: '1.5vw' }}>
        <span>Reset</span>
      </Button>
    </Wrapper>
  );
}

const formControlStyle = (fromWidth: string): React.CSSProperties => {
  return { width: fromWidth, textAlign: 'center', fontWeight: 500, marginLeft: '1.5vw' };
};

const menuItemStyle = (menuWidth: string): React.CSSProperties => {
  return {
    display: 'flex',
    width: menuWidth,
    height: '6vh',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 500,
  };
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 45vw;
  margin: 0 2.5% 0 0;
`;

export default VisualizerController;
