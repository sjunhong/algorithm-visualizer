import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { AlgorithmTypes } from './AlgorithmVisualizer';
import VisualizerController from './VisualizerController';

interface NavbarProps {
  handleResetArray: () => void;
  handleSetAlgorithm: (name: AlgorithmTypes) => void;
  handleSetArrayLengh: (arrayLength: number) => void;
  handleToggleVisualizer: () => void;
  isSorting: boolean;
}

function Navbar(props: NavbarProps): JSX.Element {
  return (
    <Wrapper>
      <img
        src={`${process.env.PUBLIC_URL}/logo_for_kiosk.svg`}
        style={{ width: '40vw', height: '10vh', padding: '0.1vw 0 0 0' }}
      />
      <Button
        variant="outlined"
        color="secondary"
        onClick={props.handleToggleVisualizer}
        style={{
          maxWidth: '9vw',
          minWidth: '9vw',
          maxHeight: '5.5vh',
          minHeight: '5.5vh',
          position: 'absolute',
          left: 'calc(50vw - 4.5vw)',
        }}
      >
        {props.isSorting ? <span>Graph</span> : <span>Sorting</span>}
      </Button>
      {props.isSorting ? (
        <VisualizerController
          handleResetArray={props.handleResetArray}
          handleSetAlgorithm={props.handleSetAlgorithm}
          handleSetArrayLengh={props.handleSetArrayLengh}
        />
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 10%;
  background: white;
`;

export default Navbar;
