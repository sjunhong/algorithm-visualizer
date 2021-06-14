import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

function AlgorithmVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [arrayLength, setArrayLength] = useState<number>(100);

  function resetArray(arrayLength: number) {
    const max = 1000;
    const min = 5;
    setArray([...Array(arrayLength)].map(() => Math.floor(Math.random() * (max - min + 1)) + min));
  }

  function handleResetArray() {
    resetArray(arrayLength);
  }

  const wrapperSetArray = useCallback(
    (updatedArray) => {
      setArray(updatedArray);
    },
    [setArray],
  );

  useEffect(() => {
    resetArray(arrayLength);
    console.log('mounted');
  }, [arrayLength]);

  return (
    <Wrapper>
      <ArrayWrapper>
        {array.map((val: number, idx: number) => (
          <Bar key={idx} value={val}></Bar>
        ))}
      </ArrayWrapper>
      <ControllerWrapper>
        <button onClick={handleResetArray}>Reset Array</button>
      </ControllerWrapper>
    </Wrapper>
  );
}

const ArrayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100vw;
  height: 100vh;
  background: grey;
`;

const ControllerWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100px;
  background: black;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100vw;
  height: 100vh;
  background: grey;
`;

const Bar = styled.div<{ value: number }>`
  width: 40px;
  height: ${(props) => props.value / 2}px;
  background: blue;
  border: 1px solid black;
`;

export default AlgorithmVisualizer;
