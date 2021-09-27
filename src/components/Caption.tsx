import styled from 'styled-components';
import AlgorithmCaption from './AlgorithmCaption';
import { AlgorithmTypes } from './AlgorithmVisualizer';
import ColorCaption from './ColorCaption';

interface CaptionProps {
  selectedAlgorithm: AlgorithmTypes;
}

function Caption({ selectedAlgorithm }: CaptionProps): JSX.Element {
  return (
    <Wrapper>
      <ColorCaption />
      <AlgorithmCaption selectedAlgorithm={selectedAlgorithm} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
`;

export default Caption;
