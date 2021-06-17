import styled from 'styled-components';
import VisualizerController from './VisualizerController';

export interface VisualizerControllerProps {
  handleResetArray: () => void;
  handleSetAlgorithm: (name: string) => void;
  handleSetArrayLengh: (arrayLength: number) => void;
}

function Navbar(props: VisualizerControllerProps) {
  return (
    <Wrapper>
      <img
        src={`${process.env.PUBLIC_URL}/algorithm-visualizer-logo.svg`}
        style={{ height: '40px', padding: '0 0 0 10px ' }}
      />
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
  height: 100px;
  background: white;
`;

export default Navbar;
