import { Button, FormControl, MenuItem, Select } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import { VisualizerControllerProps } from './Navbar';

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
            props.handleSetAlgorithm(e.target.value as string);
          }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{ fontSize: '6rem', width: '500px', textAlign: 'center' }}
          autoWidth={true}
        >
          {algorithms.map((algorithm) => (
            <MenuItem key={algorithm} value={algorithm}>
              <span
                style={{
                  display: 'flex',
                  fontSize: '4rem',
                  width: '500px',
                  height: '150px',
                  fontFamily: 'Roboto',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {algorithm}
              </span>
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
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{ fontSize: '6rem', width: '300px', textAlign: 'center' }}
          autoWidth={true}
        >
          {arrayLengths.map((arrayLength) => (
            <MenuItem key={arrayLength} value={arrayLength}>
              <span
                style={{
                  display: 'flex',
                  fontSize: '4rem',
                  width: '300px',
                  height: '150px',
                  fontFamily: 'Roboto',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {arrayLength}
              </span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={props.handleResetArray} style={{ minWidth: '400px' }}>
        <span>Reset Array</span>
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  margin: 0 2.5% 0 0;

  span {
    font-weight: 500;
    font-size: 70px;
    // padding-left: 10px;
  }
`;

export default VisualizerController;
