import { Button, FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { VisualizerControllerProps } from './Navbar';

function VisualizerController(props: VisualizerControllerProps): JSX.Element {
  const [algorithm, setAlgorithm] = useState<string>('Selection Sort');
  const [arrayLength, setArrayLength] = useState<number>(100);
  return (
    <Wrapper>
      <FormControl>
        <Select
          value={algorithm}
          onChange={(e) => {
            setAlgorithm(e.target.value as string);
            props.handleSetAlgorithm(e.target.value as string);
          }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{ minWidth: '150px' }}
        >
          <MenuItem value={'Selection Sort'}>
            <span>Selection Sort</span>
          </MenuItem>
          <MenuItem value={'Bubble Sort'}>
            <span>Bubble Sort</span>
          </MenuItem>
          <MenuItem value={'Insertion Sort'}>
            <span>Insertion Sort</span>
          </MenuItem>
          <MenuItem value={'Merge Sort'}>
            <span>Merge Sort</span>
          </MenuItem>
          <MenuItem value={'Quick Sort'}>
            <span>Quick Sort</span>
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <Select
          value={arrayLength}
          onChange={(e) => {
            setArrayLength(e.target.value as number);
            props.handleSetArrayLengh(e.target.value as number);
          }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{ minWidth: '80px' }}
        >
          <MenuItem value={10}>
            <span>10</span>
          </MenuItem>
          <MenuItem value={50}>
            <span>50</span>
          </MenuItem>
          <MenuItem value={100}>
            <span>100</span>
          </MenuItem>
          <MenuItem value={200}>
            <span>200</span>
          </MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={props.handleResetArray}>
        Reset Array
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  margin: 0 30px;

  span {
    font-weight: 600;
    // padding-left: 10px;
  }
`;

export default VisualizerController;
