import styled from 'styled-components';
import { AlgorithmTypes } from './AlgorithmVisualizer';
import VisualizerController from './VisualizerController';

export interface VisualizerControllerProps {
  handleResetArray: () => void;
  handleSetAlgorithm: (name: AlgorithmTypes) => void;
  handleSetArrayLengh: (arrayLength: number) => void;
}

function Navbar(props: VisualizerControllerProps): JSX.Element {
  return (
    <Wrapper>
      <img src={`${process.env.PUBLIC_URL}/logo_for_kiosk.svg`} style={{ height: '100%', padding: '0.2vw' }} />
      <VisualizerController
        handleResetArray={props.handleResetArray}
        handleSetAlgorithm={props.handleSetAlgorithm}
        handleSetArrayLengh={props.handleSetArrayLengh}
      />
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
